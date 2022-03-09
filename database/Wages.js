import firebase from "./Firebase";

const wagesApi = "Wages";

const formatWagesList = (wages) => {
  const listWages = [];
  wages.forEach((element) => {
    const wage = {
      id: element.id,
      ...element.data(),
    };
    listWages.push(wage);
  });

  return listWages;
};

export const saveNewWage = async (wage) => {
  const user = firebase.firebase.auth().currentUser;
  await firebase.db
    .collection(wagesApi)
    .add({
      ...wage,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListWages = async () => {
  const user = firebase.firebase.auth().currentUser;
  const wages = await firebase.db
    .collection(wagesApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatWagesList(querySnapshot.docs);
    });

  return wages;
};

export const updateWage = async (newWage) => {
  let { id, ...objectoToUpdate } = newWage;
  const collection = firebase.db.collection(wagesApi).doc(id);
  const res = await collection.update(objectoToUpdate);
};
