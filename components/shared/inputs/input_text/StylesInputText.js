import { StyleSheet } from "react-native";
import { colors } from "../../../../global_vars/Colors";

export const styles = StyleSheet.create({
  ContainerInputText: {
    width: "90%",
  },

  InputText: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 1,
  },

  Label: {
    fontSize: 20,
  },
});
