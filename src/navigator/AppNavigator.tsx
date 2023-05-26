import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RouteParamList, Routes } from "./types";
import { MainNavigatorStack } from "./MainNavigatorStack";
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
          component={MainNavigatorStack}
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
