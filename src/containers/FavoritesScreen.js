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
import { setFavorites, setCart } from "../redux/actions/actions";
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

const Item = (props) => {
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
          1 999 $
        </Text>
        <Text style={{ width: 150 }}>{props.title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          let objsNew = {
              items: [],
            },
            objsTmp = props.favorites;

          for (let i = 0; i < objsTmp.items.length; i++) {
            let elem = {};

            if (typeof objsTmp.items[i] != "object") {
              elem = JSON.parse(objsTmp.items[i]);
            } else {
              elem = objsTmp.items[i];
            }

            if (elem.id != props.id) {
              objsNew.items.push(elem);
            } else {
              let tmpElem = elem;
              getData("cart").then((reponse) => {
                let cart = {
                  items: [],
                };

                if (reponse != null && reponse.items != null) cart = reponse;

                cart.items.push(tmpElem);

                store.dispatch(setCart(cart));
                storeData("cart", cart);
              });
            }
          }

          storeData("favorites", objsNew).then((response) => {
            store.dispatch(setFavorites(objsNew));
            props.update(objsNew);
          });
        }}
      >
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/add-to-basket.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          let objsNew = {
              items: [],
            },
            objsTmp = props.favorites;

          for (let i = 0; i < objsTmp.items.length; i++) {
            let elem = {};

            if (typeof objsTmp.items[i] != "object") {
              elem = JSON.parse(objsTmp.items[i]);
            } else {
              elem = objsTmp.items[i];
            }

            if (elem.id != props.id) objsNew.items.push(elem);
          }

          storeData("favorites", objsNew).then((response) => {
            store.dispatch(setFavorites(objsNew));
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

const FavoritesScreen = (props) => {
  const [items, setItems] = React.useState([]);

  let tmpArray = [];

  if (props.favorites != null) {
    for (let i = 0; i < props.favorites.items.length; i++) {
      const element =
        typeof props.favorites.items[i] != "object"
          ? JSON.parse(props.favorites.items[i])
          : props.favorites.items[i];

      tmpArray.push(
        <Item
          title={element.title}
          price={123}
          img={element.imgURL}
          key={i}
          id={element.id}
          count={element.count}
          cart={props.cart}
          favorites={props.favorites}
          update={(favorites) => {
            setItems(favorites);
          }}
        />
      );
    }
  } else {
    getData("favorites").then((response) => {
      if (response != null) {
        for (let i = 0; i < response.items.length; i++) {
          const element =
            typeof response.items[i] != "object"
              ? JSON.parse(response.items[i])
              : response.items[i];

          tmpArray.push(
            <Item
              title={element.title}
              price={123}
              img={element.imgURL}
              key={i}
              count={element.count}
              favorites={response}
              cart={props.cart}
              update={(favorites) => {
                setItems(favorites);
              }}
            />
          );
        }

        store.dispatch(setFavorites(response));
      }
    });
  }

  if (props.favorites != null)
    if (items.length != props.favorites.items.length) setItems(tmpArray);

  return (
    <View
      style={
        (styles.container,
        {
          alignItems: "center",
          position: "relative",
          height: "100%",
          marginTop: 100,
        })
      }
    >
      <ScrollView style={{ paddingTop: 10 }}>{items}</ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  let favorites = state.setFavorites.favorites,
    cart = state.setCart.cart;
  return { favorites, cart };
};

export default connect(mapStateToProps)(FavoritesScreen);
