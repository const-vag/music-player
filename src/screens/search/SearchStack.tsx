import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { SearchRoutes, SearchStackParamList } from "./types";
import { SearchContent } from "./SearchContent";
import { ContentStack } from "../content/ContentStack";

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={SearchRoutes.SEARCH_BAR}
        component={SearchContent}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={SearchRoutes.CONTENT}
        component={ContentStack}
      />
    </Stack.Navigator>
  );
};
