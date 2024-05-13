import CashImage from "../../../../assets/images/icons/cash-receipt.png";
export const CashReceipt = (props) => {
    return (
        <div className="cart__cash">
            <div className="cart__cash-image">
                <img src={CashImage} alt="cash"/>
            </div>
            <a href={props.link} download>Скачать чек</a>
        </div>
    );
}
