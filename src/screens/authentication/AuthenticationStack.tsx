import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { AuthenticationRouteParamList, AuthenticationRoutes } from './types';
import { SignIn } from './sign-in/SignIn';
import { SignUp } from './sign-up/SignUp';

const Stack = createStackNavigator<AuthenticationRouteParamList>();

export const AuthenticationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={AuthenticationRoutes.SIGNIN}
        component={SignIn}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={AuthenticationRoutes.SIGNUP}
        component={SignUp}
      />
    </Stack.Navigator>
  );
};
