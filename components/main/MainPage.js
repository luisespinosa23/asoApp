import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import HomePage from "../home_page/HomePage";
import Workers from "../workers/Workers";
import Lots from "../lots/Lots";
import Collections from "../collections/Collections";
import FarmsPage from "../farms/Farms";
import Wages from "../wages/Wages";
import Sales from "../sales/Sales";
import Activities from "../activities/Activities";
import { BackButton, NativeRouter, Route } from "react-router-native";
import UserContext from "../../context/user/UserContext";
import Loggin from "../loggin/Loggin";

export default function MainPage() {
  const userState = useContext(UserContext);

  return (
    <View style={styles.GeneralContainer}>
      {userState.user !== undefined ? (
        <NativeRouter>
          <BackButton />
          <View style={styles.RouteContainer}>
            <Route exact path="/" component={HomePage} />
            <Route path="/workers/listWorkers" component={Workers} />
            <Route path="/lots" component={Lots} />
            <Route path="/farms" component={FarmsPage} />
            <Route path="/collections" component={Collections} />
            <Route path="/wages" component={Wages} />
            <Route path="/sales" component={Sales} />
            <Route path="/activities" component={Activities} />
          </View>
        </NativeRouter>
      ) : (
        <Loggin />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  GeneralContainer: {
    height: "100%",
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
  },

  RouteContainer: {
    height: "100%",
  },
});
