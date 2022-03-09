import React from "react";
import PropTypes from "prop-types";
import { TouchableHighlight, Text, TouchableOpacity } from "react-native";
import { styles } from "./StylesButton";
import { colors } from "../../../global_vars/Colors";

export default function CustomButton({ handleClick, text, isSecondary }) {
  return (
    <>
      {isSecondary ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.SecondaryButton}
          onPress={handleClick}
        >
          <Text style={styles.SecondaryTextButton}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableHighlight
          underlayColor={colors.primaryColorPressed}
          style={styles.PrimaryButton}
          onPress={handleClick}
        >
          <Text style={styles.PrimaryTextButton}>{text}</Text>
        </TouchableHighlight>
      )}
    </>
  );
}

CustomButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isSecondary: PropTypes.bool,
};
