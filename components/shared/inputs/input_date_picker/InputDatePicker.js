import React from "react";
import PropTypes from "prop-types";
import { styles } from "./StylesInputDatePicker";
import { styleIsRequired } from "../../../../global_vars/StyleIsRequired";
import { stylesInputError } from "../../../../global_vars/StylesInputError";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../../../global_vars/Colors";
import formaterDate from "../../../../helpers/FormaterDate";

export default function InputDatePicker({
  placeholder,
  label,
  handleDateChange,
  isError,
  messageError,
  isRequired,
  value,
  id,
}) {
  const [date, setDate] = useState();
  const [valueInput, setValueInput] = useState();
  const [openPicker, setOpenPicker] = useState(false);
  const [cssClassesInput, setCssClassesInput] = useState([styles.PickerText]);

  useEffect(() => {
    if (value !== undefined) {
      setDate(new Date(value));
      setValueInput(formaterDate(new Date(value)));
      let newCssClassesInput = [];
      newCssClassesInput.push(cssClassesInput[0]);
      newCssClassesInput.push(styles.dateSelected);
      setCssClassesInput(newCssClassesInput);
    } else {
      setDate(new Date());
    }
  }, [value]);

  const onPress = () => {
    setOpenPicker(true);
  };

  const closePicker = (event, date) => {
    setOpenPicker(false);
    if (date) {
      let newCssClassesInput = [];
      newCssClassesInput.push(cssClassesInput[0]);
      newCssClassesInput.push(styles.dateSelected);
      setCssClassesInput(newCssClassesInput);
      const newDate = new Date(date);
      setDate(newDate);
      setValueInput(formaterDate(newDate));
      handleDateChange(date, id);
    }
  };

  return (
    <View style={styles.WrapperInput}>
      {isRequired === true && (
        <Text style={styleIsRequired.Required}>obligatorio</Text>
      )}
      {isRequired === false ||
        (isRequired === undefined && (
          <Text style={styleIsRequired.NoRequired}>opcional</Text>
        ))}
      <Text style={styles.Label}>{label}</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.DatePicker} accessible={true}>
          <TextInput
            style={cssClassesInput}
            placeholder={placeholder}
            value={valueInput}
            editable={false}
          />
          <FontAwesomeIcon
            style={styles.Icon}
            icon={faCalendarAlt}
            color={colors.primaryColor}
            size={20}
          />
        </View>
      </TouchableOpacity>
      {openPicker && (
        <DateTimePicker
          value={date}
          mode={"calendar"}
          is24Hour={true}
          display="calendar"
          onChange={closePicker}
          dateFormat="day month year"
        />
      )}

      {/* <Text style={stylesInputError.ErrorMessage}>
        {isError === true && messageError}
      </Text> */}
    </View>
  );
}

InputDatePicker.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.number,
  handleDateChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  isRequired: PropTypes.bool,
  messageError: PropTypes.string,
};
