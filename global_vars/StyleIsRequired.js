import { StyleSheet } from "react-native";
import { colors } from "./Colors";

export const styleIsRequired = StyleSheet.create({
  Required: {
    fontSize: 15,
    color: colors.terciaryTextColor,
    textAlign: "right",
  },

  NoRequired: {
    fontSize: 15,
    color: colors.terciaryTextColor,
    textAlign: "right",
  },
});
