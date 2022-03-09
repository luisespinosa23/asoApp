import { StyleSheet } from "react-native";
import { colors } from "../../../global_vars/Colors";

export const styles = StyleSheet.create({
  PrimaryButton: {
    minWidth: 110,
    borderRadius: 15,
    padding: 12,
    backgroundColor: colors.primaryColor,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  PrimaryTextButton: {
    textAlign: "center",
    color: colors.secondaryTextColor,
    fontSize: 20,
  },
  SecondaryButton: {
    minWidth: 110,
    borderRadius: 15,
    padding: 12,
  },

  SecondaryTextButton: {
    textAlign: "center",
    color: colors.primaryColor,
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
