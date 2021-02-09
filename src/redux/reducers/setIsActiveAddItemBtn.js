import { SET_IS_ACTIVE_ADD_ITEM_BTN } from "../actions/actionTypes";

const initialState = {
    isActiveAddItemBtn: false
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_IS_ACTIVE_ADD_ITEM_BTN: {
            const { isActiveAddItemBtn } = action.payload;
                        
            return {
                ...state,
                isActiveAddItemBtn: isActiveAddItemBtn
            }
        }

        default:
            return state;
    }
}
