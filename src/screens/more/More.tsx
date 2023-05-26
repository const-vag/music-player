import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Box } from "../../ui-kit/Box";

export const More = () => {
  const theme = useTheme();

  return (
    <Box style={styles.container}>
      <Text>More</Text>
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
