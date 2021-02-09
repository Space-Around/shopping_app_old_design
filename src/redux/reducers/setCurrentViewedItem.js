import { SET_CURRENT_VIEWED_ITEM } from "../actions/actionTypes";

const initialState = {
    setCurrentItem: false
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_CURRENT_VIEWED_ITEM: {
            const { currentViewedItem } = action.payload;
                        
            return {
                ...state,
                currentViewedItem: currentViewedItem
            }
        }

        default:
            return state;
    }
}
