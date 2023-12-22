import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MoreStack } from '../screens/more/MoreStack';
import { HomeStack } from '../screens/search/HomeStack';
import { MaterialIcon } from '../ui-kit/MaterialIcon';
import { BottomTabRoutes } from './types';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcon name={focused ? 'home' : 'home-outline'} />
          ),
          tabBarLabel: 'Home',
        }}
        name={BottomTabRoutes.HOME_TAB}
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: 'dots-horizontal',
          tabBarLabel: 'More',
        }}
        name={BottomTabRoutes.MORE_TAB}
        component={MoreStack}
      />
    </Tab.Navigator>
  );
};
