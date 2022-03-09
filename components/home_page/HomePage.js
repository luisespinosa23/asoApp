import React from "react";
import { View } from "react-native";
import HomeButton from "./home_button/HomeButton";
import homeButtonsInfo from "../../home_buttons_info/HomeButtonsInfo";
import { styles } from "./StylesHomePage";

export default function HomePage() {
  const funct = () => {
    console.log("funcion");
  };

  const items = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];
  return (
    <View style={styles.HomeContainer}>
      {homeButtonsInfo.map((item, key) => {
        return (
          <HomeButton
            imagePath={item.imagePath}
            text={item.text}
            link={item.link}
            key={key}
          />
        );
      })}
    </View>
  );
}
