import React, { ComponentProps, Fragment, useEffect } from "react";
import { Search } from "../screens/search/Search";
import { More } from "../screens/more/More";
import { AnimatedFAB, BottomNavigation } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabParamList, BottomTabRoutes } from "./types";
import { Home } from "../screens/home/Home";
import { Player } from "../screens/player/Player";
import { useNavigation } from "@react-navigation/native";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";

type BaseRoute = ComponentProps<
  typeof BottomNavigation
>["navigationState"]["routes"][number];

const routes: BaseRoute[] = [
  {
    key: BottomTabRoutes.HOME,
    title: "Home",
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  { key: BottomTabRoutes.SEARCH, title: "Search", focusedIcon: "magnify" },
  { key: BottomTabRoutes.MORE, title: "More", focusedIcon: "dots-horizontal" },
];

const BottomTabNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const renderScene = BottomNavigation.SceneMap({
    [BottomTabRoutes.HOME]: Home,
    [BottomTabRoutes.SEARCH]: Search,
    [BottomTabRoutes.MORE]: More,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <AnimatedFAB
        icon={"play"}
        label={"SNIK, TRANNOS - GAMW TON LIGHT"}
        extended
        onPress={() => navigation.navigate(BottomTabRoutes.PLAYER)}
        visible
        animateFrom={"right"}
        // iconMode={"static"}
        style={{ alignSelf: "center", bottom: bottom + 85 }}
      />
    </>
  );
};

const Stack = createStackNavigator<BottomTabParamList>();
export const BottomTabNavigatorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={BottomTabRoutes.HOME}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name={BottomTabRoutes.PLAYER}
        component={Player}
      />
    </Stack.Navigator>
  );
};
