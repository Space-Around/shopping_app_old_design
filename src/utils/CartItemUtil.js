import { getData, storeData } from "./Storage";
import store from "../redux/store/store";
import { setCart } from "../redux/actions/actions";

const CART_KEY_STORAGE = "cart";

export default class CartItemUtil {
  static storageToReduxStore = () => {
    getData(CART_KEY_STORAGE)
      .then((cart) => {
        try {
          // CartItemComponentsUtil.update(cart);
          store.dispatch(setCart(cart));
        } catch (e) {
          console.log("Cart Utils 1: " + e);
        }
      })
      .catch((err) => {
        console.log("Cart Utils 2: " + err);
      });
  };

  static delete = (cart, id) => {
    let newCart = {
        items: [],
      },
      items = cart.items;

    for (let i = 0; i < items.length; i++) {

      if (items[i].id != id) {
        newCart.items.push(items[i]);
      }
    }

    storeData(CART_KEY_STORAGE, newCart)
    .then((r) => {
      store.dispatch(setCart(newCart));
    });
  };

  static reduce = (cart, id) => {
    let newCart = cart,
      items = cart.items,
      count = 1;

    for (let i = 0; i < items.length; i++) {
      // let element =
        // typeof items[i] != "object" ? JSON.parse(items[i]) : items[i];

      if (items[i].id == id && items[i].count > 1) {
        items[i].count--;
        // count = element.count;
        count = items[i].count;
        // items[i] = element;
      }
    }

    newCart.items = items;

    storeData(CART_KEY_STORAGE, newCart);
    store.dispatch(setCart(newCart));

    console.log("-u4 " + id + ": " + count);

    return count;
  };

  static increase = (cart, id) => {
    let newCart = cart,
      items = cart.items,
      count = 1;

    for (let i = 0; i < items.length; i++) {
      // let element =
        // typeof items[i] != "object" ? JSON.parse(items[i]) : items[i];

      if (items[i].id == id && items[i].count < 1000) {
        items[i].count++;
        // count = element.count;
        count = items[i].count;
        // items[i] = element;
      }
    }

    newCart.items = items;

    storeData(CART_KEY_STORAGE, newCart);
    store.dispatch(setCart(newCart));

    console.log("-u3 " + id + ": " + count);

    return count;
  };
}
