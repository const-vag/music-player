import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Box } from "../../ui-kit/Box";

export const SignIn = () => {
  const theme = useTheme();

  return (
    <Box style={styles.container}>
      <Text>Sign in</Text>
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
