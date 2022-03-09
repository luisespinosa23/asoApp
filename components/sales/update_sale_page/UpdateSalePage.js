import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useState } from "react";
import { updateSaleInputsInfo } from "../../../inputs_info/updateSaleInputsInfo";
import { updateSale } from "../../../database/Sales";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
export default function UpdateSalePage({ sale }) {
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
      let newSale = {};
      values.forEach((element) => {
        if (element.field === "date") {
          const field = element.field;
          newSale = {
            ...newSale,
            [field]: new Date(element.value),
          };
        } else {
          const field = element.field;
          newSale = {
            ...newSale,
            [field]: element.value,
          };
        }
      });
      setSecondaryLoading(true);
      await updateSale({ ...newSale, id: sale.id });
      setSecondaryLoading(false);
      setModalParams({
        message: "Venta actualizada",
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
      message: "¿Esta seguro que desea cancelar la acutalización de la venta?",
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
      text: "Actualizar venta",
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
        inputsInfoArray={updateSaleInputsInfo(sale)}
      />

      {secondaryLoading && <Loading />}
    </>
  );
}

UpdateSalePage.propTypes = {
  sale: PropTypes.object.isRequired,
};
