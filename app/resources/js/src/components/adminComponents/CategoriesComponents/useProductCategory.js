import {useCallback, useEffect, useState} from "react";
import Fetch from "../../../api/api.js";
import {toast} from "react-toastify";
import categoryStrategy from "./interfaces/CategoryStrategy.js";
export const useProductCategory = (strategy, id = 0) => {
    const [error, setError] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    categoryStrategy.setStrategy(strategy);
    const setName = (text) => {
        setCategoryName(text)
    }
    const getCategory = useCallback(async ()=> {
        if (id !== 0) {
            const response = await Fetch.get(`admin/products/${id}`);
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
            const response = await categoryStrategy.send(categoryName, id);
            if (response.success) {
                if (id === 0) {
                    toast.success("Категория успешно создана");
                    setCategoryName('');
                } else {
                    toast.success("Категория успешно изменена");
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
