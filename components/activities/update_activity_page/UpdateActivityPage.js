import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useState } from "react";
import { updateActivityInputsInfo } from "../../../inputs_info/updateActivityInputsInfo";
import { updateActivity } from "../../../database/Activities";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
export default function UpdateActivityPage({ activity }) {
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
      let newActivity = {};
      values.forEach((element) => {
        const field = element.field;
        newActivity = {
          ...newActivity,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await updateActivity({ ...newActivity, id: activity.id });
      setSecondaryLoading(false);
      setModalParams({
        message: "Actividad actualizada",
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
      message:
        "¿Esta seguro que desea cancelar la acutalización de la actividad?",
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
      text: "Actualizar actividad",
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
        inputsInfoArray={updateActivityInputsInfo(activity)}
      />
      {secondaryLoading && <Loading />}
    </>
  );
}

UpdateActivityPage.propTypes = {
  activity: PropTypes.object.isRequired,
};
