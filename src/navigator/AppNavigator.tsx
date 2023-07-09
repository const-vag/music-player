import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppNavigatorRouteParamList, AppNavigatorRoutes } from './types';
import { MainNavigatorStack } from './MainNavigatorStack';
import { AuthenticationStack } from '../screens/authentication/AuthenticationStack';
import { useAuthToken } from '../shared/hooks/useAuthToken';

const RootStack = createStackNavigator<AppNavigatorRouteParamList>();

export const AppNavigator = () => {
  const authToken = useAuthToken();
  console.log(
    '🚀 ~ file: AppNavigator.tsx:13 ~ AppNavigator ~ accessToken:',
    authToken
  );

  return (
    <RootStack.Navigator>
      {authToken ? (
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
