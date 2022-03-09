import firebase from "./Firebase";

const collectionsApi = "Collections";

const formatCollectionsList = (collections) => {
  const listCollections = [];
  collections.forEach((element) => {
    const collection = {
      id: element.id,
      ...element.data(),
    };
    listCollections.push(collection);
  });

  return listCollections;
};

export const saveNewCollection = async (collection) => {
  const user = firebase.firebase.auth().currentUser;
  await firebase.db
    .collection(collectionsApi)
    .add({
      ...collection,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListCollections = async () => {
  const user = firebase.firebase.auth().currentUser;
  const collections = await firebase.db
    .collection(collectionsApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatCollectionsList(querySnapshot.docs);
    });

  return collections;
};

export const updateCollection = async (newCollection) => {
  let { id, ...objectoToUpdate } = newCollection;
  const collection = firebase.db.collection(collectionsApi).doc(id);
  const res = await collection.update(objectoToUpdate);
};
