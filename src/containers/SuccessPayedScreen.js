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

const SuccessPayedScreen = (props) => {
  return (
    <View style={(styles.container, { alignItems: "center", position: 'relative', height: '100%', justifyContent: 'center' })}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 30,          
        }}
      >Success payed!</Text>
      <Button style={{ marginTop: 40 }} title="HOME" onPress={() => {props.navigation.navigate('HomeScreen');}}/>
    </View>
  );
};

export default SuccessPayedScreen;
