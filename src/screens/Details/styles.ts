import { StyleSheet } from "react-native";

import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.GRAY_500
  },
  content: {
    padding: 8,
    gap: 8,
    backgroundColor: THEME.COLORS.GRAY_600
  },
  options: {
    flex: 1,
    marginBottom: 8,
    backgroundColor: THEME.COLORS.GRAY_500
  }
});