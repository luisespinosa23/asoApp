export const addNewWorkerInputsInfo = (documentTypes, states) => {
  const inputs = [
    {
      name: "documentType",
      element: "dropDown",
      placeholder: "Tipo de documento",
      isRequired: true,
      label: "Seleccione el tipo de documento",
      items: documentTypes,
      key: 1,
      id: 1,
    },
    {
      name: "documentNumber",
      element: "input",
      placeholder: "Numero de documento",
      isRequired: true,
      label: "Ingrese el numero de documento",
      type: "numeric",
      isPassword: false,
      key: 2,
      id: 2,
    },
    {
      name: "names",
      element: "input",
      placeholder: "Nombres",
      isRequired: true,
      label: "Ingrese los nombres",
      type: "default",
      isPassword: false,
      key: 3,
      id: 3,
    },
    {
      name: "surnames",
      element: "input",
      placeholder: "Apellidos",
      isRequired: true,
      label: "Ingrese los apellidos",
      type: "default",
      isPassword: false,
      key: 4,
      id: 4,
    },
    {
      name: "eps",
      element: "input",
      placeholder: "EPS",
      isRequired: true,
      label: "Ingrese la EPS",
      type: "default",
      isPassword: false,
      key: 5,
      id: 5,
    },
    {
      name: "cellphone",
      element: "input",
      placeholder: "Numero de celular",
      isRequired: false,
      label: "Ingrese el numero de celular",
      type: "numeric",
      isPassword: false,
      key: 6,
      id: 6,
    },
    {
      name: "state",
      element: "dropDown",
      placeholder: "Estado",
      isRequired: true,
      label: "Seleccione el estado",
      items: states,
      key: 7,
      id: 7,
    },
    {
      name: "photo",
      isRequired: false,
      element: "camera",
      key: 8,
      id: 8,
    },
  ];

  return inputs;
};
