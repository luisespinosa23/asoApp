import firebase from "./Firebase";

const activitiesApi = "Activities";

const formatActivitiesList = (activities) => {
  const listActivities = [];
  activities.forEach((element) => {
    const activity = {
      id: element.id,
      ...element.data(),
    };
    listActivities.push(activity);
  });
  return listActivities;
};

export const saveNewActivity = async (activity) => {
  const user = firebase.firebase.auth().currentUser;
  await firebase.db
    .collection(activitiesApi)
    .add({
      ...activity,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListActivities = async () => {
  const user = firebase.firebase.auth().currentUser;
  const activities = await firebase.db
    .collection(activitiesApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatActivitiesList(querySnapshot.docs);
    });

  return activities;
};

export const updateActivity = async (newActivity) => {
  let { id, ...objectoToUpdate } = newActivity;
  const activity = firebase.db.collection(activitiesApi).doc(id);
  const res = await activity.update(objectoToUpdate);
};
