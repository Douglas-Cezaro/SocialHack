import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Preload from "../pages/preload";
import SelectMapPosition from "../pages/establishment/create/selectMapPosition";
import EstablishmentCreate from "../pages/establishment/create/createEstablishment";
import EstablishmentDetails from "../pages/establishment/index";
import MainTab from "./MainTab";
import Header from "../components/Header";
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen
      name="EstablishmentDetails"
      component={EstablishmentDetails}
      options={{
        headerShown: true,
        headerStyle: { alignItems: "center" },
        header: () => <Header title="Estabelecimento" showCancel={false} />,
      }}
    />
    <Stack.Screen
      name="SelectMapPosition"
      component={SelectMapPosition}
      options={{
        headerShown: true,
        header: () => <Header title="Selecione no mapa" showCancel={false} />,
      }}
    />
    <Stack.Screen
      name="EstablishmentCreate"
      component={EstablishmentCreate}
      options={{
        headerShown: true,
        header: () => <Header title="Informe os dados" />,
      }}
    />
  </Stack.Navigator>
);
