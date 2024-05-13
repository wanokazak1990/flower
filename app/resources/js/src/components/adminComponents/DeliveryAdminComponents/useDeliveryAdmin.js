import {useCallback, useEffect, useState} from "react";
import Fetch from "../../../api/api.js";
import {toast} from "react-toastify";
import deliveryAdminStrategy from "./interfaces/DeliveryAdminStrategy.js";
export const useDeliveryAdmin = (strategy, id = 0) => {
    const [error, setError] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    deliveryAdminStrategy.setStrategy(strategy);
    const setName = (text) => {
        setCategoryName(text)
    }
    const getCategory = useCallback(async ()=> {
        if (id !== 0) {
            const response = await Fetch.get(`admin/deliveries/${id}`);
            if (response.success) {
                setCategoryName(response.data.name);
                setIsLoading(false);
            }
        }
    }, [])
    useEffect(()=>{
        getCategory()
    }, [getCategory]);
    const send = async () => {
        if (categoryName !== '') {
            const response = await deliveryAdminStrategy.send(categoryName, id);
            if (response.success) {
                if (id === 0) {
                    toast.success("Служба доставки успешно создана");
                    setCategoryName('');
                } else {
                    toast.success("Служба доставки успешно изменена");
                }
            } else {
                toast.error("Что-то пошло не так");
            }
        } else {
            setError(true);
        }
    }
    return {
        categoryName,
        setName,
        send,
        error,
        setError,
        isLoading
    }
}
