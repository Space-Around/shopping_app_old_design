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

const AccountScreen = () => {
  return (
    <View style={styles.container, {justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          alignItems: 'center',
          width: "100%",
          justifyContent: 'flex-start',
          paddingLeft: 30
        }}
      >
        <TouchableOpacity 
          style={{
            width: 88,
            height: 88,
            backgroundColor: 'lightgrey',
            borderRadius: 100
          }}
          onPress={() => {}}
        >
          <Image />
        </TouchableOpacity>
        <View 
          style={{
            marginLeft: 10,                        
          }}
        >
          <TextInput 
          style={{
            fontWeight: 'bold',
            fontSize: 16
          }}
          value="Ivanov Ivan Ivanovich" 
          />
          <Image />
        </View>
      </View>
      <View
        style={{          
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Input style={{marginTop: 30}} title="phone" placeholder="Phone number" value="89680345699" />
        <Input style={{marginTop: 30}} title="Email" placeholder="Email" value="ViksnaMax@mail.ru" />
        <Input style={{marginTop: 30}} title="Password" placeholder="" value="pasword1234" />
        <Button onPress={() => {}} style={{marginTop: 90}} title="Save" />
      </View>
    </View>
  );
};

export default AccountScreen;
