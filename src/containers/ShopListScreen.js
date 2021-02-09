import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import styles from "../styles/styles";
import { connect } from "react-redux";
import { setURL, saveNavigation } from "../redux/actions/actions";
import store from "../redux/store/store";
import { IP_ADDR_SERVER } from '../utils/Constants';

const Item = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "lightgrey",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
        }}
        onPress={() => {
          props.navigtion.navigate("WebViewScreen", {
            url: `https://${props.title}`,
          });
        }}
      >
        <Image
          style={{
            borderRadius: 200,
            width: 40,
            height: 40,
          }}
          source={{
            uri:
              "https://laminat-dvor.ru/upload/iblock/2e2/2e2b8eab559f0cec08050aaba98ebdef.JPG",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "lightgrey",
            }}
          >
            Shop
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
          }}
          onPress={() => {}}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={require("../../assets/star.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            marginLeft: 15,
          }}
          onPress={() => {}}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={require("../../assets/trash.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ShopListScreen = ({ navigation }) => {
  const [shopsList, setShopsList] = React.useState([]);

  store.dispatch(saveNavigation(navigation));

  if (!(shopsList.length > 0)) {
    var data = {
      action: "get_shops",
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
          let tmpArray = [],
            i = 0;

          data.shops.forEach((element) => {
            tmpArray.push(
              <Item title={element.domain} key={i} navigtion={navigation} />
            );
            i++;
          });

          setShopsList(tmpArray);
        }
      })
      .catch((error) => {
        console.log(`error: ${error.message}`);
      });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 90,
          width: "100%",
          position: "absolute",
          top: 0,
          zIndex: 100,
          backgroundColor: "#79408C",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 340,
            height: 50,
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center",
            marginTop: 30,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "space-between",
            borderRadius: 10,
          }}
        >
          <TextInput
            style={{
              width: "90%",
              height: "100%",
            }}
            placeholder="https://"
          />
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
            }}
            onPress={() => {}}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={require("../../assets/right-arrow.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
      <ScrollView
        style={{
          marginTop: 90,
          width: "100%",
          height: "100%",
        }}
      >
        {shopsList}
      </ScrollView>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#79408C",
          position: "absolute",
          bottom: 20,
          zIndex: 100,
          borderRadius: 200,
          justifyContent: "center",
          alignItems: "center",
          elevation: 10,
          right: "10%",
        }}
        onPress={() => {}}
      >
        <Image
          style={{
            width: "35%",
            height: "35%",
          }}
          source={require("../../assets/plus.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default connect()(ShopListScreen);
