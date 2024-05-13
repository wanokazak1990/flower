const defaultState = {
    count: 0
}

export const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {...state, count: action.payload};
        default:
            return state;
    }
}
