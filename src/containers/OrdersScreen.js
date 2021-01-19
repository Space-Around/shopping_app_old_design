import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

const Item = (props) => {
  const openBox = () => {};

  return (
    <View
      style={{
        width: '90%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          color: '#79408C',
          fontWeight: 'bold',
        }}>
        #11324
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#79408C',
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
          height: 25,
          borderRadius: 5,
        }}
        onPress={() => {
          openBox();
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Open
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const OrdersScreen = ({navigation}) => {
  const [bleState, setBleState] = React.useState('');
  const manager = new BleManager();

  manager.setLogLevel('None');

  const subscription = manager.onStateChange((state) => {
    if (state === 'PoweredOn') {
      scanAndConnect();
      subscription.remove();
    }
  }, true);

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // console.log(JSON.stringify(error));
        return;
      }

      // setBleState('Scanning..');

      if ('Post-E77FA4E7' == device.name) {
        manager.stopDeviceScan();
        console.log('1');

        device
          .connect()
          .then((d) => { return d.discoverAllServicesAndCharacteristics(); })          
          .then((s) => { return s.characteristicsForService('0e61fff0-6854-4817-96d0-3018d9597d08'); })
          .then((c) => {
            console.log('2');
            c.monitor((e, c) => {
              console.log('3');
            });
          })
          .catch((error) => {});
        // device.connect().then((d) => {
        //   d.discoverAllServicesAndCharacteristics()
        //     .then((d) => {
        //       console.log('2');
        //       // console.log(d);

        //       d.characteristicsForService(
        //         '0e61fff0-6854-4817-96d0-3018d9597d08',
        //       )
        //         .then((r) => {
        //           console.log('3');
        //           // console.log(r);

        //           r.readCharacteristic('0e61fff1-6854-4817-96d0-3018d9597d08')
        //             .then((r2) => {
        //               console.log('4');
        //             })
        //             .catch((error) => {});
        //         })
        //         .catch((error) => {});
        //     })
        //     .catch((error) => {
        //       //       console.log(JSON.stringify(error));
        //     });
        // });
      }
    });
  };

  return (
    <View>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 30,
        }}>
        <Item />
        <Item />
        <Item />
      </ScrollView>
      <TouchableOpacity
        style={{
          width: 200,
          height: 40,
          position: 'absolute',
          zIndex: 10,
          bottom: 10,
          left: 10,
          color: 'grey',
        }}
        onPress={() => {
          console.log('clicks');
          scanAndConnect();
        }}>
        <Text>State: {bleState}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrdersScreen;
