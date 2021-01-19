import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles/styles";
import Input from "../components/Input";
import Button from "../components/Button";
import store from "../redux/store/store";
import { setIsSignIn } from "../redux/actions/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

let sha512 = require("js-sha512").sha512;

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [retryPassword, setRetryPassword] = React.useState("");

  const onPressSignUp = () => {
    let login = "",
        password_hash = "";

    if (password != retryPassword) {
      alert("passwords must match");
      setRetryPassword("");
      return;
    }

    login = email;
    password_hash = sha512(password);
    
    var data = {
      action: "sign_up",
      data: {
        login: login.toLowerCase(),
        password_hash: password_hash,
        ip_addr: "10.168.0.4"
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
        if (data.status) {          
          storeData("authorization", {access: true});
          storeData("user_info", JSON.parse(data));
          store.dispatch(setIsSignIn(true));
        } else {          
          alert("An account with this email address is already registered");
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
          title="Enter email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={{
            marginTop: 30,
          }}
          title="Enter password"
          placeolder=""
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          style={{
            marginTop: 30,
          }}
          title="Retry password"
          placeolder=""
          value={retryPassword}
          onChangeText={(text) => setRetryPassword(text)}
        />
        <Button
          style={{
            marginTop: 30,
          }}
          title="SIGN UP"
          onPress={() => onPressSignUp()}
        />
        <View
          style={{
            flexDirection: "column",
            position: "absolute",
            bottom: 50,
          }}
        >
          <Text>Do you have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Sign In");
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

export default RegistrationScreen;
