import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../containers/AccountScreen";
import AddNewAddressScreen from "../containers/AddNewAddressScreen";
import CardScreen from "../containers/CardScreen";
import CartScreen from "../containers/CartScreen";
import FavoritesScreen from "../containers/FavoritesScreen";
import LoginInScreen from "../containers/LoginInScreen";
import WebViewScreen from "../containers/WebViewScreen";
import RegistrationScreen from "../containers/RegistrationScreen";
// import ShopListScreen from "../containers/ShopListScreen";
import SuccessPayedScreen from "../containers/SuccessPayedScreen";
import HomeScreen from "../containers/HomeScreen";
import BottomNavCustom from "../components/BottomNavCustom";
import { setCurrentScreen, setIsSignIn } from "../redux/actions/actions";
import store from "../redux/store/store";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const getCurrentScreen = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  let route = {};

  if (navigationState.state) {
    route = navigationState.state.routes[navigationState.state.index];
  } else {
    route = navigationState.routes[navigationState.index];
  }

  // dive into nested navigators
  if (route.state) {
    return getCurrentScreen(route);
  }

  return route.name;
};

const sendActionSetCurrentScreen = (state) => {
  let screenName = getCurrentScreen(state);

  store.dispatch(setCurrentScreen(screenName));

  switch (screenName) {
    case "CartScreen": {
      break;
    }
    default:
      break;
  }
};

const NavigationCustom = (props) => {
  const [nav, setNav] = React.useState([]);

  getData("authorization").then((response) => {
    // console.log(response);
    if (response != null || props.isSignIn == true) {
      let tmpNav = [];

      tmpNav.push(
        <Tab.Navigator
          screenOptions={{ tabBarVisible: false }}
          tabBar={(props) => <BottomNavCustom {...props} />}
        >
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen
            name="AddNewAddressScreen"
            component={AddNewAddressScreen}
          />
          <Tab.Screen name="CardScreen" component={CardScreen} />
          <Tab.Screen name="CartScreen" component={CartScreen} />
          <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
          <Tab.Screen name="WebViewScreen" component={WebViewScreen} />
          <Tab.Screen
            name="SuccessPayedScreen"
            component={SuccessPayedScreen}
          />
        </Tab.Navigator>
      );
      setNav(tmpNav);
    } else {
      let tmpNav = [];

      tmpNav.push(
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={LoginInScreen} />
          <Stack.Screen name="Sign Up" component={RegistrationScreen} />
        </Stack.Navigator>
      );

      setNav(tmpNav);
    }
  });

  // if (!props.isSignIn) {
  //   return (
  //     <NavigationContainer
  //       onStateChange={(state) => {
  //         sendActionSetCurrentScreen(state);
  //       }}
  //     >
  //       <Stack.Navigator>
  //         <Stack.Screen name="Sign In" component={LoginInScreen} />
  //         <Stack.Screen name="Sign Up" component={RegistrationScreen} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // } else {
  //   return (
  //     <NavigationContainer
  //       onStateChange={(state) => {
  //         sendActionSetCurrentScreen(state);
  //       }}
  //     >
  //       <Tab.Navigator
  //         screenOptions={{ tabBarVisible: false }}
  //         tabBar={(props) => <BottomNavCustom {...props} />}
  //       >
  //         <Tab.Screen name="HomeScreen" component={HomeScreen} />
  //         <Tab.Screen
  //           name="AddNewAddressScreen"
  //           component={AddNewAddressScreen}
  //         />
  //         <Tab.Screen name="CardScreen" component={CardScreen} />
  //         <Tab.Screen name="CartScreen" component={CartScreen} />
  //         <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
  //         <Tab.Screen name="WebViewScreen" component={WebViewScreen} />
  //         <Tab.Screen
  //           name="SuccessPayedScreen"
  //           component={SuccessPayedScreen}
  //         />
  //       </Tab.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  return (
    <NavigationContainer
      onStateChange={(state) => {
        sendActionSetCurrentScreen(state);
      }}
    >
      {nav}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  let isSignIn = state.setIsSignIn.isSignIn;

  return { isSignIn };
};

export default connect(mapStateToProps)(NavigationCustom);
