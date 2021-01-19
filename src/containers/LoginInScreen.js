import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles/styles";
import Input from "../components/Input";
import Button from "../components/Button";
import store from "../redux/store/store";
import { setIsSignIn } from "../redux/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

var sha512 = require("js-sha512").sha512;

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

const LoginInScreen = ({ navigation }) => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onPressSignIn = () => {
    let password_hash = sha512(password);

    var data = {
      action: "sign_in",
      data: {
        login: login.toLowerCase(),
        password_hash: password_hash,
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
          store.dispatch(setIsSignIn(true));
          storeData("authorization", { access: true });
          storeData("user_info", data);
        }
      })
      .catch((error) => {
        console.log(`error: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          height: "100%",
        }}
      >
        <Input
          title="Email"
          placeholder="Email"
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <Input
          style={{
            marginTop: 30,
          }}
          title="Password"
          placeolder=""
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          style={{
            marginTop: 30,
          }}
          title="SIGN IN"
          onPress={() => onPressSignIn()}
        />
        <View
          style={{
            flexDirection: "column",
            position: "absolute",
            bottom: 40,
          }}
        >
          <Text>No account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sign Up");
            }}
          >
            <Text
              style={{
                marginTop: 20,
                color: "#00C5DF",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginInScreen;
