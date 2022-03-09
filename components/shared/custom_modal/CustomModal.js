import React from "react";
import { useState, useEffect } from "react";
import { Modal, Text, View } from "react-native";
import CustomButton from "../button/CustomButton";
import PropTypes from "prop-types";
import { styles } from "./StylesCustomModa";
export default function CustomModal({
  message,
  isOpen,
  handlePrimaryButton,
  handleSecondaryButton,
  primaryText,
  secondaryText,
}) {
  const [isOpenModal, setIsOpenModal] = useState();

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpenModal}
      animationType="slide"
    >
      <View style={styles.ContainerModal}>
        <View style={styles.Modal}>
          <Text style={styles.TextModal}>{message}</Text>
          <View>
            <CustomButton
              handleClick={handlePrimaryButton}
              isSecondary={false}
              text={primaryText}
            />

            {secondaryText !== undefined && (
              <CustomButton
                handleClick={handleSecondaryButton}
                isSecondary={true}
                text={secondaryText}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

CustomModal.propTypes = {
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handlePrimaryButton: PropTypes.func.isRequired,
  handleSecondaryButton: PropTypes.func,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
};
