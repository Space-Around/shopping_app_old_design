// import { setCartItemsComponents } from '../redux/actions/actions';
// import store from '../redux/store/store';
// // import {connect} from 'react-redux';
// // import {getData, storeData} from './Storage';
// import React from 'react';
// import CartItem from '../components/CartItem';

// export default class CartItemComponentsUtil {

//   static update = (cart) => {

//     let newCartItemsComponents = [];  
    
//     try {
//       for (let i = 0; i < cart.items.length; i++) {
//         const element =
//           typeof cart.items[i] != 'object'
//             ? JSON.parse(cart.items[i])
//             : cart.items[i];

//           newCartItemsComponents.push(
//           <CartItem
//             title={element.title}
//             price={123}
//             img={element.imgURL}
//             key={i}
//             id={element.id}
//             count={element.count}
//             cart={cart}          
//           />
//         );      
//       }

//       store.dispatch(setCartItemsComponents(newCartItemsComponents));
//     } catch (e) {
//       console.log("CartItemsComponents Utils: " + e);
//     }

//   }

// }
// // export const updateCartItems = (cartItems) => {

// //   let tmpArray = [];

// //   try {
// //     for (let i = 0; i < props.cart.items.length; i++) {
// //       const element =
// //         typeof props.cart.items[i] != 'object'
// //           ? JSON.parse(props.cart.items[i])
// //           : props.cart.items[i];

// //       tmpArray.push(
// //         <Item
// //           title={element.title}
// //           price={123}
// //           img={element.imgURL}
// //           key={i}
// //           id={element.id}
// //           count={element.count}
// //           cart={props.cart}
// //           update={(cart) => {
// //             setItems(cart);
// //           }}
// //         />,
// //       );
// //     }
// //   } catch (r) {
// //     getData('cart')
// //       .then((response) => {
// //         try {
// //           for (let i = 0; i < response.items.length; i++) {
// //             const element =
// //               typeof props.cart.items[i] != 'object'
// //                 ? JSON.parse(props.cart.items[i])
// //                 : props.cart.items[i];

// //             tmpArray.push(
// //               <Item
// //                 title={element.title}
// //                 price={123}
// //                 img={element.imgURL}
// //                 key={i}
// //                 count={element.count}
// //                 cart={response}
// //                 update={(cart) => {
// //                   setItems(cart);
// //                 }}
// //               />,
// //             );
// //           }

// //           store.dispatch(setCart(response));
// //         } catch (e) {
// //           console.log(e);
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   }

// //   try {
// //     if (items.length != props.cart.items.length) setItems(tmpArray);
// //   } catch (e) {
// //     console.log(e);
// //   }
// // }
