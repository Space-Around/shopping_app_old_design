import { SET_FAVORITES } from "../actions/actionTypes";

const initialState = {
    favorites: null
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_FAVORITES: {
            const { favorites } = action.payload;

            return {
                ...state,
                favorites: favorites
            }
        }

        default:
            return state;
    }
}
