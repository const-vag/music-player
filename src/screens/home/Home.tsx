import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, Text, AnimatedFAB } from "react-native-paper";
import { Box } from "../../ui-kit/Box";

export const Home = () => {
  const theme = useTheme();

  return (
    <Box style={styles.container}>
      <Text>Player</Text>
      <StatusBar style="auto" />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
