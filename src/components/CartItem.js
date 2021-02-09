// import React from 'react';
// import {
//   TouchableOpacity,
//   Text,
//   View,
//   TextInput,
//   ScrollView,
//   Image,
//   Dimensions,
// } from 'react-native';
// import { setCart, setCartItemsComponents } from '../redux/actions/actions';
// import store from '../redux/store/store';
// import {connect} from 'react-redux';
// import {storeData, getData} from '../utils/Storage';
// // import CartItemUtil from '../utils/CartItemUtil'
// // import CartItemComponentsUtil from '../utils/CartItemComponentsUtil'

// const CartItem = (props) => {
//   const [count, setCount] = React.useState(props.count);

//   const reduce = () => {
//     if (count > 1) {
//       setCount(count - 1);

//       let newCart = props.cart;

//       for (let i = 0; i < newCart.items.length; i++) {
//         let elem = {};

//         if (typeof newCart.items[i] != 'object')
//           elem = JSON.parse(newCart.items[i]);

//         if (elem.id == props.id) {
//           elem.count = count;
//           newCart.items[i] = elem;

//           store.dispatch(setCart(newCart));
//           // store.dispatch(setCartItemsComponents(newCart));
//           storeData('cart', newCart);
//           return;
//         }
//       }
//     }
//   };

//   const increase = () => {
//     if (count < 100) {
//       setCount(count + 1);

//       let newCart = props.cart;

//       for (let i = 0; i < newCart.items.length; i++) {
//         let elem = {};

//         if (typeof newCart.items[i] != 'object')
//           elem = JSON.parse(newCart.items[i]);

//         if (elem.id == props.id) {
//           elem.count = count;
//           newCart.items[i] = elem;

//           store.dispatch(setCart(newCart));
//           // store.dispatch(setCartItemsComponents(newCart));
//           storeData('cart', newCart);
//           return;
//         }
//       }
//     }
//   };

//   const deleteItem = () => {
    
//     let objsNew = {
//         items: [],
//       },
//       objsTmp = props.cart;

//     for (let i = 0; i < objsTmp.items.length; i++) {
//       let elem = {};

//       if (typeof objsTmp.items[i] != 'object') {
//         elem = JSON.parse(objsTmp.items[i]);
//       } else {
//         elem = objsTmp.items[i];
//       }

//       if (elem.id != props.id) objsNew.items.push(elem);
//     }

//     storeData('cart', objsNew).then((response) => {
//       store.dispatch(setCart(objsNew));
//       store.dispatch(setCartItemsComponents(objsNew));
//     });
//   };

//   return (
//     <View
//       style={{
//         width: '100%',
//         height: 80,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-evenly',
//         borderTopWidth: 1,
//         borderBottomWidth: 1,
//         borderColor: 'lightgrey',
//       }}>
//       <Image
//         style={{width: 40, height: 40, backgroundColor: 'lightgrey'}}
//         source={{uri: props.img}}
//       />
//       <View style={{flexDirection: 'column'}}>
//         <Text style={{fontSize: 16, color: '#79408C', fontWeight: 'bold'}}>
//           {props.price}
//         </Text>
//         <Text style={{width: 150}}>{props.title}</Text>
//       </View>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <TouchableOpacity
//           onPress={() => {
//             reduce();
//           }}
//           style={{
//             width: 24,
//             height: 24,
//             backgroundColor: 'lightgrey',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
//             -
//           </Text>
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontSize: 20,
//             color: 'grey',
//             marginLeft: 7,
//             marginRight: 7,
//           }}>
//           {count}
//         </Text>
//         <TouchableOpacity
//           onPress={() => {
//             increase();
//           }}
//           style={{
//             width: 24,
//             height: 24,
//             backgroundColor: 'lightgrey',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>
//             +
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         onPress={() => {
//           deleteItem();
//         }}>
//         <Image
//           style={{width: 30, height: 30}}
//           source={require('../../assets/trash.png')}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const mapStateToProps = (state) => {
//   let cart = state.setCart.cart;
//   return {cart};
// };

// export default connect(mapStateToProps)(CartItem);
