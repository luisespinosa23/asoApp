import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { addNewSaleInputsInfo } from "../../../inputs_info/addNewSaleInputsInfo";
import { saveNewSale } from "../../../database/Sales";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import { useState } from "react";

export default function AddNewSale() {
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
      let sale = {};
      values.forEach((element) => {
        const field = element.field;
        sale = {
          ...sale,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await saveNewSale(sale);
      setSecondaryLoading(false);
      setModalParams({
        message: "Venta registrada",
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
      message: "¿Esta seguro que desea cancelar el registro de la venta?",
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
      text: "Guardar venta",
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
        inputsInfoArray={addNewSaleInputsInfo()}
      />

      {secondaryLoading && <Loading />}
    </>
  );
}
