import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { Box } from "../../ui-kit/Box";

export const Search = () => {
  const theme = useTheme();

  return (
    <Box style={styles.container}>
      <Text>List</Text>
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
