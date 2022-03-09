import firebase from "./Firebase";

const farmsApi = "Farms";

const formatFarmsList = (farms) => {
  const listFarms = [];
  farms.forEach((element) => {
    const farm = {
      id: element.id,
      ...element.data(),
    };
    listFarms.push(farm);
  });
  return listFarms;
};

export const saveNewFarm = async (farm) => {
  const user = firebase.firebase.auth().currentUser;
  await firebase.db
    .collection(farmsApi)
    .add({
      ...farm,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListFarms = async () => {
  const user = firebase.firebase.auth().currentUser;
  const farms = await firebase.db
    .collection(farmsApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatFarmsList(querySnapshot.docs);
    });

  return farms;
};

export const updateFarm = async (newFarm) => {
  let { id, ...objectoToUpdate } = newFarm;
  const farm = firebase.db.collection(farmsApi).doc(id);
  const res = await farm.update(objectoToUpdate);
};
