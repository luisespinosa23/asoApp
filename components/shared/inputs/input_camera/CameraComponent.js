import React, { useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { styles } from "./StylesCamera";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function CameraComponent({ closeCam, handleImage }) {
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = useRef();

  const handleFlash = () => {
    if (type === Camera.Constants.Type.back) {
      if (flashMode === Camera.Constants.FlashMode.off) {
        setFlashMode(Camera.Constants.FlashMode.torch);
      } else {
        setFlashMode(Camera.Constants.FlashMode.off);
      }
    }
  };

  const handleType = () => {
    if (type === Camera.Constants.Type.back) {
      setType(Camera.Constants.Type.front);
    } else {
      setType(Camera.Constants.Type.back);
    }
  };

  const handleTakePhoto = async () => {
    const data = await camera.current.takePictureAsync({ quality: 0.2 });
    handleImage(data.uri);
  };

  return (
    <View style={styles.WrapperCamera}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={handleType}>
          <FontAwesomeIcon icon={faRetweet} color={"white"} size={40} />
        </TouchableOpacity>
      </View>
      <Camera
        ref={camera}
        style={styles.Camera}
        ratio="16:9"
        flashMode={flashMode}
        type={type}
      />
      <View style={styles.Footer}>
        <TouchableOpacity onPress={handleFlash}>
          <FontAwesomeIcon icon={faBolt} color={"white"} size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTakePhoto}>
          <FontAwesomeIcon icon={faDotCircle} color={"white"} size={70} />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeCam}>
          <FontAwesomeIcon icon={faTimesCircle} color={"white"} size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

CameraComponent.propTypes = {
  closeCam: PropTypes.func.isRequired,
  handleImage: PropTypes.func.isRequired,
};
