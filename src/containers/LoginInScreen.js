import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import styles from "../styles/styles";
import Input from "../components/Input";
import Button from "../components/Button";
import store from "../redux/store/store";
import { setIsSignIn } from "../redux/actions/actions";
import { storeData, getData, clearAll } from "../utils/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP_ADDR_SERVER } from "../utils/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

var sha512 = require("js-sha512").sha512;

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
    <KeyboardAvoidingView
      contentContainerStyle={{
        height: "100%",
      }}
      behavior="height"
      style={{ flex: 1, height: '100%' }}
      keyboardVerticalOffset={-100}
    >
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
    </KeyboardAvoidingView>
  );
};

export default LoginInScreen;
