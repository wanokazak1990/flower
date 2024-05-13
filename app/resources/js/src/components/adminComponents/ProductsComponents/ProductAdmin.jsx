import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useCallback, useEffect, useState} from "react";
import 'rsuite/dist/rsuite.min.css';
import { Uploader } from 'rsuite';
import Fetch from "../../../api/api.js";
import {toast} from "react-toastify";
import { useProductsAdmin } from "./useProductsAdmin.js";
import {SpinnerApp} from "../../SpinnerApp/SpinnerApp.jsx";

export const ProductAdmin = (props) => {
    const {
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
    } = useProductsAdmin(new props.strategy, props.entityId);
    const [disabledUpload, setDisabledUpload] = useState(false);
    useEffect(()=>{
        if (props.entityId === 0) {
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setFileList([]);
        }
    }, [props.entityId]);
    useEffect(()=>{
        if (fileList.length !== 0) {
            setDisabledUpload(true)
        } else {
            setDisabledUpload(false)
        }
    }, [fileList]);
    return (
        <div className="admin__products">
            <div className="admin__title">{props.entityId === 0 ? 'Создание продукта' : 'Изменение продукта'}</div>
            {!isLoading &&
                <div className="admin__form">
                    {/*{props.entityId !== 0 &&*/}
                    {/*    <img className="admin__form-image" src={imgUrl} alt="img"/>*/}
                    {/*}*/}
                    {props.entityId === 0 &&
                        <p className="admin__form-label" style={{ marginBottom: '0px'}}>
                            Чтобы создать товар сперва нужно создать категорию
                        </p>
                    }
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        value={productName}
                        label="Название товара"
                        variant="outlined"
                        onInput={(event) => {
                            setProductName(event.target.value);
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="Описание товара"
                        value={productDescription}
                        variant="outlined"
                        multiline
                        maxRows={20}
                        onInput={(event) => {
                            setProductDescription(event.target.value);
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        label="Цена товара"
                        value={productPrice}
                        variant="outlined"
                        onInput={(event) => {
                            setProductPrice(event.target.value);
                        }}
                    />
                    <FormControl>
                        <InputLabel id="demo-select-small-label">Категория товара</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={categoryId}
                            label="Категория товара"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Выбрать</em>
                            </MenuItem>
                            {categories.map(category => {
                                return (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    <div>
                        <p className="admin__form-label">Поле для загрузки картинки товара</p>
                        {/*<Uploader draggable fileList={fileList} action="" multiple={false} autoUpload={false} onChange={setFileList}>*/}
                        {/*    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>*/}
                        {/*        <span>Click or Drag files to this area to upload</span>*/}
                        {/*    </div>*/}
                        {/*</Uploader>*/}
                        <Uploader
                            disabled={disabledUpload}
                            listType="picture-text"
                            defaultFileList={fileList}
                            action=""
                            multiple={false}
                            autoUpload={false}
                            onChange={setFileList}
                        />
                    </div>
                    <Button variant="contained" onClick={() => {
                        send()
                    }}
                    >{props.entityId === 0 ? 'Создать продукт' : 'Изменить продукт'}</Button>
                </div>
            }
            {isLoading && <SpinnerApp/>}
        </div>
    );
}
