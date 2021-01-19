import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles/styles";

const Input = (props) => {
  return (
    <View style={[props.style, styles.customInput]}>
      <View
        style={{
          backgroundColor: "#f2f2f2",
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 4,
          paddingBottom: 4,
          position: "absolute",
          top: -15,
          left: 10,
        }}
      >
        <Text>{props.title}</Text>
      </View>
      <TextInput
        onChangeText={(text) => {
          props.onChangeText(text);
        }}
        style={{
          width: "100%",
          height: "100%",
          paddingLeft: 20,
          paddingRight: 20,
        }}
        value={props.value}
        placeholder={props.placeholder}
      />
    </View>
  );
};

export default Input;
