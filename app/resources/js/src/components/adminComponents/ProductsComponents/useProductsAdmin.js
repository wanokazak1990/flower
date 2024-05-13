import {useCallback, useEffect, useState} from "react";
import Fetch from "../../../api/api.js";
import productAdminStrategy from "./interfaces/ProductAdminStrategy.js";
import {toast} from "react-toastify";

export const useProductsAdmin = (strategy, id = 0) => {
    const [categoryId, setCategoryId] = useState('');
    const [fileList, setFileList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    productAdminStrategy.setStrategy(strategy);
    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };

    const getCategories = useCallback(async ()=> {
        const response = await Fetch.get('admin/categories');
        if (response.success) {
            setCategories(response.data);
            if (response.data.length !== 0) {
                setCategoryId(response.data[0].id);
            }
        }
    }, [])
    useEffect(()=>{
        getCategories()
    }, [getCategories]);

    const getProduct = useCallback(async ()=> {
        if (id !== 0) {
            const response = await Fetch.get(`admin/products/${id}`);
            if (response.success) {
                setCategoryId(response.data.category_id);
                setProductName(response.data.name);
                setProductPrice(response.data.price);
                setProductDescription(response.data.description);
                setImgUrl(response.data.img);
                setIsLoading(false);
                setFileList([{
                    name: 'image',
                    fileKey: 1,
                    url: response.data.img
                }])
            }
        } else {
            setIsLoading(false);
        }
    }, [])
    useEffect(()=>{
        getProduct()
    }, [getProduct]);

    const getProductBody = () => {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('price', productPrice);
        formData.append('description', productDescription);
        formData.append('category_id', `${categoryId}`);
        if (id !== 0) {
            formData.append('_method', 'patch');
            if (fileList[0].hasOwnProperty('blobFile')) {
                formData.append('img', fileList[0].blobFile);
            }
        } else {
            formData.append('img', fileList[0].blobFile);
        }

        return formData;
    }
    const send = async () => {
        if (productName !== '' && productPrice !== '' && productDescription !== '' && fileList.length !== 0) {
            const response = await productAdminStrategy.send(getProductBody(), id);
            if (response.success) {
                if (id === 0) {
                    toast.success("Товар успешно создан");
                    setProductName('');
                    setProductPrice('');
                    setProductDescription('');
                    setFileList([]);
                } else {
                    toast.success("Товар успешно изменен");
                }
            } else {
                toast.error("Что-то пошло не так");
            }
        } else {
            toast.error("Не все поля заполнены");
        }
    }
    return {
        send,
        handleChange,
        productName,
        productPrice,
        productDescription,
        categories,
        categoryId,
        setProductName,
        setProductPrice,
        setProductDescription,
        setFileList,
        fileList,
        imgUrl,
        isLoading
    }
}
