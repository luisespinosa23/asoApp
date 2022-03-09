import firebase from "./Firebase";

const workersApi = "Workers";

export const downloadImage = async (idImage) => {
  const urlImage = await firebase.storage
    .ref("workers_pictures/" + idImage)
    .getDownloadURL()
    .then((response) => {
      return response;
    });
  return urlImage;
};

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

const UploadImage = (uri) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open("GET", uri);
    xhr.responseType = "blob";
    xhr.send();
  });
};

const create_UUID = () => {
  let dt = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export const saveNewWorker = async (worker) => {
  let id = create_UUID();
  let { photo, ...objectoToRegister } = worker;
  const user = firebase.firebase.auth().currentUser;
  await UploadImage(photo)
    .then((response) => {
      const ref = firebase.storage.ref().child("workers_pictures/" + id);
      ref.put(response);
    })
    .catch((error) => {
      console.log(error);
    });
  await firebase.db
    .collection(workersApi)
    .doc(id)
    .set({
      ...objectoToRegister,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListWorkers = async () => {
  const user = firebase.firebase.auth().currentUser;
  const workers = await firebase.db
    .collection(workersApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatWorkersList(querySnapshot.docs);
    });
  return workers;
};

export const updateWorker = async (newWorker) => {
  console.log(newWorker);
  let { id, photo, ...objectoToUpdate } = newWorker;
  await UploadImage(photo)
    .then((response) => {
      const ref = firebase.storage.ref().child("workers_pictures/" + id);
      ref.put(response);
    })
    .catch((error) => {
      console.log(error);
    });
  const worker = firebase.db.collection(workersApi).doc(id);
  const res = await worker.update(objectoToUpdate);
};
