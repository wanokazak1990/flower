import Button from '@mui/material/Button';
export const ProductCardAdmin = (props) => {
    const { img, name, price, description, id,  } = props.product;
    const deleteProduct = async (id) => {
        props.delProd(id);
    }
    const changeProduct = (id) => {
        props.changeProd(id);
    }
    return (
        <div className="admin__card">
            <div className="admin__card-image">
                <img src={img} alt="image"/>
            </div>
            <div className="admin__card-body">
                <div className="admin__card-title">{ name }</div>
                <div className="admin__card-description">{ description }</div>
                <div className="admin__card-price">{ price }р</div>
                <div className="admin__card-control">
                    <Button variant="contained" onClick={() => changeProduct(id)}>Изменить</Button>
                    <Button variant="contained" color="error" onClick={() => deleteProduct(id)}>Удалить</Button>
                </div>
            </div>
        </div>
    );
}
