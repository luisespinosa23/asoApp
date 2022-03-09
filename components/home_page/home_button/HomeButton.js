import React from "react";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import { styles } from "./StylesHombeButton";

export default function HomeButton({ imagePath, text, link }) {
  return (
    <Link component={TouchableOpacity} to={link}>
      <View style={styles.ButtonHome}>
        <Image style={styles.ImageButtonHome} source={imagePath} />
        <Text style={styles.TextButtonHome}>{text}</Text>
      </View>
    </Link>
  );
}

HomeButton.propTypes = {
  imagePath: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
