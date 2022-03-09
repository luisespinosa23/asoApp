import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useState } from "react";
import { updateFarmInputsInfo } from "../../../inputs_info/updateFarmInputsInfo";
import { updateFarm } from "../../../database/Farms";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import PropTypes from "prop-types";
import Loading from "../../shared/loading/Loading";

export default function UpdateFarmPage({ farm }) {
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
      let newFarm = {};
      values.forEach((element) => {
        const field = element.field;
        newFarm = {
          ...newFarm,
          [field]: element.value,
        };
      });
      setLoading(true);
      await updateFarm({ ...newFarm, id: farm.id });
      setLoading(false);
      setModalParams({
        message: "Finca actualizada",
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
      message: "¿Esta seguro que desea cancelar la acutalización de la finca?",
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
      text: "Actualizar finca",
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
        inputsInfoArray={updateFarmInputsInfo(farm)}
      />
      {loading && <Loading />}
    </>
  );
}

UpdateFarmPage.propTypes = {
  farm: PropTypes.object.isRequired,
};
