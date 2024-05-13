import {CartCard} from "./cartComponents/CartCard.jsx";
import {useCallback, useEffect, useState} from "react";
import Fetch from "../../../api/api.js";
import {SpinnerApp} from "../../SpinnerApp/SpinnerApp.jsx";
import {FormCart} from "./cartComponents/FormCart.jsx";
import {CashReceipt} from "./cartComponents/CashReceipt.jsx";
import { Loader, Placeholder } from 'rsuite';

export const CartSection = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [visibleForm, setVisibleForm] = useState(false);
    const [visibleButton, setVisibleButton] = useState(true);
    const [visibleCash, setVisibleCash] = useState(false);
    const [cashLink, setCashLink] = useState('');
    const delProductToCart = (id) => {
        setProducts(products.filter(prod => prod.id !== id));
    }
    const getProducts = useCallback(async ()=> {
        const response = await Fetch.get('cart');
        if (response.success) {
            const list = [];
            for (const key in response.data) {
                list.push(response.data[key]);
            }
            setProducts(list);
            setTotalPrice(list.reduce((a,b) => {
                return a + (+b.price * +b.count);
            }, 0));
            // setTimeout(() => setIsLoading(false), 30000)
            setIsLoading(false);
        }
    }, [])
    useEffect(()=>{
        getProducts()
    }, [getProducts]);
    const getFinalPrice = (finalPrice) => {
        setTotalPrice(finalPrice)
    }
    const getFile = (link) => {
        setVisibleForm(false);
        setCashLink(link);
        setVisibleCash(true);
        setProducts([]);
    }
    const stepForm = (e) => {
        e.preventDefault();
        setVisibleForm(true);
        setVisibleButton(false);
    }

    return (
        <section className="cart">
            <div className="container">
                {!isLoading && products.length === 0 &&
                    <div className="products__title">Корзина пуста</div>
                }
                {visibleCash &&
                    <div className="cart__wrapper">
                        <CashReceipt link={cashLink}/>
                    </div>
                }
                <div className="cart__wrapper">
                    {!isLoading && products.length !== 0 &&
                        <>
                            <ul className="cart__list">
                                {products.map(product => {
                                    return <CartCard getFinalPrice={getFinalPrice} key={product.id} product={product} delProductToCart={delProductToCart}/>
                                })}
                            </ul>
                            <div className="cart__final">Итого: {totalPrice}₽</div>
                            {products.length !== 0 &&
                                <div>
                                    {visibleButton && <a href="#" className="cart__btn" onClick={(e) => stepForm(e)}>Перейти к оформлению</a>}
                                    {visibleForm && <FormCart getFile={getFile}/>}
                                </div>
                            }
                        </>
                    }

                    {isLoading && <SpinnerApp/>}
                </div>
            </div>
        </section>
    );
}
