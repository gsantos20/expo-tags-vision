import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    backgroundColor: THEME.COLORS.GRAY_500,
  },
  input: {
    flex: 1,
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,
    fontSize: THEME.FONTS.SIZE.MD,

    textAlignVertical: 'top',
  },
  clear: {
    height: 22,
    width: 22,
    borderRadius: 11,

    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    top: 10,
    right: 10,

    backgroundColor: THEME.COLORS.GRAY_400,
  },
  disabled: {
    opacity: 0.5
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingIndicator: {
    marginVertical: '30%',
    paddingBottom: '30%',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipIconContainer: {
    backgroundColor: '#ffffff00',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 5
  },
  retakeContainer: {
    backgroundColor: '#ffffff00',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5
  },
  scanContainer: {
    backgroundColor: '#ffffff00',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 5
  },
  captureButton: {
    marginBottom: '5%',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'white',
    left: '42%',
  },
});