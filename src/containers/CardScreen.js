import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import styles from "../styles/styles";
import Input from "../components/Input";
import Button from "../components/Button";
import store from "../redux/store/store";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCart, setCartItems } from "../redux/actions/actions";
import { IP_ADDR_SERVER } from "../utils/Constants";
import { storeData, getData } from "../utils/Storage";

const CardScreen = (props) => {
  const RESULT_CREATE_ORDER = {
    SUCCESS: 0x1,
    ERROR: 0x0,
  };

  const onPress = () => {
    // console.log(props.cart);

    getData("user_info").then((r) => {
      var data = {
        action: "add_item",
        data: {
          items_obj: props.cart,
          user_id: r._id,
        },
      };

      fetch(IP_ADDR_SERVER, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            if (data.result == RESULT_CREATE_ORDER.SUCCESS) {
              storeData("cart", {});
              store.dispatch(setCart({}));
              store.dispatch(setCartItems([]));
              props.navigation.navigate("SuccessPayedScreen");
            }
          }
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });
    });

    props.navigation.navigate('SuccessPayedScreen');
  };

  return (
    <View
      style={
        (styles.container,
        { alignItems: "center", position: "relative", height: "100%" })
      }
    >
      <Input
        style={{ marginTop: 100 }}
        title="Card number"
        placeholder="Enter card number"
      />
      <Input
        style={{ marginTop: 40 }}
        title="Due date"
        placeholder="Enter due date"
      />
      <Input style={{ marginTop: 40 }} title="CVV" placeholder="Enter CVV" />
      <Button
        style={{ marginTop: 40 }}
        title="PAY 10 000 $"
        onPress={() => {
          onPress();
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  let cart = state.setCart.cart;
  return { cart };
};

export default connect(mapStateToProps)(CardScreen);
