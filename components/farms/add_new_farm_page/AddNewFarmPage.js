import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { addNewFarmInputsInfo } from "../../../inputs_info/addNewFarmInputsInfo";
import { saveNewFarm } from "../../../database/Farms";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import { useState } from "react";
import Loading from "../../shared/loading/Loading";

export default function AddNewFarmPage() {
  const [loading, setLoading] = useState(false);
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });

  const history = useHistory();

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let farm = {};
      values.forEach((element) => {
        const field = element.field;
        farm = {
          ...farm,
          [field]: element.value,
        };
      });
      setLoading(true);
      await saveNewFarm(farm);
      setLoading(false);
      setModalParams({
        message: "Finca registrada",
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
      message: "¿Esta seguro que desea cancelar el registro de la finca?",
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
      text: "Guardar Finca",
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
        inputsInfoArray={addNewFarmInputsInfo()}
      />
      {loading && <Loading />}
    </>
  );
}
