import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { ComponentProps } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabParamList, BottomTabRoutes } from "./types";
import { AnimatedFAB, BottomNavigation } from "react-native-paper";
import { Home } from "../screens/home/Home";
import { More } from "../screens/more/More";
import { SearchStack } from "../screens/search/SearchStack";

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

export const BottomTabNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();

  const renderScene = BottomNavigation.SceneMap({
    [BottomTabRoutes.HOME]: Home,
    [BottomTabRoutes.SEARCH]: SearchStack,
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
