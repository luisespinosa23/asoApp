import { StyleSheet } from "react-native";
import { colors } from "../../../../global_vars/Colors";

export const styles = StyleSheet.create({
  Button: {
    flexDirection: "row",
    alignItems: "center",
  },

  ButtonText: {
    marginLeft: 10,
    fontSize: 20,
    color: colors.primaryColor,
    fontWeight: "bold",
  },

  WrapperInputCamera: {
    width: "90%",
  },

  WrapperButtonAndImagePreview: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  WrapperImagePreview: {
    width: 100,
    height: 200,
    backgroundColor: "#444444",
  },

  ImagePreviewTouch: {
    width: "100%",
    height: "100%",
  },

  ImagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  ImageSelected: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },

  WrapperButton: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  WrapperImageSelected: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
