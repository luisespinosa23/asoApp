import firebase from "./Firebase";

const shadingFarmStatesApi = "ShadingFarmState";

const formatShadingFarmStatesList = (shadingFarmStates) => {
  const ListShadingFarmStates = [];
  shadingFarmStates.forEach((element) => {
    const shadingFarmState = {
      id: element.id,
      ...element.data(),
    };
    ListShadingFarmStates.push(shadingFarmState);
  });
  return ListShadingFarmStates;
};

export const ListShadingFarmStates = async () => {
  console.log("entra");
  const shadingFarmState = await firebase.db
    .collection(shadingFarmStatesApi)
    .get()
    .then((querySnapshot) => {
      return formatShadingFarmStatesList(querySnapshot.docs);
    });

  return shadingFarmState;
};
