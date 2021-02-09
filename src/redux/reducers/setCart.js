import { SET_CART } from "../actions/actionTypes";

const initialState = {
    cart: null
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_CART: {
            const { cart } = action.payload;
            // console.log(cart);
            return {
                ...state,
                cart: cart
            }
        }

        default:
            return state;
    }
}
