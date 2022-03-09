import firebase from "./Firebase";

const documentTypesApi = "DocumentTypes";

const formatDocumentTypeList = (documentTypes) => {
  const listDocumentTypes = [];
  documentTypes.forEach((element) => {
    const documentType = {
      id: element.id,
      ...element.data(),
    };
    listDocumentTypes.push(documentType);
  });
  return listDocumentTypes;
};

export const ListDocumentTypes = async () => {
  const documentTypes = await firebase.db
    .collection(documentTypesApi)
    .get()
    .then((querySnapshot) => {
      return formatDocumentTypeList(querySnapshot.docs);
    });

  return documentTypes;
};
