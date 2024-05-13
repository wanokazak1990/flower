import Fetch from "../../api/api";
import {login} from "../auth";
export const loginUser = (body) => {
    return (dispatch) => {
        Fetch.post('auth/login', body)
            .then(response => {
                if (response.success) {
                    dispatch(login(response.data))
                    return response.success;
                }
            })
    }
}
