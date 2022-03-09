import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styles } from "./StylesInputCamera";
import { colors } from "../../../../global_vars/Colors";
import PropTypes from "prop-types";
import { styleIsRequired } from "../../../../global_vars/StyleIsRequired";
import CameraComponent from "./CameraComponent";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../button/CustomButton";

export default function InputCamera({
  isRequired,
  id,
  handleValueChange,
  value,
}) {
  const [openCamera, setOpenCamera] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [valueState, setValueState] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setValueState(value);
    }
  }, [value]);

  const openCam = async () => {
    const permission = await Camera.requestPermissionsAsync();
    if (permission.status === "granted") {
      setOpenCamera(true);
    }
  };

  const closeCam = () => {
    setOpenCamera(false);
  };

  const handleImage = (valueState) => {
    setValueState(valueState);
    setOpenCamera(false);
    handleValueChange(valueState, id);
  };

  const handlePickGalery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.2,
      });
      if (!result.cancelled) {
        setValueState(result.uri);
        handleValueChange(result.uri, id);
      }
    }
  };

  const handlePickImage = () => {
    if (valueState !== "") {
      setOpenImage(true);
    }
  };

  const handleClosePickImage = () => {
    setOpenImage(false);
  };

  return (
    <>
      <View style={styles.WrapperInputCamera}>
        {isRequired === true && (
          <Text style={styleIsRequired.Required}>obligatorio</Text>
        )}
        {isRequired === false && (
          <Text style={styleIsRequired.NoRequired}>opcional</Text>
        )}
        <View style={styles.WrapperButtonAndImagePreview}>
          <View style={styles.WrapperImagePreview}>
            <TouchableOpacity
              style={styles.ImagePreviewTouch}
              onPress={handlePickImage}
            >
              <Image source={{ uri: valueState }} style={styles.ImagePreview} />
            </TouchableOpacity>
          </View>
          <View style={styles.WrapperButton}>
            <TouchableOpacity onPress={openCam} style={styles.Button}>
              <FontAwesomeIcon
                style={styles.Icon}
                icon={faCamera}
                color={colors.primaryColor}
                size={50}
              />
              <Text style={styles.ButtonText}>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickGalery} style={styles.Button}>
              <FontAwesomeIcon
                style={styles.Icon}
                icon={faImages}
                color={colors.primaryColor}
                size={50}
              />
              <Text style={styles.ButtonText}>Elegir foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={openCamera}>
        <CameraComponent closeCam={closeCam} handleImage={handleImage} />
      </Modal>

      <Modal animationType="slide" visible={openImage}>
        <View style={styles.WrapperImageSelected}>
          <Image source={{ uri: valueState }} style={styles.ImageSelected} />
          <CustomButton
            handleClick={handleClosePickImage}
            isSecondary={false}
            text="Cerrar"
          />
        </View>
      </Modal>
    </>
  );
}

InputCamera.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number.isRequired,
  isRequired: PropTypes.bool.isRequired,
  handleValueChange: PropTypes.func.isRequired,
};
