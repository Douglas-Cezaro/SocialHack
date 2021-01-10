import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../pages/home";
import Maps from "../pages/maps";
import Create from "../pages/establishment/create/selectMapPosition";
import Profile from "../pages/profile";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName="Mapa"
    tabBarOptions={{
      activeTintColor: "#4DA384",
      inactiveTintColor: "#777",
    }}
  >
    <Tab.Screen
      name="Descobrir"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="compass" color={"#4DA384"} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Mapa"
      component={Maps}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map" color={"#4DA384"} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Criar"
      component={Create}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus" color={"#4DA384"} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="face" color={"#4DA384"} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
