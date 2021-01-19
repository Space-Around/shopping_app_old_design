import { SET_URL } from "../actions/actionTypes";

const initialState = {
    url: "https://reactnative.dev/"
};

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_URL: {
            const { url } = action.payload;
                        
            return {
                ...state,
                url: url
            }
        }

        default:
            return state;
    }
}
