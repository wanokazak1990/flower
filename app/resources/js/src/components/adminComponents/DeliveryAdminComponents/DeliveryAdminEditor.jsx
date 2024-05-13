import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useEffect} from "react";
import {useDeliveryAdmin} from "./useDeliveryAdmin.js";
export const DeliveryAdminEditor = (props) => {
    const {
        setName,
        send,
        error,
        categoryName,
        setError,
    } = useDeliveryAdmin(new props.strategy, props.entityId);

    useEffect(()=>{
        if (props.entityId === 0) setName('');
    }, [props.entityId]);
    return (
        <div className="admin__products">
            <div className="admin__title">{props.entityId === 0 ? 'Новая служба доставки' : 'Изменение службы доставки'}</div>
            <div className="admin__form">
                <TextField
                    id="outlined-basic"
                    error={error}
                    fullWidth
                    value={categoryName}
                    label="Название службы доставки"
                    variant="outlined"
                    onInput={(event) => {
                        setName(event.target.value);
                    }}
                    onFocus={(e) => setError(false)}
                />
                <Button variant="contained" onClick={() => {
                    send();
                }}
                >{props.entityId === 0 ? 'Создать службу доставки' : 'Изменить службу доставки'}</Button>
            </div>
        </div>
    );
}
