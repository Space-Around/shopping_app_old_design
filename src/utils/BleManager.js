import { NativeModules, NativeEventEmitter } from "react-native";
import aesjs from "aes-js";
import BleManager from "react-native-ble-manager";

import { ORDER_STATE, IP_ADDR_SERVER } from "./Constants";

const service = "0e61fff0-6854-4817-96d0-3018d9597d08";
const characteristic = "0e61fff1-6854-4817-96d0-3018d9597d08";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const key = [
  0xac,
  0x8a,
  0xce,
  0x03,
  0xfd,
  0x3f,
  0x41,
  0x3a,
  0xab,
  0x34,
  0x04,
  0xc7,
  0x69,
  0x4f,
  0x28,
  0x74,
];

let token = [];

let connectionState = {};

let setScanningState = () => {};
let setBoxOpenState = () => {};
let setModalVisible = () => {};
let updateOrderList = () => {};
let setOrdersList = () => {};
let currentOrderId = "";

const getRandomInt = (max) => {
  return Number(Math.floor(Math.random() * Math.floor(max)));
};

const crc16 = (s) => {
  let crcTable = [
    0x0000,
    0x1021,
    0x2042,
    0x3063,
    0x4084,
    0x50a5,
    0x60c6,
    0x70e7,
    0x8108,
    0x9129,
    0xa14a,
    0xb16b,
    0xc18c,
    0xd1ad,
    0xe1ce,
    0xf1ef,
    0x1231,
    0x0210,
    0x3273,
    0x2252,
    0x52b5,
    0x4294,
    0x72f7,
    0x62d6,
    0x9339,
    0x8318,
    0xb37b,
    0xa35a,
    0xd3bd,
    0xc39c,
    0xf3ff,
    0xe3de,
    0x2462,
    0x3443,
    0x0420,
    0x1401,
    0x64e6,
    0x74c7,
    0x44a4,
    0x5485,
    0xa56a,
    0xb54b,
    0x8528,
    0x9509,
    0xe5ee,
    0xf5cf,
    0xc5ac,
    0xd58d,
    0x3653,
    0x2672,
    0x1611,
    0x0630,
    0x76d7,
    0x66f6,
    0x5695,
    0x46b4,
    0xb75b,
    0xa77a,
    0x9719,
    0x8738,
    0xf7df,
    0xe7fe,
    0xd79d,
    0xc7bc,
    0x48c4,
    0x58e5,
    0x6886,
    0x78a7,
    0x0840,
    0x1861,
    0x2802,
    0x3823,
    0xc9cc,
    0xd9ed,
    0xe98e,
    0xf9af,
    0x8948,
    0x9969,
    0xa90a,
    0xb92b,
    0x5af5,
    0x4ad4,
    0x7ab7,
    0x6a96,
    0x1a71,
    0x0a50,
    0x3a33,
    0x2a12,
    0xdbfd,
    0xcbdc,
    0xfbbf,
    0xeb9e,
    0x9b79,
    0x8b58,
    0xbb3b,
    0xab1a,
    0x6ca6,
    0x7c87,
    0x4ce4,
    0x5cc5,
    0x2c22,
    0x3c03,
    0x0c60,
    0x1c41,
    0xedae,
    0xfd8f,
    0xcdec,
    0xddcd,
    0xad2a,
    0xbd0b,
    0x8d68,
    0x9d49,
    0x7e97,
    0x6eb6,
    0x5ed5,
    0x4ef4,
    0x3e13,
    0x2e32,
    0x1e51,
    0x0e70,
    0xff9f,
    0xefbe,
    0xdfdd,
    0xcffc,
    0xbf1b,
    0xaf3a,
    0x9f59,
    0x8f78,
    0x9188,
    0x81a9,
    0xb1ca,
    0xa1eb,
    0xd10c,
    0xc12d,
    0xf14e,
    0xe16f,
    0x1080,
    0x00a1,
    0x30c2,
    0x20e3,
    0x5004,
    0x4025,
    0x7046,
    0x6067,
    0x83b9,
    0x9398,
    0xa3fb,
    0xb3da,
    0xc33d,
    0xd31c,
    0xe37f,
    0xf35e,
    0x02b1,
    0x1290,
    0x22f3,
    0x32d2,
    0x4235,
    0x5214,
    0x6277,
    0x7256,
    0xb5ea,
    0xa5cb,
    0x95a8,
    0x8589,
    0xf56e,
    0xe54f,
    0xd52c,
    0xc50d,
    0x34e2,
    0x24c3,
    0x14a0,
    0x0481,
    0x7466,
    0x6447,
    0x5424,
    0x4405,
    0xa7db,
    0xb7fa,
    0x8799,
    0x97b8,
    0xe75f,
    0xf77e,
    0xc71d,
    0xd73c,
    0x26d3,
    0x36f2,
    0x0691,
    0x16b0,
    0x6657,
    0x7676,
    0x4615,
    0x5634,
    0xd94c,
    0xc96d,
    0xf90e,
    0xe92f,
    0x99c8,
    0x89e9,
    0xb98a,
    0xa9ab,
    0x5844,
    0x4865,
    0x7806,
    0x6827,
    0x18c0,
    0x08e1,
    0x3882,
    0x28a3,
    0xcb7d,
    0xdb5c,
    0xeb3f,
    0xfb1e,
    0x8bf9,
    0x9bd8,
    0xabbb,
    0xbb9a,
    0x4a75,
    0x5a54,
    0x6a37,
    0x7a16,
    0x0af1,
    0x1ad0,
    0x2ab3,
    0x3a92,
    0xfd2e,
    0xed0f,
    0xdd6c,
    0xcd4d,
    0xbdaa,
    0xad8b,
    0x9de8,
    0x8dc9,
    0x7c26,
    0x6c07,
    0x5c64,
    0x4c45,
    0x3ca2,
    0x2c83,
    0x1ce0,
    0x0cc1,
    0xef1f,
    0xff3e,
    0xcf5d,
    0xdf7c,
    0xaf9b,
    0xbfba,
    0x8fd9,
    0x9ff8,
    0x6e17,
    0x7e36,
    0x4e55,
    0x5e74,
    0x2e93,
    0x3eb2,
    0x0ed1,
    0x1ef0,
  ];

  var crc = 0xffff;
  var j, i;

  for (i = 0; i < s.length; i++) {
    let c = s[i];
    if (c > 255) {
      throw new RangeError();
    }
    j = (c ^ (crc >> 8)) & 0xff;
    crc = crcTable[j] ^ (crc << 8);
  }

  return (crc ^ 0) & 0xffff;
};

