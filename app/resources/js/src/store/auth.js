const defaultState = {
    loggedIn: false,
    name: '',
    email: '',
    id: 0,
    role: 0,
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
const GET_USER = 'GET_USER'
export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedIn: true,
                name: action.payload.name,
                email: action.payload.email,
                id: action.payload.id,
                role: action.payload.role
            }
        case LOGOUT:
            localStorage.removeItem("userData");
            return {
                ...state,
                loggedIn: false,
                name: '',
                email: '',
                id: 0,
                role: 0
            }
        default:
            return state;
    }
}

export const login = (payload) => ({type: LOGIN, payload})
