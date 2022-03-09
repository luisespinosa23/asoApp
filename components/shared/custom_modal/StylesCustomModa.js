import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  Modal: {
    backgroundColor: "#fff",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    padding: 15,
    borderRadius: 10,
    borderColor: "#aaa",
    borderWidth: 1,
    elevation: 20,
  },

  ContainerModal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#aaaaaa50",
    width: "100%",
  },

  TextModal: {
    marginBottom: 20,
    fontSize: 20,
  },
});
