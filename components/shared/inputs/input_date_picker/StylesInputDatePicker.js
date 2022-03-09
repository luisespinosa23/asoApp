import { StyleSheet } from "react-native";
import { colors } from "../../../../global_vars/Colors";

export const styles = StyleSheet.create({
  clase: {},

  WrapperInput: {
    width: "90%",
  },
  Label: {
    fontSize: 20,
  },

  DatePicker: {
    flexDirection: "row",
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },

  PickerText: {
    flexGrow: 1,
    fontSize: 18,
  },

  dateSelected: {
    color: "black",
  },

  Icon: {
    marginRight: 5,
    width: 30,
  },
});
