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
import Input from "../components/Input";
import Button from "../components/Button";
import { storeData, getData, clearAll } from "../utils/Storage";
import { IP_ADDR_SERVER } from "../utils/Constants";
import { setIsSignIn } from "../redux/actions/actions";
import store from "../redux/store/store";

const AccountScreen = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    getData("user_info").then((r) => {
      setFirstName(r.first_name);
      setLastName(r.last_name);
      setPhone(r.phone_number);
      setEmail(r.email);
    });
  }, []);

  const save = () => {
    getData("user_info").then((r) => {
      let userInfo = r;

      userInfo.first_name = firstName;
      userInfo.last_name = lastName;
      userInfo.phone = phone;
      userInfo.email = email;

      storeData("user_info", userInfo);

      var data = {
        action: "save_user_info",
        data: {
          user_id: userInfo._id,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email,
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
          }
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });
    });
  };

  const exit = () => {
    store.dispatch(setIsSignIn(false));
    clearAll();
  };

  return (
    <View style={(styles.container, { justifyContent: "center" })}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          justifyContent: "flex-start",
          paddingLeft: 30,
        }}
      >
        <TouchableOpacity
          style={{
            width: 88,
            height: 88,
            backgroundColor: "lightgrey",
            borderRadius: 100,
          }}
          onPress={() => {}}
        >
          <Image />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 10,
            flexDirection: "column",
          }}
        >
          <TextInput
            style={{
              fontWeight: "bold",
              fontSize: 16,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            value={firstName}
            onChangeText={(txt) => {
              setFirstName(txt);
            }}
          />
          <TextInput
            style={{
              fontWeight: "bold",
              fontSize: 16,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            value={lastName}
            onChangeText={(txt) => {
              setLastName(txt);
            }}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <Input
          style={{ marginTop: 30 }}
          title="Phone"
          placeholder="Phone number"
          value={phone}
          onChangeText={(txt) => {
            setPhone(txt);
          }}
        />
        <Input
          style={{ marginTop: 30 }}
          title="Email"
          placeholder="Email"
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
          }}
        />
        {/* <Input style={{marginTop: 30}} title="Password" placeholder="" value="pasword1234" /> */}
        <Button
          onPress={() => {
            save();
          }}
          style={{ marginTop: 90 }}
          title="Save"
        />
        <Button
          onPress={() => {
            exit();
          }}
          style={{ marginTop: 20 }}
          title="Exit"
        />
      </View>
    </View>
  );
};

export default AccountScreen;
