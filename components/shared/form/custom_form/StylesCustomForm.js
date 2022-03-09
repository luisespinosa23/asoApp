import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  CotainerForm: {
    flex: 1,
    // backgroundColor: "red",
  },
  CotainerInputs: {
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
  CotainerButtons: {
    marginTop: 50,
    paddingBottom: 15,
    justifyContent: "space-around",
    flexDirection: "row-reverse",
  },
});
