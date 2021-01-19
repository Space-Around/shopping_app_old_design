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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCart } from "../redux/actions/actions";
import store from "../redux/store/store";
import { connect } from "react-redux";

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

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log("Done.");
};

const Item = (props) => {
  const [count, setCount] = React.useState(props.count);

  return (
    <View
      style={{
        width: "100%",
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "lightgrey",
      }}
    >
      <Image
        style={{ width: 40, height: 40, backgroundColor: "lightgrey" }}
        source={{ uri: props.img }}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontSize: 16, color: "#79408C", fontWeight: "bold" }}>
          {props.price}
        </Text>
        <Text style={{ width: 150 }}>{props.title}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            if (count > 1) {
              setCount(count - 1);

              let objsTmp = props.cart;

              for (let i = 0; i < objsTmp.items.length; i++) {
                let elem = {};

                if (typeof objsTmp.items[i] != "object")
                  elem = JSON.parse(objsTmp.items[i]);

                if (elem.id == props.id) {
                  elem.count = count;
                  objsTmp.items[i] = elem;

                  store.dispatch(setCart(objsTmp));
                  storeData("cart", objsTmp);
                  return;
                }
              }
            }
          }}
          style={{
            width: 24,
            height: 24,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "grey", fontWeight: "bold", fontSize: 20 }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "grey",
            marginLeft: 7,
            marginRight: 7,
          }}
        >
          {count}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (count < 100) {
              setCount(count + 1);

              let objsTmp = props.cart;

              for (let i = 0; i < objsTmp.items.length; i++) {
                let elem = {};

                if (typeof objsTmp.items[i] != "object")
                  elem = JSON.parse(objsTmp.items[i]);

                if (elem.id == props.id) {
                  elem.count = count;
                  objsTmp.items[i] = elem;

                  store.dispatch(setCart(objsTmp));
                  storeData("cart", objsTmp);
                  return;
                }
              }
            }
          }}
          style={{
            width: 24,
            height: 24,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "grey", fontWeight: "bold", fontSize: 20 }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          let objsNew = {
              items: [],
            },
            objsTmp = props.cart;

          for (let i = 0; i < objsTmp.items.length; i++) {
            let elem = {};

            if (typeof objsTmp.items[i] != "object") {
              elem = JSON.parse(objsTmp.items[i]);
            } else {
              elem = objsTmp.items[i];
            }

            if (elem.id != props.id) objsNew.items.push(elem);
          }

          storeData("cart", objsNew).then((response) => {
            store.dispatch(setCart(objsNew));
            props.update(objsNew);
          });
        }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/trash.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = (props) => {
  const [items, setItems] = React.useState([]);

  let tmpArray = [];

  if (props.cart != null) {
    for (let i = 0; i < props.cart.items.length; i++) {
      const element =
        typeof props.cart.items[i] != "object"
          ? JSON.parse(props.cart.items[i])
          : props.cart.items[i];

      tmpArray.push(
        <Item
          title={element.title}
          price={123}
          img={element.imgURL}
          key={i}
          id={element.id}
          count={element.count}
          cart={props.cart}
          update={(cart) => {
            setItems(cart);
          }}
        />
      );
    }
  } else {
    getData("cart").then((response) => {
      if (response != null) {
        for (let i = 0; i < response.items.length; i++) {
          const element =
            typeof props.cart.items[i] != "object"
              ? JSON.parse(props.cart.items[i])
              : props.cart.items[i];

          tmpArray.push(
            <Item
              title={element.title}
              price={123}
              img={element.imgURL}
              key={i}
              count={element.count}
              cart={response}
              update={(cart) => {
                setItems(cart);
              }}
            />
          );
        }

        store.dispatch(setCart(response));
      }
    });
  }

  if (props.cart != null)
    if (items.length != props.cart.items.length) setItems(tmpArray);

  return (
    <View
      style={
        (styles.container,
        { alignItems: "center", position: "relative", height: "100%" })
      }
    >
      <View
        style={{
          backgroundColor: "#79408C",
          width: "95%",
          height: 118,
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: 90,
          borderRadius: 4,
          paddingLeft: 40,
          paddingTop: 10,
          paddingBottom: 10,
          elevation: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
          Total cost
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "normal",
            color: "white",
            marginBottom: 30,
          }}
        >
          10 999 $
        </Text>
        <Text style={{ fontSize: 12, color: "white" }}>
          {items.length} items
        </Text>
      </View>
      <ScrollView style={{ paddingTop: 10 }}>{items}</ScrollView>
      <Button
        title="PAY"
        onPress={() => {
          // clearAll();
          // setItems([]);
          // store.dispatch(setCart({ items: [] }));

          // console.log(props.cart);
          props.navigation.navigate('Address');
        }}
        style={{ position: "absolute", bottom: 30 }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  let cart = state.setCart.cart;
  return { cart };
};

export default connect(mapStateToProps)(CartScreen);
