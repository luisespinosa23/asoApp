import React from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./StylesListItem";

export default function ListItem({ array, handleClickRow }) {
  return (
    <TouchableOpacity onPress={() => handleClickRow(array[0])}>
      <View style={styles.ItemListContainer}>
        {array.map((item, key) => {
          if (key !== 0 && key !== 1) {
            if (key == 2) {
              return (
                <Text style={styles.primaryItemText} key={key}>
                  {item}
                </Text>
              );
            } else {
              return (
                <Text style={styles.itemText} key={key}>
                  {item}
                </Text>
              );
            }
          }
        })}
      </View>
    </TouchableOpacity>
  );
}
ListItem.propTypes = {
  handleClickRow: PropTypes.func.isRequired,
  array: PropTypes.array.isRequired,
};
