import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useEffect} from "react";
import {useProductCategory} from "./useProductCategory.js";
export const ProductCategory = (props) => {
    const {
        setName,
        send,
        error,
        categoryName,
        setError,
    } = useProductCategory(new props.strategy, props.entityId);

    useEffect(()=>{
        if (props.entityId === 0) setName('');
    }, [props.entityId]);
    return (
        <div className="admin__products">
            <div className="admin__title">{props.entityId === 0 ? 'Новая категория' : 'Изменение категории'}</div>
            <div className="admin__form">
                <TextField
                    id="outlined-basic"
                    error={error}
                    fullWidth
                    value={categoryName}
                    label="Название категории"
                    variant="outlined"
                    onInput={(event) => {
                        setName(event.target.value);
                    }}
                    onFocus={(e) => setError(false)}
                />
                <Button variant="contained" onClick={() => {
                    send();
                }}
                >{props.entityId === 0 ? 'Создать категорию' : 'Изменить категорию'}</Button>
            </div>
        </div>
    );
}