const dec2hex = (dec) => {
  let hex = dec.toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

const toLittleEndian = (number, dontPad) => {
  var power = Math.floor(Math.log(number) / Math.LN2 / 8) * 8;
  var multiplier = Math.pow(2, power);
  var value = Math.floor(number / multiplier);
  var remainder = number % multiplier;
  var endian = "";
  if (remainder > 255) {
    endian += toLittleEndian(remainder, true);
  } else if (power !== 0) {
    endian += dec2hex(remainder);
  }
  endian += dec2hex(value);
  if (!dontPad) {
    var padding = 16 - endian.length;
    for (var i = 0; i < padding; i++) {
      endian += "0";
    }
  }
  return endian;
};

const handleStopScan = () => {
  console.log("Handler: Scan is stopped");

  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    if (peripheralsArray.length == 0) {
      setBoxOpenState("CONNECT");
      setScanningState(false);
    }
  });
};

const handleDisconnectedPeripheral = (data) => {
  // console.log('Disconnected');
  setScanningState(false);
  setBoxOpenState("CONNECT");
};

const handleUpdateValueForCharacteristic = (data) => {
  let aesEcb = new aesjs.ModeOfOperation.ecb(key);

  let decryptedBytes = aesEcb.decrypt(data.value);

  let responseCode = decryptedBytes[0].toString(16);
  console.log(responseCode);
  switch (responseCode) {
    case "e0": {
      console.log("Response: Key generation success");

      token = [
        decryptedBytes[1],
        decryptedBytes[2],
        decryptedBytes[3],
        decryptedBytes[4],
      ];

      console.log(token);

      let lockHoldTime = [0xe8, 0x03];

      let requestData = [
        0xa1,
        token[0],
        token[1],
        token[2],
        token[3],
        0x14,
        lockHoldTime[0],
        lockHoldTime[1],
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
      ];

      let crc = toLittleEndian(crc16(requestData), true);

      requestData.push(parseInt(crc[0] + crc[1], 16));
      requestData.push(parseInt(crc[2] + crc[3], 16));

      let aesEcb = new aesjs.ModeOfOperation.ecb(key);
      let encryptedBytes = aesEcb.encrypt(requestData);

      let array = [];

      for (let i = 0; i < encryptedBytes.length; i++) {
        array.push(encryptedBytes[i]);
      }

      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        BleManager.write(peripheralsArray[0].id, service, characteristic, array)
          .then((r3) => {
            console.log("Request: Open");
            setBoxOpenState("TRYING OPEN...");
          })
          .catch((error) => {
            // Failure code
            console.log(error);
            disconnect("OPENED");
          });
      });

      break;
    }

    case "e1": {
      console.log("Response: Success opened");

      setBoxOpenState("OPENED");
      setModalVisible(false);      

      let data = {
        action: "change_order_state",
        data: {
          order_state: ORDER_STATE.USER_PICKED_UP,
          order_id: currentOrderId
        }
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
          console.log("ble update order list");
          console.log(data);
          updateOrderList();
          // console.log(data);
          // if (data) {
          //   let tmpOrdersList = [];
          //   for (let i = 0; i < data.length; i++) {
          //     const element = data[i];
          //     tmpOrdersList.push(
          //       <Item
          //         onPress={toggleModal}
          //         id={element._id}
          //         key={i}
          //         setCurrentOrderId={setCurrentOrderId}
          //       />
          //     );
          //   }
          //   setOrdersList(tmpOrdersList);
          // }
        })
        .catch((error) => {
          console.log(`error: ${error.message}`);
        });

      setTimeout(() => {
        disconnect("CONNECT");
      }, 1000);
      break;
    }

    case "fe": {
      console.log("Busy");
      disconnect("TRY LATTER");
      break;
    }

    case "ff": {
      console.log("Response: Error");
      disconnect("TRY RECONNECT");
      break;
    }
  }
};

