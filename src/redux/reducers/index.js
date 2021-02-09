import { combineReducers } from "redux";
import saveNavigation from "./saveNavigation";
import setCurrentScreen from "./setCurrentScreen";
import setIsSignIn from "./setIsSignIn";
import setURL from "./setURL";
import setIsActiveAddItemBtn from "./setIsActiveAddItemBtn";
import setCurrentViewedItem from "./setCurrentViewedItem";
import setCart from "./setCart";
import setFavorites from "./setFavorites";
import cartItemsComponents from "./cartItemsComponents";

export default combineReducers({
  saveNavigation,
  setCurrentScreen,
  setIsSignIn,
  setURL,
  setIsActiveAddItemBtn,
  setCurrentViewedItem,
  setCart,
  setFavorites,
  cartItemsComponents
});
