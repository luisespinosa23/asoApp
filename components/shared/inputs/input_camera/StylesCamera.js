import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  WrapperCamera: {
    height: "100%",
    width: "100%",
  },
  Camera: {
    height: "80%",
    width: "100%",
  },

  Footer: {
    backgroundColor: "black",
    height: "15%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  Header: {
    backgroundColor: "black",
    alignItems: "flex-end",
    paddingRight: 20,
    height: "5%",
    width: "100%",
  },
});
