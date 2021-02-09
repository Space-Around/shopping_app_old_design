import { SET_CURRENT_SCREEN } from "../actions/actionTypes";

const initialState = {
    currentScreen: null
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_CURRENT_SCREEN: {
            const { currentScreen } = action.payload;
                        
            return {
                ...state,
                currentScreen: currentScreen
            }
        }

        default:
            return state;
    }
}
