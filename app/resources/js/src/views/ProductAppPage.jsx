import { useParams } from 'react-router-dom';
import {HeaderApp} from "../components/HeaderApp/HeaderApp.jsx";
import {useCallback, useEffect, useState} from "react";
import Fetch from "../api/api.js";
import {SpinnerApp} from "../components/SpinnerApp/SpinnerApp.jsx";
import {ContactsSection} from "../components/sections/ContactsSection/ContactsSection.jsx";
import {useDispatch} from "react-redux";
export const ProductAppPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    // const [sum, setSum] =useState(productPrice);
    const getProduct = useCallback(async ()=> {
        if (+id !== 0) {
            const response = await Fetch.get(`admin/products/${id}`);
            if (response.success) {
                setProductName(response.data.name);
                setProductPrice(response.data.price);
                setProductDescription(response.data.description);
                setImgUrl(response.data.img);
                setIsLoading(false);
                // setSum(String(count * +response.data.price));
            }
        } else {
            setIsLoading(false);
        }
    }, [])
    useEffect(()=>{
        getProduct()
    }, [getProduct]);
    const getCartCounter = useCallback(async () => {
        const response = await Fetch.get('cart/count');
        dispatch({type: "ADD_TO_CART", payload: response.data.count});
    }, [])
    useEffect(()=>{
        getCartCounter()
    }, [getCartCounter]);
    const addToCart = async (id) => {
        dispatch({type: "ADD_TO_CART", payload: id});
        const response = await Fetch.put(`cart/${id}`)
    }
    return (
        <>
            <HeaderApp/>
            {!isLoading &&
                <div className="product-page">
                    <div className="container">
                        <div className="product-page__wrapper">
                            <div className="product-page__image">
                                <img src={imgUrl} alt="image"/>
                            </div>
                            <div className="product-page__info">
                                <div className="product-page__title">{productName}</div>
                                <div className="product-page__price">{productPrice} р.</div>
                                <button className="product-page__btn" onClick={() => addToCart(id)}>В корзину</button>
                            </div>
                        </div>
                        <div className="product-page__description">{productDescription}</div>
                    </div>
                </div>
            }
            {isLoading && <SpinnerApp/>}
            <ContactsSection/>
        </>
    );
}
