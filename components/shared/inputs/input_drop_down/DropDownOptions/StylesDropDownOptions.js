import { StyleSheet } from "react-native";
import { colors } from "../../../../../global_vars/Colors";
import { Dimensions } from "react-native";
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  Backdrop: {
    backgroundColor: "black",
    opacity: 0.4,
  },
  Overlay: {
    width: "80%",
    height: "auto",
    padding: 5,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
  },
  ContainerOptions: {
    width: "100%",
  },

  OptionSelect: {
    borderRadius: 10,
    paddingRight: 5,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: colors.secondaryColor,
  },

  OptionSelectText: {
    color: colors.primaryTextColor,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },

  title: {
    color: colors.terciaryTextColor,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
});
