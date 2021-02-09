import React from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import styles from "../styles/styles";

const Button = (props) => {
  return (
    <TouchableOpacity 
    style={[props.style, styles.customButton]}
    onPress={() => {props.onPress();}}
    disabled={props.disabled == undefined ? false : props.disabled}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "600",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
