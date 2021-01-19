import {
  SAVE_NAVIGATION,
  SET_CURRENT_SCREEN,
  SET_IS_SIGN_IN,
  SET_URL,
  SET_IS_ACTIVE_ADD_ITEM_BTN,
  SET_CURRENT_VIEWED_ITEM,
  SET_CART,
  SET_FAVORITES
} from "./actionTypes";

export const saveNavigation = (navigation) => ({
  type: SAVE_NAVIGATION,
  payload: {
    navigation: navigation,
  },
});

export const setCurrentScreen = (currentScreen) => ({
  type: SET_CURRENT_SCREEN,
  payload: {
    currentScreen: currentScreen,
  },
});

export const setIsSignIn = (isSignIn) => ({
  type: SET_IS_SIGN_IN,
  payload: {
    isSignIn: isSignIn,
  },
});

export const setURL = (url) => ({
  type: SET_URL,
  payload: {
    url: url,
  },
});

export const setIsActiveAddItemBtn = (isActiveAddItemBtn) => ({
  type: SET_IS_ACTIVE_ADD_ITEM_BTN,
  payload: {
    isActiveAddItemBtn: isActiveAddItemBtn,
  },
});

export const setCurrentViewedItem = (currentViewedItem) => ({
  type: SET_CURRENT_VIEWED_ITEM,
  payload: {
    currentViewedItem: currentViewedItem,
  },
});

export const setCart = (cart) => ({
  type: SET_CART,
  payload: {
    cart: cart,
  },
});

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: {
    favorites: favorites,
  },
});