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

const CardScreen = () => {
  return (
    <View style={(styles.container, { alignItems: "center", position: 'relative', height: '100%' })}>
      <Input style={{ marginTop: 100 }} title="Card number" placeholder="Enter card number" />
      <Input style={{ marginTop: 40 }} title="Due date" placeholder="Enter due date" />      
      <Input style={{ marginTop: 40 }} title="CVV" placeholder="Enter CVV" />
      <Button style={{ marginTop: 40 }} title="PAY 10 000 $" onPess={() => {}}/>
    </View>
  );
};

export default CardScreen;
