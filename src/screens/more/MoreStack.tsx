import React from 'react';
import { MoreRoutes, MoreStackParamList } from './types';
import { createStackNavigator } from '@react-navigation/stack';
import { MoreScreen } from './MoreScreen';

const Stack = createStackNavigator<MoreStackParamList>();

export const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={MoreRoutes.MORE} component={MoreScreen} />
    </Stack.Navigator>
  );
};
