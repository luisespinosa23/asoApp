import { StyleSheet } from "react-native";
import { colors } from "../../../../global_vars/Colors";

export const styles = StyleSheet.create({
  ItemListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primaryColor,
    paddingBottom: 10,
  },

  primaryItemText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  itemText: {
    fontSize: 18,
  },
});
