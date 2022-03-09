import firebase from "./Firebase";

const workerStatesApi = "WorkerStates";

const formatWorkerStateList = (workerStates) => {
  const listWorkerStates = [];
  workerStates.forEach((element) => {
    const workerState = {
      id: element.id,
      ...element.data(),
    };
    listWorkerStates.push(workerState);
  });
  return listWorkerStates;
};

export const ListWorkerStates = async () => {
  const workerStates = await firebase.db
    .collection(workerStatesApi)
    .get()
    .then((querySnapshot) => {
      return formatWorkerStateList(querySnapshot.docs);
    });

  return workerStates;
};
