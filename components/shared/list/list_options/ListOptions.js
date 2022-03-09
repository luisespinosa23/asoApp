import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import CustomButton from "../../button/CustomButton";
import { styles } from "./StylesListOptions";

export default function ListOptions({
  handleClickOrderButton,
  handleClickFilterButton,
  handleClickNewButton,
}) {
  return (
    <View style={styles.ListOptionsContainer}>
      {handleClickOrderButton !== undefined && (
        <CustomButton handleClick={handleClickOrderButton} text="Ordenar" />
      )}
      {handleClickFilterButton !== undefined && (
        <CustomButton handleClick={handleClickFilterButton} text="Filtrar" />
      )}
      <CustomButton handleClick={handleClickNewButton} text="Nuevo" />
    </View>
  );
}

ListOptions.propTypes = {
  handleClickOrderButton: PropTypes.func,
  handleClickFilterButton: PropTypes.func,
  handleClickNewButton: PropTypes.func.isRequired,
};
