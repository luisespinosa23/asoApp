import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useState } from "react";
import { updateCollectionInputsInfo } from "../../../inputs_info/updateCollectionInputsInfo";
import { updateCollection } from "../../../database/Collections";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
export default function UpdateCollectionPage({ collection, lots, workers }) {
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
      let newCollection = {};
      values.forEach((element) => {
        if (element.field === "date") {
          const field = element.field;
          newCollection = {
            ...newCollection,
            [field]: new Date(element.value),
          };
        } else {
          const field = element.field;
          newCollection = {
            ...newCollection,
            [field]: element.value,
          };
        }
      });
      setSecondaryLoading(true);
      await updateCollection({ ...newCollection, id: collection.id });
      setSecondaryLoading(false);
      setModalParams({
        message: "Recolección actualizada",
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
        "¿Esta seguro que desea cancelar la acutalización de la recolección?",
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
      text: "Actualizar recolección",
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
        inputsInfoArray={updateCollectionInputsInfo(lots, workers, collection)}
      />
      {secondaryLoading && <Loading />}
    </>
  );
}

UpdateCollectionPage.propTypes = {
  collection: PropTypes.object.isRequired,
  lots: PropTypes.array.isRequired,
  workers: PropTypes.array.isRequired,
};
