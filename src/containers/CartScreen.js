import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import Button from "../components/Button";
import { connect } from "react-redux";
import CartItemUtil from "../utils/CartItemUtil";
import { storeData, getData } from "../utils/Storage";

const Item = (props) => {
  const [count, setCount] = React.useState(1);

  React.useEffect(() => {

    try {
      for (let i = 0; i < props.cart.items.length; i++) {
        if (props.cart.items[i].id == props.id) {
          console.log("-u2 " + props.id + ": " + props.cart.items[i].count);
          setCount(props.cart.items[i].count);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    console.log("-u1 " + props.id + ": " + count);
    for (let i = 0; i < props.cart.items.length; i++) {
      if (props.cart.items[i].id == props.id) {
        if(props.cart.items[i].count != count)
        setCount(props.cart.items[i].count);
      }
    }
  });

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
            setCount(CartItemUtil.reduce(props.cart, props.id));
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
            setCount(CartItemUtil.increase(props.cart, props.id));
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
          CartItemUtil.delete(props.cart, props.id);
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
  let items = [];

  const updateItems = () => {
    try {
      let tmpItems = [];

      for (let i = 0; i < props.cart.items.length; i++) {
        let item = props.cart.items[i];

        tmpItems.push(
          <Item
            title={item.title}
            price={100}
            img={item.imgURL}
            key={i}
            id={item.id}
            count={props.cart.items[i].count}
            cart={props.cart}
          />
        );
      }

      items = tmpItems;
    } catch (e) {
      console.log(e);
    }
  };

  try {
    updateItems();
  } catch (e) {
    items = [];
  }

  React.useEffect(() => {
    CartItemUtil.storageToReduxStore();
  }, []);

  React.useEffect(() => {
    updateItems();
  });

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

          console.log(props.cart);
          if (items.length > 0) {
            props.navigation.navigate("Address");
          }
        }}
        style={{ position: "absolute", bottom: 30 }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  let cart = state.setCart.cart;

  console.log("cart update");

  return { cart };
};

export default connect(mapStateToProps)(CartScreen);
