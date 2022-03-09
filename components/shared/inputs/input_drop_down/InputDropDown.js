import React from "react";
import PropTypes from "prop-types";
import { styles } from "./StylesInputDropDown";
import { styleIsRequired } from "../../../../global_vars/StyleIsRequired";
import { stylesInputError } from "../../../../global_vars/StylesInputError";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { colors } from "../../../../global_vars/Colors";
import DropDownOptions from "./DropDownOptions/DropDownOptions";

export default function InputDropDown({
  placeholder,
  handleSelection,
  items,
  isRequired,
  value,
  label,
  id,
}) {
  const [valueState, setValueState] = useState();
  const [visibleOptions, setVisibleOptions] = useState(false);
  const [cssInput, setCssInput] = useState([styles.SelectText]);

  useEffect(() => {
    if (value !== undefined) {
      items.forEach((element) => {
        if (element.value === value) {
          setValueState(element.label);
          const newCssInput = [];
          newCssInput.push(styles.valueSelected);
          setCssInput((cssInput) => [...cssInput, newCssInput]);
        }
      });
    }
  }, [value, styles]);

  const onPress = () => {
    setVisibleOptions(true);
  };

  const selectItem = (label, value) => {
    const newCssInput = [];
    newCssInput.push(cssInput[0]);
    newCssInput.push(styles.valueSelected);
    setCssInput(newCssInput);
    setValueState(label);
    setVisibleOptions(false);
    handleSelection(value, id);
  };
  const handleCloseOverlay = () => {
    setVisibleOptions(false);
  };

  return (
    <View style={styles.WrapperInput} error>
      {isRequired === true && (
        <Text style={styleIsRequired.Required}>obligatorio</Text>
      )}
      {isRequired === false ||
        (isRequired === undefined && (
          <Text style={styleIsRequired.NoRequired}>opcional</Text>
        ))}
      <Text style={styles.Label}>{label}</Text>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.DropDown} accessible={true}>
          <TextInput
            style={cssInput}
            placeholder={placeholder}
            value={valueState}
            editable={false}
          />
          <FontAwesomeIcon
            style={styles.Icon}
            icon={faCaretDown}
            color={colors.primaryColor}
            size={30}
          />
        </View>
      </TouchableOpacity>

      {/* <Text style={stylesInputError.ErrorMessage}>
        {isError === true && messageError}
      </Text> */}

      <DropDownOptions
        items={items}
        selectItem={selectItem}
        isOpen={visibleOptions}
        handleCloseOverlay={handleCloseOverlay}
        title={label}
      />
    </View>
  );
}

InputDropDown.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  messageError: PropTypes.string,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool,
};
