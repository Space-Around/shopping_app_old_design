import { SET_CART_ITEMS_COMPONENTS } from "../actions/actionTypes";

const initialState = {
    cartItemsComponents: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_CART_ITEMS_COMPONENTS: {
            const { cartItemsComponents } = action.payload;

            return {
                ...state,
                cartItemsComponents: cartItemsComponents
            }
        }

        

        default:
            return state;
    }
}
