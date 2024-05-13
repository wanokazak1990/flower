import Button from '@mui/material/Button';
import Fetch from "../../../api/api.js";
import {useCallback, useEffect, useState} from "react";
import { SpinnerApp } from "../../SpinnerApp/SpinnerApp.jsx";
import {toast} from "react-toastify";

export const DeliveryAdminList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [deliveries, setDeliveries] = useState([]);
    const getDeliveries = useCallback(async ()=> {
        const response = await Fetch.get('admin/deliveries');
        if (response.success) {
            setDeliveries(response.data);
            setIsLoading(false);
        }
    }, [])
    useEffect(()=>{
        getDeliveries()
    }, [getDeliveries]);

    const changeDeliveri = (id) => {
        props.getEntityId({id: id, method: 'patch', activeTab: 5});
    }
    const deleteDelivery = async (id) => {
        const check = confirm('Вы уверены, что хотите удалить категорию?');
        if (check) {
            const response = await Fetch.delete(`admin/deliveries/${id}`)
            setDeliveries(deliveries.filter(category => category.id !== id))
            toast.success("Служба доставки успешно удалена");
        }
    }
    return (
        <div className="admin__products">
            <div className="admin__title">Список служб доставки</div>
            {!isLoading &&
                <ul className="admin__category-list" >
                    {deliveries.map(delivery => {
                        return (
                            <li key={delivery.id}>
                                <p>{ delivery.name }</p>
                                <div>
                                    <Button variant="contained" onClick={() => changeDeliveri(delivery.id)}>Изменить</Button>
                                    <Button variant="contained" color="error" onClick={() => deleteDelivery(delivery.id)}>Удалить</Button>
                                </div>
                            </li>
                        )
                    })}
                    {deliveries.length === 0 &&
                        <li>
                            <p>Список служб доставки пуст</p>
                        </li>
                    }
                </ul>
            }
            {isLoading && <SpinnerApp/>}
        </div>
    );
}
