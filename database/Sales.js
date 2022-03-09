import firebase from "./Firebase";

const salesApi = "Sales";

const formatSalesList = (sales) => {
  const listSales = [];
  sales.forEach((element) => {
    const sale = {
      id: element.id,
      ...element.data(),
    };
    listSales.push(sale);
  });

  return listSales;
};

export const saveNewSale = async (sale) => {
  const user = firebase.firebase.auth().currentUser;
  await firebase.db
    .collection(salesApi)
    .add({
      ...sale,
      userId: user.uid,
    })
    .then((docRef) => {
      console.log(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const ListSales = async () => {
  const user = firebase.firebase.auth().currentUser;
  const sales = await firebase.db
    .collection(salesApi)
    .where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
      return formatSalesList(querySnapshot.docs);
    });

  return sales;
};

export const updateSale = async (newSale) => {
  let { id, ...objectoToUpdate } = newSale;
  const sale = firebase.db.collection(salesApi).doc(id);
  const res = await sale.update(objectoToUpdate);
};
