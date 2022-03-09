import { StyleSheet } from "react-native";
import { colors } from "../../../global_vars/Colors";

export const styles = StyleSheet.create({
  SalesPageContainer: {
    display: "flex",
    flexDirection: "column",
  },

  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  HeaderText: {
    fontSize: 20,
    textAlign: "center",
  },

  HeaderGroupText: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 2,
  },
});
