import { SET_IS_SIGN_IN } from "../actions/actionTypes";

const initialState = {
    isSignIn: false
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_IS_SIGN_IN: {
            const { isSignIn } = action.payload;
                        
            return {
                ...state,
                isSignIn: isSignIn
            }
        }

        default:
            return state;
    }
}
