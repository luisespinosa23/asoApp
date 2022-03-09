import React from "react";
import { LogBox } from "react-native";
import UserState from "./context/user/UserState";
import MainPage from "./components/main/MainPage";

export default function App() {
  LogBox.ignoreAllLogs(true);

  return (
    <UserState>
      <MainPage />
    </UserState>
  );
}
