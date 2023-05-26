import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RouteParamList, Routes } from "./types";
import { BottomTabNavigatorStack } from "./BottomTabNavigator";
import { SignIn } from "../screens/sign-in/SignIn";

const RootStack = createStackNavigator<RouteParamList>();

export const AppNavigator = () => {
  const isAuthenticated = true;

  return (
    <RootStack.Navigator>
      {isAuthenticated ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name={Routes.MAIN}
          component={BottomTabNavigatorStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name={Routes.SIGNIN}
          component={SignIn}
        />
      )}
    </RootStack.Navigator>
  );
};
