import Button from '@mui/material/Button';
import Fetch from "../../../api/api.js";
import {useCallback, useEffect, useState} from "react";
import { SpinnerApp } from "../../SpinnerApp/SpinnerApp.jsx";
import {toast} from "react-toastify";

export const CategoryList = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const getCategories = useCallback(async ()=> {
        const response = await Fetch.get('admin/categories');
        if (response.success) {
            setCategories(response.data);
            setIsLoading(false);
        }
    }, [])
    useEffect(()=>{
        getCategories()
    }, [getCategories]);

    const changeCategory = (id) => {
        props.getEntityId({id: id, method: 'patch', activeTab: 1});
    }
    const deleteCategory = async (id) => {
        const check = confirm('Вы уверены, что хотите удалить категорию?');
        if (check) {
            const response = await Fetch.delete(`admin/categories/${id}`)
            setCategories(categories.filter(category => category.id !== id))
            toast.success("Категория успешно удалена");
        }
    }
    return (
        <div className="admin__products">
            <div className="admin__title">Список категорий</div>
            {!isLoading &&
                <ul className="admin__category-list" >
                    {categories.map(category => {
                        return (
                            <li key={category.id}>
                                <p>{ category.name }</p>
                                <div>
                                    <Button variant="contained" onClick={() => changeCategory(category.id)}>Изменить</Button>
                                    <Button variant="contained" color="error" onClick={() => deleteCategory(category.id)}>Удалить</Button>
                                </div>
                            </li>
                        )
                    })}
                    {categories.length === 0 &&
                        <li>
                            <p>Список категорий пуст</p>
                        </li>
                    }
                </ul>
            }
            {isLoading && <SpinnerApp/>}
        </div>
    );
}
