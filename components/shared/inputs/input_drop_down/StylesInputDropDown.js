import { StyleSheet } from "react-native";
import { colors } from "../../../../global_vars/Colors";

export const styles = StyleSheet.create({
  WrapperInput: {
    position: "relative",
    width: "90%",
  },
  Input: {
    width: "100%",
  },
  Label: {
    fontSize: 20,
  },

  SelectText: {
    flexGrow: 1,
    fontSize: 18,
  },

  valueSelected: {
    color: "black",
  },

  Icon: {
    width: 30,
  },

  DropDown: {
    flexDirection: "row",
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
