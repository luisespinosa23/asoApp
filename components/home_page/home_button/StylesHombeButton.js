import { StyleSheet } from "react-native";
import { colors } from "../../../global_vars/Colors";

export const styles = StyleSheet.create({
  ButtonHome: {
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    width: 160,
    alignItems: "center",
    justifyContent: "center",
  },

  ImageButtonHome: {
    width: "100%",
    resizeMode: "contain",
  },

  TextButtonHome: {
    paddingTop: 10,
    fontSize: 20,
    color: colors.primaryColor,
    fontWeight: "bold",
    textAlign: "center",
  },
});
