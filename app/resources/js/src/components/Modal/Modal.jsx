import {createPortal} from "react-dom";
import {useEffect, useMemo} from "react";
const portal = document.getElementById('menu');
export const Modal = (props) => {
    return createPortal(props.children, portal);
}
