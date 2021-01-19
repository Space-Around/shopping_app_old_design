import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  saveNavigation,
  setCurrentScreen,
  setIsActiveAddItemBtn,
  setCurrentViewedItem,
  setCart,
} from "../redux/actions/actions";
import store from "../redux/store/store";

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const renderBottomNavCustom = (props) => (
  <View
    style={{
      width: "100%",
      height: 60,
      backgroundColor: "#79408C",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      position: "relative",
    }}
  >
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("HomeScreen");
      }}
    >
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require("../../assets/home_white.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require("../../assets/category.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        backgroundColor: "#79408C",
        width: 60,
        height: 60,
        elevation: 10,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        bottom: 30,
      }}
      disabled={!props.isActiveAddItemBtn}
      onPress={() => {
        getData("cart").then((response) => {
          let cart = {},
            tmpCurrentViewedItem = null,
            isThere = false;

          if (response != null && response.items != undefined) {
            cart = response;

            for (let i = 0; i < cart.items.length; i++) {
              const element =
                typeof cart.items[i] == "string"
                  ? JSON.parse(cart.items[i])
                  : cart.items[i];

              const element2 =
                typeof props.currentViewedItem == "string"
                  ? JSON.parse(props.currentViewedItem)
                  : props.currentViewedItem;

              if (element.id == element2.id) {
                // element.count++;
                // cart.items[i] = element;
                isThere = true;
              }
            }

            if (!isThere) cart.items.push(props.currentViewedItem);
          } else {
            cart = {
              items: [],
            };
            cart.items.push(props.currentViewedItem);
          }          

          store.dispatch(setCart(cart));

          storeData("cart", cart);
        });
      }}
    >
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require("../../assets/add_to_bascket.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("FavoritesScreen");
      }}
    >
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require("../../assets/star_white.png")}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("CartScreen");
      }}
    >
      <Image
        style={{
          width: 20,
          height: 20,
        }}
        source={require("../../assets/shopping_cart.png")}
      />
    </TouchableOpacity>
  </View>
);

const BottomNavCustom = (props) => {
  switch (props.currentScreen) {
    default: {
      return renderBottomNavCustom(props);
    }
  }
};

const mapStateToProps = (state) => {
  let navigation = state.saveNavigation.navigation,
    currentScreen = state.setCurrentScreen.currentScreen,
    isActiveAddItemBtn = state.setIsActiveAddItemBtn.isActiveAddItemBtn,
    currentViewedItem = state.setCurrentViewedItem.currentViewedItem;

  return { navigation, currentScreen, isActiveAddItemBtn, currentViewedItem };
};

export default connect(mapStateToProps)(BottomNavCustom);
