import Fetch from "../../../../api/api.js";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

export const CartCard = (props) => {
    const dispatch = useDispatch();
    const { img, name, id, price, count } = props.product;
    const [counter, setCounter] = useState(+count);
    const [sum, setSum] = useState(+price * +count);
    const addToCart = async () => {
        const response = await Fetch.put(`cart/${id}`)
        if (response.success) {
            dispatch({type: "ADD_TO_CART", payload: response.data.count});
            setSum(response.data.product_total_price);
            props.getFinalPrice(response.data.total_cart_price)
            setCounter(counter + 1);
        }
    }
    const delToCart = async () => {
        const response = await Fetch.delete(`cart/${id}`);
        if (response.success) {
            dispatch({type: "ADD_TO_CART", payload: response.data.count});
            setSum(response.data.product_total_price);
            props.getFinalPrice(response.data.total_cart_price)
            setCounter(+counter - 1);
            if (+counter === 1) {
                props.delProductToCart(id);
            }
        }
    }
    const decrement = async () => {
        await delToCart();
    }
    const increment = async () => {
        await addToCart();
    }
    const delProduct = async (e, id) => {
        e.preventDefault();
        const response = await Fetch.delete(`cart/erase/${id}`)
        if (response.success) {
            dispatch({type: "ADD_TO_CART", payload: response.data.count});
            props.getFinalPrice(response.data.total_cart_price)
            props.delProductToCart(id)
        }
    }
    return (
        <li className="cart__list-item">
            <div className="cart__card">
                <div className="cart__card-image">
                    <img src={img} alt="image"/>
                </div>
                <div className="cart__card-body">
                    <div className="cart__card-title">{name}</div>
                </div>
                <div className="cart__card-counter">
                    <a href="#" className="cart__card-trash" title="Удалить товар" onClick={(e) => delProduct(e, id)}>
                        <svg width="30" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.07692 17.3438C8.07692 16.7055 8.59385 16.1875 9.23077 16.1875C9.86769 16.1875 10.3846 16.7055 10.3846 17.3438V31.2188C10.3846 31.8582 9.86769 32.375 9.23077 32.375C8.59385 32.375 8.07692 31.8582 8.07692 31.2188V17.3438ZM13.8462 17.3438C13.8462 16.7055 14.3631 16.1875 15 16.1875C15.6369 16.1875 16.1538 16.7055 16.1538 17.3438V31.2188C16.1538 31.8582 15.6369 32.375 15 32.375C14.3631 32.375 13.8462 31.8582 13.8462 31.2188V17.3438ZM19.6154 17.3438C19.6154 16.7055 20.1323 16.1875 20.7692 16.1875C21.4062 16.1875 21.9231 16.7055 21.9231 17.3438V31.2188C21.9231 31.8582 21.4062 32.375 20.7692 32.375C20.1323 32.375 19.6154 31.8582 19.6154 31.2188V17.3438ZM2.30769 32.375C2.30769 34.9292 4.37423 37 6.92308 37H23.0769C25.6258 37 27.6923 34.9292 27.6923 32.375V13.875H2.30769V32.375ZM18.4615 4.625H11.5385V3.46875C11.5385 2.82934 12.0554 2.3125 12.6923 2.3125H17.3077C17.9446 2.3125 18.4615 2.82934 18.4615 3.46875V4.625ZM27.6923 4.625H20.7692V2.3125C20.7692 1.036 19.7354 0 18.4615 0H11.5385C10.2646 0 9.23077 1.036 9.23077 2.3125V4.625H2.30769C1.03385 4.625 0 5.661 0 6.9375V9.25C0 10.5265 1.03268 11.5613 2.30653 11.5625H27.6946C28.9673 11.5613 30 10.5265 30 9.25V6.9375C30 5.661 28.9662 4.625 27.6923 4.625Z" fill="#B90000"/>
                        </svg>
                    </a>
                    <div className="product-page__counter">
                        <button className="minus" onClick={() => decrement()}>
                            <svg width="35" height="5" viewBox="0 0 35 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.4999 0.114716C18.1324 0.114811 18.1016 0.11482 18.7683 0.11482C19.1562 0.11482 19 0.11482 19.5 0.11482L19.8851 0.114716L31.8142 0.114715C32.4396 0.125585 33.0357 0.381655 33.4741 0.827771C33.9126 1.27389 34.1582 1.87436 34.1582 2.49985C34.1582 3.12534 33.9126 3.72581 33.4741 4.17193C33.0357 4.61805 32.4396 4.87412 31.8142 4.88499L19.8851 4.88499L19.4181 4.88499C19.033 4.88499 19.1433 4.88499 18.6433 4.88499C18.1433 4.88499 18.1254 4.88499 17.4999 4.88499C16.8744 4.88499 16.4319 4.88499 15.9319 4.88499C15.3307 4.88499 15.9727 4.88499 15.4727 4.88499L15.1149 4.88499L3.18581 4.88499C2.56041 4.87412 1.9643 4.61805 1.52587 4.17193C1.08744 3.72581 0.841769 3.12534 0.841769 2.49985C0.841769 1.87436 1.08744 1.27389 1.52587 0.827771C1.9643 0.381655 2.56041 0.125585 3.18581 0.114715L15.1149 0.114716H15.4452C15.9452 0.114716 15.5897 0.114716 16.0897 0.114716C16.5897 0.114716 16.8673 0.114811 17.4999 0.114716Z"
                                    fill="black" />
                            </svg>
                        </button>
                        <span>{counter}</span>
                        <button className="plus" onClick={() => increment()}>
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.5 0.800733C18.1325 0.800828 18.7392 1.05215 19.1864 1.49943C19.6337 1.94671 19.885 2.55332 19.8851 3.18587L19.8851 15.1149L31.8142 15.1149C32.4396 15.1258 33.0357 15.3819 33.4741 15.828C33.9126 16.2741 34.1582 16.8746 34.1582 17.5001C34.1582 18.1256 33.9126 18.726 33.4741 19.1721C33.0357 19.6183 32.4396 19.8743 31.8142 19.8852L19.8851 19.8852L19.8851 31.8142C19.8743 32.4396 19.6182 33.0358 19.1721 33.4742C18.726 33.9126 18.1255 34.1583 17.5 34.1583C16.8745 34.1583 16.274 33.9126 15.8279 33.4742C15.3818 33.0358 15.1257 32.4396 15.1149 31.8142L15.1149 19.8852L3.18581 19.8852C2.56041 19.8743 1.9643 19.6183 1.52587 19.1721C1.08744 18.726 0.841769 18.1256 0.841769 17.5001C0.841769 16.8746 1.08744 16.2741 1.52587 15.828C1.9643 15.3819 2.56041 15.1258 3.18581 15.1149L15.1149 15.1149L15.1149 3.18587C15.115 2.55332 15.3663 1.94671 15.8136 1.49943C16.2608 1.05215 16.8675 0.800828 17.5 0.800733Z"
                                    fill="black" />
                            </svg>
                        </button>
                    </div>
                    <div className="cart__card-price">Цена: {sum}₽</div>
                </div>
            </div>
        </li>
    );
}
