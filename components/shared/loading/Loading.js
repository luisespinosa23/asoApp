import React from "react";
import { ActivityIndicator } from "react-native";
import { styles } from "./StylesLoading";
import { colors } from "../../../global_vars/Colors";

export default function Loading() {
  return (
    <ActivityIndicator
      style={styles.Loading}
      size="large"
      color={colors.primaryColor}
    />
  );
}
