import {HeaderApp} from "../components/HeaderApp/HeaderApp.jsx";
import {ContactsSection} from "../components/sections/ContactsSection/ContactsSection.jsx";
import { CartSection } from "../components/sections/CartSection/CartSection.jsx";
import {useCallback, useEffect} from "react";
import Fetch from "../api/api.js";
import {useDispatch} from "react-redux";

export const CartPageApp = () => {
    const dispatch = useDispatch();
    const getCartCounter = useCallback(async () => {
        const response = await Fetch.get('cart/count');
        dispatch({type: "ADD_TO_CART", payload: response.data.count});
    }, [])
    useEffect(()=>{
        getCartCounter()
    }, [getCartCounter]);
    return (
      <>
          <HeaderApp/>
          <CartSection/>
          <ContactsSection/>
      </>
    );
}
