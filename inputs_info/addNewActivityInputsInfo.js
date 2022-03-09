export const addNewActivityInputsInfo = () => {
  const inputs = [
    {
      name: "activityName",
      element: "input",
      placeholder: "Nombre de la actividad",
      isRequired: true,
      label: "Ingrese el nombre de la actividad",
      type: "default",
      isPassword: false,
      key: 1,
      id: 1,
    },
  ];

  return inputs;
};
