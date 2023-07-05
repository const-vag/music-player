import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AppNavigatorRouteParamList, AppNavigatorRoutes } from "./types";
import { MainNavigatorStack } from "./MainNavigatorStack";
import { AuthenticationStack } from "../screens/authentication/AuthenticationStack";

const RootStack = createStackNavigator<AppNavigatorRouteParamList>();

export const AppNavigator = () => {
  const isAuthenticated = true;

  return (
    <RootStack.Navigator>
      {isAuthenticated ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name={AppNavigatorRoutes.MAIN}
          component={MainNavigatorStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name={AppNavigatorRoutes.AUTHENTICATION}
          component={AuthenticationStack}
        />
      )}
    </RootStack.Navigator>
  );
};
