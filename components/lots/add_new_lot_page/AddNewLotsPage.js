import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { ListShadingFarmStates } from "../../../database/ShadingFarmStates";
import { addNewLotInputsInfo } from "../../../inputs_info/addNewLotInputsInfo";
import { saveNewLot } from "../../../database/Lots";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";

export default function AddNewLotPage({ farms }) {
  const [shadingFarmStates, setShadingFarmStates] = useState();
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const getShadingFarmStates = async () => {
      let shadingFarmStates = await ListShadingFarmStates();
      shadingFarmStates = shadingFarmStates.map((element) => {
        return {
          label: element.state,
          value: element.id,
        };
      });

      setShadingFarmStates(shadingFarmStates);
    };
    getShadingFarmStates();
  }, []);

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let lot = {};
      values.forEach((element) => {
        const field = element.field;
        lot = {
          ...lot,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await saveNewLot(lot);
      setSecondaryLoading(false);
      setModalParams({
        message: "Lote registrado",
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
      message: "¿Esta seguro que desea cancelar el registro del lote?",
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
      text: "Guardar lote",
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
      {Array.isArray(shadingFarmStates) ? (
        <>
          <CustomModal {...modalParam} />

          <ControllerForm
            buttonsInfoArray={buttons}
            inputsInfoArray={addNewLotInputsInfo(farms, shadingFarmStates)}
          />
          {secondaryLoading && <Loading />}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

AddNewLotPage.propTypes = {
  farms: PropTypes.array.isRequired,
};
