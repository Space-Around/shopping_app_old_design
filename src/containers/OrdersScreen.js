import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Button,
  Switch,
  PermissionsAndroid,
} from "react-native";
import { startBleManager, scanAndConnect } from "../utils/BleManager.js";
import Modal from "react-native-modal";
import styles from "../styles/styles";
import CustomButton from "../components/Button.js";
import { storeData, getData } from "../utils/Storage";
import { IP_ADDR_SERVER, ORDER_STATE } from "../utils/Constants";
import { update } from "js-sha512";

const Item = (props) => {
  return (
    <View
      style={{
        width: "90%",
        height: 60,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          color: "#79408C",
          fontWeight: "bold",
        }}
      >
        {props.id}
      </Text>
      <TouchableOpacity
        style={[
          props.disable ? styles.openDisable : styles.openEnable,
          {
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 25,
            borderRadius: 5,
          },
        ]}
        onPress={() => {
          props.onPress();
          props.setCurrentOrderId(props.id);
        }}
        disabled={props.disable}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Open
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const WrapperComponent = (props) => {
  const [isBluetoothSwitchEnable, setBluetoothToggleEnable] = React.useState(
    false
  );
  const [
    isGeolocationSwitchEnable,
    setGeolocationToggleEnable,
  ] = React.useState(false);

  const toggleBluetoothSwitch = () =>
    setBluetoothToggleEnable(!isBluetoothSwitchEnable);
  const toggleGeolocationSwitch = () =>
    setGeolocationToggleEnable(!isGeolocationSwitchEnable);

  const [isScanning, setScanningState] = React.useState(false);
  const [boxOpenState, setBoxOpenState] = React.useState("CONNECT");

  return (
    <View>
      <Modal
        isVisible={props.isModalVisible}
        onBackdropPress={() => props.setModalVisible(false)}
        onSwipeComplete={() => props.setModalVisible(false)}
        swipeDirection={["up", "down"]}
        onModalWillShow={() => startBleManager()}
      >
        <View
          style={{
            width: "98%",
            height: "80%",
            backgroundColor: "white",
            borderRadius: 10,
            paddingLeft: 20,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              1. Turn on Bluetooth
            </Text>
            {/* <Switch
              trackColor={{false: '#767577', true: '#b1a5b5'}}
              thumbColor={isBluetoothSwitchEnable ? '#79408C' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                toggleBluetoothSwitch(!isBluetoothSwitchEnable)
              }
              value={isBluetoothSwitchEnable}
            /> */}
          </View>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              2. Turn on Geolocation
            </Text>
            {/* <Switch
              trackColor={{false: '#767577', true: '#b1a5b5'}}
              thumbColor={isGeolocationSwitchEnable ? '#79408C' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                toggleGeolocationSwitch(!isGeolocationSwitchEnable)
              }
              value={isGeolocationSwitchEnable}
            /> */}
          </View>
          <CustomButton
            style={{
              position: "absolute",
              bottom: 40,
              left: 9,
            }}
            title={boxOpenState}
            disabled={isScanning}
            onPress={() => {
              scanAndConnect(
                setScanningState,
                setBoxOpenState,
                props.setModalVisible,
                props.currentOrderId,
                props.updateOrderList,
                props.setOrdersList
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const OrdersScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [ordersList, setOrdersList] = React.useState([]);
  const [currentOrderId, setCurrentOrderId] = React.useState(0);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const update = () => {
    console.log("update order list");
    getData("user_info").then((r) => {
      var data = {
        action: "get_orders",
        data: {
          user_id: r._id,
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
          console.log(data);
          if (data) {
            let tmpOrdersList = [];
            for (let i = 0; i < data.length; i++) {
              const element = data[i];
              let disable = true;

              if (data[i].state != ORDER_STATE.USER_PICKED_UP) disable = false;

              tmpOrdersList.push(
                <Item
                  onPress={toggleModal}
                  id={element._id}
                  key={i}
                  setCurrentOrderId={setCurrentOrderId}
                  disable={disable}
                />
              );
            }

            setOrdersList(tmpOrdersList);
          }
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });
    });
  };

  React.useEffect(() => {
    update();
  }, []);

  // update();

  return (
    <View>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        {ordersList}
      </ScrollView>
      <TouchableOpacity
        style={{
          width: 200,
          height: 40,
          position: "absolute",
          zIndex: 10,
          bottom: 10,
          left: 10,
          color: "grey",
        }}
        onPress={() => {
          // scanAndConnect();
        }}
      ></TouchableOpacity>
      <Button title="Show modal" onPress={toggleModal} />
      <CustomButton
        style={{
          position: "absolute",
          bottom: 70,
          zIndex: 10,
          left: 30,
        }}
        title="UPDATE"
        onPress={() => {
          update();
        }}
      />
      <WrapperComponent
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        currentOrderId={currentOrderId}
        updateOrderList={update}
        setOrdersList={setOrdersList}
      />
    </View>
  );
};

export default OrdersScreen;
