import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {store} from "./src/store/index.js";
import './src/assets/scss/style.scss';
import {MainPageApp} from "./src/views/MainPageApp.jsx";
import {AdminPageApp} from "./src/views/AdminPageApp.jsx"
import SignInSideApp from "./src/views/SignInSideApp.jsx";
import RegisterApp from "./src/views/RegisterApp.jsx";
import {
    createBrowserRouter,
    createMemoryRouter,
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import {ProductAppPage} from "./src/views/ProductAppPage.jsx";
import {CartPageApp} from "./src/views/CartPageApp.jsx";
export default function App() {
    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <AdminPageApp/>
        },
        {
            path: "/cart",
            element: <CartPageApp/>
        },
        {
          path: "/login",
          element: <SignInSideApp/>
        },
        {
            path: "/register",
            element: <RegisterApp/>
        },
        {
            path: "/product/:id",
            element: <ProductAppPage/>
        },
        {
            path: "/",
            element: <MainPageApp/>,
        },
    ]);
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router} />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </Provider>
        </>
    );
}

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);
