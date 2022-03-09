import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { addNewActivityInputsInfo } from "../../../inputs_info/addNewActivityInputsInfo";
import { saveNewActivity } from "../../../database/Activities";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";

export default function AddNewActivity() {
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });

  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const history = useHistory();

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let activity = {};
      values.forEach((element) => {
        const field = element.field;
        activity = {
          ...activity,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await saveNewActivity(activity);
      setSecondaryLoading(false);
      setModalParams({
        message: "Actividad registrada",
        isOpen: true,
        handlePrimaryButton: backToList,
        primaryText: "Aceptar",
      });
    } else {
      setModalParams({
        message: "Por favor verifique los campos obligatorios",
        isOpen: true,
        handlePrimaryButton: closeModal,
        primaryText: "Aceptar",
      });
    }
  };

  const handleCancelForm = () => {
    setModalParams({
      message: "¿Esta seguro que desea cancelar el registro de la actividad?",
      isOpen: true,
      handlePrimaryButton: backToList,
      handleSecondaryButton: closeModal,
      primaryText: "Si",
      secondaryText: "No",
    });
  };

  const backToList = () => {
    history.goBack();
  };

  const closeModal = () => {
    setModalParams({ ...modalParam, isOpen: false });
  };

  const buttons = [
    {
      handleClick: handleSubmitForm,
      text: "Guardar actividad",
      isSecondary: false,
      key: 1,
    },

    {
      handleClick: handleCancelForm,
      text: "Cancelar",
      isSecondary: true,
      key: 2,
    },
  ];

  return (
    <>
      <CustomModal {...modalParam} />
      <ControllerForm
        buttonsInfoArray={buttons}
        inputsInfoArray={addNewActivityInputsInfo()}
      />
      {secondaryLoading && <Loading />}
    </>
  );
}
