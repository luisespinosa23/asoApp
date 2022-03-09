import firebase from "./Firebase";

export const loginWithGoogle = async (idToken, accessToken) => {
  const credential = firebase.firebase.auth.GoogleAuthProvider.credential(
    idToken,
    accessToken
  );
  firebase.firebase
    .auth()
    .signInWithCredential(credential)
    .catch((error) => {
      console.log("Error", error);
    });
};
