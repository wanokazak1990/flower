import {CategoryList} from "../components/adminComponents/CategoriesComponents/CategoryList.jsx";
import {useState} from "react";
import {ProductCategory} from "../components/adminComponents/CategoriesComponents/ProductCategory.jsx";
import {CreateCategoryStrategy} from "../components/adminComponents/CategoriesComponents/interfaces/CreateStrategy.js";
import {PatchCategoryStrategy} from "../components/adminComponents/CategoriesComponents/interfaces/PatchStrategy.js";
import {ProductAdmin} from "../components/adminComponents/ProductsComponents/ProductAdmin.jsx";
import {ProductListAdmin} from "../components/adminComponents/ProductsComponents/ProductListAdmin.jsx";
import {CreateProductStrategy} from "../components/adminComponents/ProductsComponents/interfaces/CreateStrategy.js";
import {PatchProductStrategy} from "../components/adminComponents/ProductsComponents/interfaces/PatchStrategy.js";
import {DeliveryAdminList} from "../components/adminComponents/DeliveryAdminComponents/DeliveryAdminList.jsx";
import {DeliveryAdminEditor} from "../components/adminComponents/DeliveryAdminComponents/DeliveryAdminEditor.jsx";
import {CreateDeliveryStrategy} from "../components/adminComponents/DeliveryAdminComponents/interfaces/CreateStrategy.js";
import {PatchDeliveryStrategy} from "../components/adminComponents/DeliveryAdminComponents/interfaces/PatchStrategy.js";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
export const AdminPageApp = () => {
    const auth = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState(0);
    const [entityId, setEntityId] = useState(0);
    const [entityMethod, setEntityMethod] = useState('create');
    const [activeClass, setActiveClass] = useState('');
    const navigate = useNavigate();

    const categoriesStrategy = {
        create: CreateCategoryStrategy,
        patch: PatchCategoryStrategy
    }
    const productsStrategy = {
        create: CreateProductStrategy,
        patch: PatchProductStrategy
    }

    const deliverysStrategy = {
        create: CreateDeliveryStrategy,
        patch: PatchDeliveryStrategy
    }
    const changeTab = (num, event) => {
        event.preventDefault();
        setActiveTab(num);
        setEntityMethod('create');
        setEntityId(0);
    }
    const getEntityId = ({id, method, activeTab}) => {
        setEntityMethod(method);
        setEntityId(id);
        setActiveTab(activeTab);
    }
    const callMenu = (event) => {
        event.preventDefault();
        if (activeClass === 'active') {
            setActiveClass('');
        } else {
            setActiveClass('active');
        }
    }
    if (auth.role === 1) {
        return (
            <section className="admin">
                <a href="#" className="admin__burger" onClick={(e) => callMenu(e)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <div className={`admin__menu ${activeClass}`}>
                    <ul className="admin__list">
                        <li className="hidden-sm">
                            <a href="#" className="admin__list-link" onClick={(e) => callMenu(e)}>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_232_5)">
                                        <path d="M0.691605 0.691849C1.13895 0.244637 1.7456 -0.0065918 2.37815 -0.0065918C3.0107 -0.0065918 3.61735 0.244637 4.0647 0.691849L12.4998 9.12696L20.9349 0.691849C21.3848 0.257312 21.9874 0.0168671 22.6129 0.0223022C23.2384 0.0277374 23.8367 0.278618 24.279 0.720908C24.7213 1.1632 24.9721 1.76151 24.9776 2.38698C24.983 3.01245 24.7426 3.61503 24.308 4.06494L15.8729 12.5001L24.308 20.9352C24.7426 21.3851 24.983 21.9877 24.9776 22.6131C24.9721 23.2386 24.7213 23.8369 24.279 24.2792C23.8367 24.7215 23.2384 24.9724 22.6129 24.9778C21.9874 24.9832 21.3848 24.7428 20.9349 24.3083L12.4998 15.8731L4.0647 24.3083C3.61479 24.7428 3.01221 24.9832 2.38674 24.9778C1.76127 24.9724 1.16295 24.7215 0.720664 24.2792C0.278373 23.8369 0.0274933 23.2386 0.0220581 22.6131C0.0166229 21.9877 0.257067 21.3851 0.691605 20.9352L9.12672 12.5001L0.691605 4.06494C0.244393 3.61759 -0.00683594 3.01094 -0.00683594 2.37839C-0.00683594 1.74585 0.244393 1.1392 0.691605 0.691849Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_232_5">
                                            <rect width="25" height="25" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>
                        <li className="admin__list-item">
                            <a href="#" className="admin__list-link" onClick={(e) => changeTab(0, e)}>Категории</a>
                        </li>
                        <li className="admin__list-item">
                            <a href="#" className="admin__list-link" onClick={(e) => changeTab(1, e)}>Создать категорию</a>
                        </li>
                        <li className="admin__list-item">
                            <a href="#" className="admin__list-link" onClick={(e) => changeTab(2, e)}>Товары</a>
                        </li>
                        <li className="admin__list-item">
                            <a href="#" className="admin__list-link" onClick={(e) => changeTab(3, e)}>Создать товар</a>
                        </li>
                        <li className="admin__list-item">
                            <a href="#" className="admin__list-link" onClick={(e) => changeTab(4, e)}>Службы доставки</a>
                        </li>
                        <li className="admin__list-item">
                            <a href="#" className="admin__list-link" onClick={(e) => changeTab(5, e)}>Создать службу</a>
                        </li>
                    </ul>
                </div>
                <div className="admin__content">
                    {activeTab === 0 && <CategoryList getEntityId={getEntityId}/>}
                    {activeTab === 1 && <ProductCategory entityId={entityId} strategy={categoriesStrategy[entityMethod]}/>}
                    {activeTab === 2 && <ProductListAdmin getEntityId={getEntityId}/>}
                    {activeTab === 3 && <ProductAdmin entityId={entityId} strategy={productsStrategy[entityMethod]}/>}
                    {activeTab === 4 && <DeliveryAdminList getEntityId={getEntityId}/>}
                    {activeTab === 5 && <DeliveryAdminEditor entityId={entityId} strategy={deliverysStrategy[entityMethod]}/>}
                </div>
            </section>
        );
    } else {
        return <Navigate to={'/'} replace />;
    }
}
