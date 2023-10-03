import { useNavigation } from '@react-navigation/native';

export const usePlayer = () => {
  const navigation = useNavigation();

  return {
    navigation,
  };
};
