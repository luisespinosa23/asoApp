/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./StylesInputText";
import { styleIsRequired } from "../../../../global_vars/StyleIsRequired";
import { stylesInputError } from "../../../../global_vars/StylesInputError";

export default function InputText({
  placeholder,
  messageError,
  isError,
  handleOnBlur,
  isRequired,
  type,
  value,
  isPassword,
  label,
  id,
  multiline,
  numberOfLines,
}) {
  const [valueState, setValueState] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setValueState(value);
    }
  }, [value]);

  const onBlur = () => {
    handleOnBlur(valueState, id);
  };

  const handleOnChange = (text) => {
    setValueState(text);
  };

  return (
    <View style={styles.ContainerInputText}>
      {isRequired === true && (
        <Text style={styleIsRequired.Required}>obligatorio</Text>
      )}
      {isRequired === false && (
        <Text style={styleIsRequired.NoRequired}>opcional</Text>
      )}
      <Text style={styles.Label}>{label}</Text>
      <TextInput
        onChangeText={handleOnChange}
        onBlur={onBlur}
        style={styles.InputText}
        placeholder={placeholder}
        keyboardType={type}
        value={valueState}
        secureTextEntry={isPassword}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      {/* <Text style={stylesInputError.ErrorMessage}>
        {isError === true && messageError}
      </Text> */}
    </View>
  );
}

InputText.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleOnBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  messageError: PropTypes.string,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["default", "numeric", "email-address"]).isRequired,
  isPassword: PropTypes.bool.isRequired,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
};
