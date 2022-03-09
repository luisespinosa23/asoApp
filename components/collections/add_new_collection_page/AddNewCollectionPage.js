import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { addNewCollectionInputsInfo } from "../../../inputs_info/addNewCollectionInputsInfo";
import { saveNewCollection } from "../../../database/Collections";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
import { useState } from "react";

export default function AddNewCollection({ lots, workers }) {
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
      let collection = {};
      values.forEach((element) => {
        const field = element.field;
        collection = {
          ...collection,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await saveNewCollection(collection);
      setSecondaryLoading(false);
      setModalParams({
        message: "Recolección registrada",
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
      message: "¿Esta seguro que desea cancelar el registro de la recolección?",
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
      text: "Guardar recolección",
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
        inputsInfoArray={addNewCollectionInputsInfo(lots, workers)}
      />
      {secondaryLoading && <Loading />}
    </>
  );
}
AddNewCollection.propTypes = {
  lots: PropTypes.array.isRequired,
  workers: PropTypes.array.isRequired,
};
