import axios from "axios";
const BASE_URL = 'http:/localhost:8480'
const conf = {
    baseURL: `/api/`
}
const instance = axios.create(conf);

class Fetch {
    static async get(url) {
        try {
            const response = await instance.get(url)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
    static async post(url, body) {
        try {
            const response = await instance.post(url, body)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
    static async put(url, body) {
        try {
            const response = await instance.put(url, body)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
    static async patch(url, body) {
        try {
            const response = await instance.patch(url, body)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
    static async delete(url, body = null) {
        try {
            const response = await instance.delete(url, body)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
    static async upload(url, body = null) {
        try {
            const configg = {
                data: body,
                method: 'post',
                url: `${BASE_URL}/api/${url}`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            const response = await axios(configg);
            return response.data;
        } catch(e) {
            console.log(e)
        }
    }
    static async changeUpload(url, body = null) {
        try {
            const configg = {
                data: body,
                method: 'post',
                url: `/api/${url}`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
            const response = await axios(configg);
            return response.data;
        } catch(e) {
            console.log(e)
        }
    }
}

export default Fetch;