const handleDiscoverPeripheral = (peripheral) => {
  if (!peripheral.name) {
    peripheral.name = "NO NAME";
  }

  if (peripheral.name.indexOf("Post") != -1) {
    BleManager.connect(peripheral.id).then(() => {
      console.log("Connected");

      setBoxOpenState("CONNECTED");

      let data = [
        0xa0,
        0x29,
        0x84,
        0x5a,
        0x10,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
      ];

      let crc = toLittleEndian(crc16(data), true);

      data.push(parseInt(crc[0] + crc[1], 16));
      data.push(parseInt(crc[2] + crc[3], 16));

      let aesEcb = new aesjs.ModeOfOperation.ecb(key);
      let encryptedBytes = aesEcb.encrypt(data);

      let array = [];

      for (let i = 0; i < encryptedBytes.length; i++) {
        array.push(encryptedBytes[i]);
      }

      BleManager.retrieveServices(peripheral.id)
        .then((r1) => {
          BleManager.startNotification(peripheral.id, service, characteristic)
            .then((r2) => {
              BleManager.write(peripheral.id, service, characteristic, array)
                .then((r3) => {
                  console.log("Request: Generate key");
                  setBoxOpenState("GENERATING KEY");
                })
                .catch((error) => {
                  console.log(error);
                  disconnect("RECONNECT");
                });
            })
            .catch((error) => {
              console.log(error);
              disconnect("RECONNECT");
            });
        })
        .catch((error) => {
          console.log(error);
          disconnect("RECONNECT");
        });

      // BleManager.retrieveServices(peripheral.id)
      //   .then((r1) => {
      //     console.log('retrieveServices');
      //     return BleManager.startNotification(
      //       peripheral.id,
      //       service,
      //       characteristic,
      //     );
      //   })
      //   .then((r2) => {
      //     console.log('startNotification success');
      //     return BleManager.write(
      //       peripheral.id,
      //       service,
      //       characteristic,
      //       array,
      //     );
      //   })
      //   .then((r3) => {
      //     console.log('Request: Generate key');
      //     setBoxOpenState('GENERATING KEY');
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     disconnect('RECONNECT');
      //   });
    });
  }
};

const handleDidUpdateState = (args) => {
  if (args.state == "off" || args.state == "turning_off") {
    // BleManager.enableBluetooth()
    //   .then(() => {
    //     // Success code
    //     console.log('The bluetooth is already enabled or the user confirm');
    //   })
    //   .catch((error) => {
    //     // Failure code
    //     console.log('The user refuse to enable bluetooth');
    //   });
  }
};

export const startBleManager = () => {
  BleManager.start({ forceLegacy: true })
    .then((r) => {
      console.log("Module initialized");

      setScanningState(false);
      setBoxOpenState("CONNECT");

      bleManagerEmitter.addListener("BleManagerStopScan", handleStopScan);
      bleManagerEmitter.addListener(
        "BleManagerDiscoverPeripheral",
        handleDiscoverPeripheral
      );
      bleManagerEmitter.addListener(
        "BleManagerDidUpdateValueForCharacteristic",
        handleUpdateValueForCharacteristic
      );
      bleManagerEmitter.addListener(
        "BleManagerDisconnectPeripheral",
        handleDisconnectedPeripheral
      );
      bleManagerEmitter.addListener(
        "BleManagerDidUpdateState",
        handleDidUpdateState
      );

      BleManager.checkState();
    })
    .catch((err) => {
      console.error(err);
    });
};

export const scanAndConnect = (
  setScanningStateParam,
  setBoxOpenStateParam,
  setModalVisibleParam,
  currentOrderIdParam,
  updateOrderListParam,
  setOrdersListParam,
) => {
  setScanningState(false);
  setBoxOpenState("CONNECT");
  BleManager.scan([], 5, true)
    .then((r2) => {
      console.log("Scanning...");
      setScanningState = setScanningStateParam;
      setBoxOpenState = setBoxOpenStateParam;
      setModalVisible = setModalVisibleParam;
      currentOrderId = currentOrderIdParam;
      updateOrderList = updateOrderListParam;
      setOrdersList = setOrdersListParam;
      setScanningState(true);
      setBoxOpenState("SCANNING...");
    })
    .catch((err) => {
      console.error(err);
    });
};

const disconnect = (msgText) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    if (peripheralsArray.length > 0) {
      BleManager.disconnect(peripheralsArray[0].id, false)
        .then(() => {
          // Success code
          console.log("Disconnected !force");
          setScanningState(false);
          setBoxOpenState(msgText);
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
    }
  });
};
