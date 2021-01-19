import React from "react";
import { TextInput, TouchableOpacity, Image, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import store from "../redux/store/store";
import { connect } from "react-redux";
import {
  setURL,
  setIsActiveAddItemBtn,
  setFavorites,
  setCurrentViewedItem
} from "../redux/actions/actions";
import { sendPostMessage, getField } from "../../assets/script/executor";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const WebViewScreen = ({ route, navigation, url, favorites, currentViewedItem }) => {
  const [shopData, setShopData] = React.useState({
    domain: "",
    loadedContent: "",
    fields: [
      {
        type: "text",
        name: "title",
        selector: "",
      },
      {
        type: "text",
        name: "desc",
        selector: "",
      },
      {
        type: "img",
        name: "imgURL",
        selector: "",
      },
      {
        type: "img",
        name: "color",
        selector: "",
      },
      {
        type: "text",
        name: "size",
        selector: "",
      },
    ],
    screen: "",
    meta: {
      title: "",
      description: "",
      favicon: "",
    },
  });

  const [exec, setExec] = React.useState("");

  const webViewRef = React.useRef();

  const onLoadEnd = (e) => {
    store.dispatch(setIsActiveAddItemBtn(true));

    webViewRef.current.injectJavaScript(exec);
  };

  const onLoadStart = (e) => {
    store.dispatch(setIsActiveAddItemBtn(false));
    // console.log(e.nativeEvent.url);
    let data = {
      action: "get_shop_info",
      data: {
        url: e.nativeEvent.url,
      },
    };

    fetch("http://10.168.0.4:8080", {
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
          // setShopData(data);

          if (data.domain.length > 0) {
            let tmpData = {
              fields: data.fields,
              loadedContent: data.loadedContent,
            };

            setExec(
              `
            (function() {
            \n` +
                getField.toString() +
                `
            \n` +
                sendPostMessage.toString() +
                `
            \n sendPostMessage(` +
                JSON.stringify(tmpData) +
                `);
            })();
            `
            );
          }
        }
      })
      .catch((error) => {
        console.log(`error: ${error.message}`);
      });
  };

  const onMessage = (e) => {
    let item = e.nativeEvent.data;
    store.dispatch(setCurrentViewedItem(item));
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: "#79408C",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: "60%",
            width: "95%",
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 15,
            alignItems: "center",
            justifyContent: "space-around",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              widht: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              webViewRef.current.goBack();
            }}
          >
            <Image
              style={{
                width: 18,
                height: 18,
              }}
              source={require("../../assets/arrowhead-thin-outline-to-the-left.png")}
            />
          </TouchableOpacity>
          <TextInput
            style={{
              width: "70%",
              paddingLeft: 10,
              paddingRight: 10,
            }}
            placeholder="https://..."
            value={route.params.url}
          />
          <TouchableOpacity
            style={{
              widht: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {}}
          >
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require("../../assets/star_grey.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              widht: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              webViewRef.current.reload();
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require("../../assets/reload.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <WebView
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={(ref) => (webViewRef.current = ref)}
        source={{ uri: route.params.url }}
        onLoadEnd={(e) => onLoadEnd(e)}
        onLoadStart={(e) => onLoadStart(e)}
        onMessage={(e) => onMessage(e)}
      />
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#79408C",
          position: "absolute",
          top: 100,
          zIndex: 100,
          borderRadius: 200,
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          right: 10,
        }}
        onPress={() => {
          getData("favorites").then((response) => {
            let favorites = {},
              isThere = false;

            if (response != null && response.items != undefined) {
              favorites = response;

              for (let i = 0; i < favorites.items.length; i++) {
                const element =
                  typeof favorites.items[i] == "string"
                    ? JSON.parse(favorites.items[i])
                    : favorites.items[i];

                const element2 =
                  typeof currentViewedItem == "string"
                    ? JSON.parse(currentViewedItem)
                    : currentViewedItem;

                if (element.id == element2.id) {
                  // element.count++;
                  // favorites.items[i] = element;
                  isThere = true;
                }
              }

              if (!isThere) favorites.items.push(currentViewedItem);
            } else {
              favorites = {
                items: [],
              };
              favorites.items.push(currentViewedItem);
            }

            store.dispatch(setFavorites(favorites));

            storeData("favorites", favorites);
          });
        }}
      >
        <Image
          style={{
            width: "35%",
            height: "35%",
          }}
          source={require("../../assets/star_white.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  let url = state.setURL.url,
    favorites = state.setFavorites.favorites,
    currentViewedItem = state.setCurrentViewedItem.currentViewedItem;

  return { url, favorites, currentViewedItem };
};

export default connect(mapStateToProps)(WebViewScreen);
