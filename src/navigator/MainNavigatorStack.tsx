import React from "react";
import { BottomTabParamList, BottomTabRoutes } from "./types";
import { Player } from "../screens/player/Player";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";

const Stack = createStackNavigator<BottomTabParamList>();
export const MainNavigatorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={BottomTabRoutes.HOME}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={BottomTabRoutes.PLAYER}
        component={Player}
      />
    </Stack.Navigator>
  );
};
