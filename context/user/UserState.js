import React from "react";
import PropTypes from "prop-types";
import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import * as Google from "expo-google-app-auth";
import { loginWithGoogle } from "../../database/Authentication";

export default function UserState({ children }) {
  const [user, dispatch] = useReducer(UserReducer, undefined);

  const login = async () => {
    let user;
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "79431592779-lc8pm6233rjh3sut0bn5nuo155pom8n3.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        loginWithGoogle(result.idToken, result.accessToken);
        user = result;
        dispatch({ type: "GET_USER", payload: user });
      }
    } catch (e) {
      return { error: true };
    }
  };
  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}

UserState.propTypes = {
  children: PropTypes.element.isRequired,
};
