import firebase from "./Firebase";

const lotsApi = "Lots";

const formatWorkersList = (workers) => {
  const listWorkers = [];
  workers.forEach((element) => {
    const worker = {
      id: element.id,
      ...element.data(),
    };
    listWorkers.push(worker);
  });
  return listWorkers;
};

export const saveNewLot = async (lot) => {
  const user = firebase.firebase.auth().currentUser;
  await firebase.db
    .collection(lotsApi)
    .add({
      ...lot,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListLots = async () => {
  const user = firebase.firebase.auth().currentUser;
  const lots = await firebase.db
    .collection(lotsApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatWorkersList(querySnapshot.docs);
    });
  return lots;
};

export const updateLot = async (newLot) => {
  let { id, ...objectoToUpdate } = newLot;
  const lot = firebase.db.collection(lotsApi).doc(id);
  const res = await lot.update(objectoToUpdate);
};
