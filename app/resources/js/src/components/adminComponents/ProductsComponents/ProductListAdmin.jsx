import {useCallback, useEffect, useState} from "react";
import Fetch from "../../../api/api.js";
import {SpinnerApp} from "../../SpinnerApp/SpinnerApp.jsx";
import { ProductCardAdmin } from "./ProductCardAdmin.jsx";
import {toast} from "react-toastify";

export const ProductListAdmin = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const getProducts = useCallback(async ()=> {
        const response = await Fetch.get('admin/products');
        if (response.success) {
            setProducts(response.data);
            setIsLoading(false);
        }
    }, [])
    useEffect(()=>{
        getProducts()
    }, [getProducts]);
    const delProd = async (id) => {
        const check = confirm('Вы уверены, что хотите удалить данный продукт?');
        if (check) {
            const response = await Fetch.delete(`admin/products/${id}`)
            setProducts(products.filter(category => category.id !== id))
            toast.success("Продукт успешно удален");
        }
    }
    const changeProd = (id) => {
        props.getEntityId({id: id, method: 'patch', activeTab: 3});
    }
    return (
        <>
            {products.length === 0 &&
                <div className="admin__products">
                    <div className="admin__subtitle">Список товаров пуст</div>
                </div>
            }
            {products.length !== 0 &&
                <div className="admin__products">
                    {!isLoading &&
                        <div className="admin__products-grid">
                            {products.map(product => {
                                return (
                                    <ProductCardAdmin key={product.id} product={product} delProd={delProd} changeProd={changeProd}/>
                                );
                            })}
                        </div>
                    }
                </div>
            }
            {isLoading && <SpinnerApp/>}
        </>
    );
}
