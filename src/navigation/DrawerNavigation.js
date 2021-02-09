import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountScreen from "../containers/AccountScreen";
import ShopListScreen from "../containers/ShopListScreen";
import OrdersScreen from "../containers/OrdersScreen";
import AddressScreen from "../containers/AddressScreen";

const Drawer = createDrawerNavigator();

const DrowerNavigation = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={ShopListScreen} />
    <Drawer.Screen name="Account" component={AccountScreen} />
    <Drawer.Screen name="Orders" component={OrdersScreen} />
    <Drawer.Screen name="Address" component={AddressScreen} />
  </Drawer.Navigator>
);

export default DrowerNavigation;