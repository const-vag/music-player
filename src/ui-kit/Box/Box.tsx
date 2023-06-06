import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { BoxProps } from "./types";

export const Box = (props: BoxProps) => {
  const theme = useTheme();

  const { direction = "column" } = props;

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: theme.colors.background,
          flexDirection: direction,
          margin: props.m,
          marginBottom: props.mb,
          marginTop: props.mt,
          marginLeft: props.ml,
          marginRight: props.mr,
          marginHorizontal: props.mh,
          marginVertical: props.mv,
          padding: props.p,
          paddingBottom: props.pb,
          paddingTop: props.pt,
          paddingLeft: props.pl,
          paddingRight: props.pr,
          paddingHorizontal: props.ph,
          paddingVertical: props.pv,
        },
        styles.box,
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
  },
});
export { BoxProps };
