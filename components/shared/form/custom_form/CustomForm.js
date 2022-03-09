import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import { styles } from "./StylesCustomForm";

export default function CustomForm({ inputs, buttons }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.CotainerInputs}>
        {inputs.map((element) => {
          return element;
        })}
      </View>

      <View style={styles.CotainerButtons}>
        {buttons.map((element) => {
          return element.element;
        })}
      </View>
    </ScrollView>
  );
}

CustomForm.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.element),
  buttons: PropTypes.arrayOf(PropTypes.object),
};
