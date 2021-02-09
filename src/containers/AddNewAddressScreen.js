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

const AddNewAddressScreen = () => {
  return (
    <View style={(styles.container, { alignItems: "center", position: 'relative', height: '100%' })}>
      <Input style={{ marginTop: 100 }} title="City" placeholder="Enter city" />
      <Input style={{ marginTop: 40 }} title="House" placeholder="Enter house" />      
      <Input style={{ marginTop: 40 }} title="Room" placeholder="Enter room" />
      <Button style={{ marginTop: 40 }} title="SAVE" onPess={() => {}}/>
    </View>
  );
};

export default AddNewAddressScreen;
