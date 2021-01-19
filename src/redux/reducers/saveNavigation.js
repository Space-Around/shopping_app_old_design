import { SAVE_NAVIGATION } from "../actions/actionTypes";

const initialState = {
    navigation: null
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SAVE_NAVIGATION: {
            const { navigation } = action.payload;

            return {
                ...state,
                navigation: navigation
            }
        }

        default:
            return state;
    }
}
