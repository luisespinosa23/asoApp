import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { styles } from "./StylesDropDownOptions";
import { useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import { colors } from "../../../../../global_vars/Colors";

export default function DropDownOptions({
  items,
  selectItem,
  isOpen,
  handleCloseOverlay,
  title,
}) {
  const [isOpenState, setIsOpenState] = useState();

  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);
  const handleSelection = (label, value) => {
    selectItem(label, value);
  };

  const closeOverlay = () => {
    setIsOpenState(false);
    handleCloseOverlay();
  };

  return (
    <Overlay
      isVisible={isOpenState}
      onBackdropPress={closeOverlay}
      style={styles.Overlay}
      backdropStyle={styles.Backdrop}
      overlayStyle={styles.Overlay}
    >
      <View style={styles.ContainerOptions}>
        <Text style={styles.title}>{title}</Text>
        {items.map((element, key) => {
          return (
            <TouchableHighlight
              style={styles.OptionSelect}
              underlayColor={colors.secondaryColor}
              key={key}
              onPress={() => handleSelection(element.label, element.value)}
            >
              <Text style={styles.OptionSelectText}>{element.label}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    </Overlay>
  );
}

DropDownOptions.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleCloseOverlay: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
