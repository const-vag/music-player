import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { ContentParamList, ContentRoutes } from './types';
import { Artist } from './artist/Artist';
import { Album } from './album/Album';

const Stack = createStackNavigator<ContentParamList>();

export const ContentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...TransitionPresets.DefaultTransition,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={ContentRoutes.ARTIST}
        component={Artist}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.DefaultTransition,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={ContentRoutes.ALBUM}
        component={Album}
      />
    </Stack.Navigator>
  );
};
