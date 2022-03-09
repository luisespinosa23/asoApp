import React, { useContext } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { styles } from "./StylesLoggin";
import UserContext from "../../context/user/UserContext";

export default function Loggin() {
  const userState = useContext(UserContext);

  return (
    <View style={styles.ContainerLoggin}>
      <Image style={styles.Logo} source={require("../../assets/logo.png")} />
      <TouchableHighlight
        underlayColor={"#EC7063"}
        style={styles.GoogleButton}
        onPress={userState.login}
      >
        <Text style={styles.TextGoogleButton}>Acceder con google</Text>
      </TouchableHighlight>
    </View>
  );
}
