import firebase from "./Firebase";

const contractTypesApi = "ContractTypes";

const formatContractTypesList = (contractTypes) => {
  const listContractTypes = [];
  contractTypes.forEach((element) => {
    const contractType = {
      id: element.id,
      ...element.data(),
    };
    listContractTypes.push(contractType);
  });
  return listContractTypes;
};

export const ListContractTypes = async () => {
  const contractTypes = await firebase.db
    .collection(contractTypesApi)
    .get()
    .then((querySnapshot) => {
      return formatContractTypesList(querySnapshot.docs);
    });

  return contractTypes;
};
