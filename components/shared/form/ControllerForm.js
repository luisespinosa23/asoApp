import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import InputText from "../inputs/input_text/InputText";
import InputDropDown from "../inputs/input_drop_down/InputDropDown";
import InputDatePicker from "../inputs/input_date_picker/InputDatePicker";
import InputCamera from "../inputs/input_camera/InputCamera";
import CustomButton from "../button/CustomButton";
import CustomForm from "../form/custom_form/CustomForm";

export default function ControllerForm({ inputsInfoArray, buttonsInfoArray }) {
  const [inputsInfo, setInputsInfo] = useState(inputsInfoArray);
  const [inputsElements, setInputsElements] = useState([]);

  const [buttonsInfo, setButtonsInfo] = useState(buttonsInfoArray);
  const [buttonsElements, setButtonsElements] = useState([]);

  const handleChangeInputs = useCallback(
    (value, id) => {
      const newInputs = inputsInfo.map((element) => {
        if (element.id === id) {
          const newElement = {
            ...element,
            value: value,
          };
          return newElement;
        } else {
          return element;
        }
      });
      setInputsInfo(newInputs);
    },
    [inputsInfo]
  );

  const confirmClick = useCallback(() => {
    let error = false;
    let values = [];
    inputsInfo.forEach((element) => {
      if (element.isRequired) {
        if (element.value === undefined || element.value === "") {
          error = true;
        } else {
          values.push({
            field: element["name"],
            value: element.value,
          });
        }
      } else {
        if (element.value !== undefined && element.value !== "") {
          values.push({
            field: element["name"],
            value: element.value,
          });
        }
      }
    });
    console.log("values", values);
    buttonsInfo[0].handleClick(values, error);
  }, [inputsInfo]);

  const cancelClick = () => {
    buttonsInfo[1].handleClick();
  };

  useEffect(() => {
    const newInputs = inputsInfo.map((element, key) => {
      if (element.element === "input") {
        return (
          <InputText
            id={element.id}
            key={key}
            handleOnBlur={handleChangeInputs}
            isPassword={element.isPassword}
            isRequired={element.isRequired}
            label={element.label}
            placeholder={element.placeholder}
            type={element.type}
            value={element.value}
            multiline={element.multiline}
            numberOfLines={element.numberOfLines}
          />
        );
      } else if (element.element === "dropDown") {
        return (
          <InputDropDown
            id={element.id}
            key={key}
            handleSelection={handleChangeInputs}
            isRequired={element.isRequired}
            items={element.items}
            label={element.label}
            placeholder={element.placeholder}
            value={element.value}
          />
        );
      } else if (element.element === "datePicker") {
        return (
          <InputDatePicker
            id={element.id}
            key={key}
            handleDateChange={handleChangeInputs}
            isRequired={element.isRequired}
            label={element.label}
            placeholder={element.placeholder}
            value={element.value}
          />
        );
      } else if (element.element === "camera") {
        return (
          <InputCamera
            handleValueChange={handleChangeInputs}
            key={key}
            id={element.id}
            isRequired={element.isRequired}
            value={element.value}
          />
        );
      }
    });
    setInputsElements(newInputs);
  }, [inputsInfo, handleChangeInputs]);

  useEffect(() => {
    const newButtons = buttonsInfo.map((element, key) => {
      if (element.isSecondary) {
        return {
          handleClick: element.handleClick,
          element: (
            <CustomButton
              key={key}
              handleClick={cancelClick}
              text={element.text}
              isSecondary={element.isSecondary}
            />
          ),
        };
      } else {
        return {
          handleClick: element.handleClick,
          element: (
            <CustomButton
              key={key}
              handleClick={confirmClick}
              text={element.text}
            />
          ),
        };
      }
    });
    setButtonsElements(newButtons);
  }, [buttonsInfoArray, confirmClick]);

  return (
    <>
      {inputsElements.length > 0 && buttonsElements.length > 0 && (
        <CustomForm inputs={inputsElements} buttons={buttonsElements} />
      )}
    </>
  );
}

ControllerForm.propTypes = {
  buttonsInfoArray: PropTypes.arrayOf(
    PropTypes.shape({
      handleClick: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
      isSecondary: PropTypes.bool,
    })
  ).isRequired,
  inputsInfoArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      element: PropTypes.oneOf(["input", "dropDown", "datePicker", "camera"])
        .isRequired,
      placeholder: PropTypes.string,
      isRequired: PropTypes.bool.isRequired,
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOf(["default", "numeric", "email-address"]),
      isPassword: PropTypes.bool,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }).isRequired
      ),
      multiline: PropTypes.bool,
      numberOfLines: PropTypes.number,
    })
  ),
};
