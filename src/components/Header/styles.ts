import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 32,

    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    backgroundColor: THEME.COLORS.GRAY_500
  },
  title: {
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.BOLD,
    fontSize: THEME.FONTS.SIZE.LG,
    color: THEME.COLORS.GRAY_200,

    textAlign: "center",
    paddingHorizontal: 16
  }
});