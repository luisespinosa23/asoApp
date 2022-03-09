import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { ListFarms } from "../../../database/Farms";
import { ListShadingFarmStates } from "../../../database/ShadingFarmStates";
import { updateLotInputsInfo } from "../../../inputs_info/updateLotInputsInfo";
import { updateLot } from "../../../database/Lots";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
export default function UpdateLotPage({ lot }) {
  const [farms, setFarms] = useState();
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
    const getFarms = async () => {
      let farms = await ListFarms();
      farms = farms.map((element) => {
        return {
          label: element.farmName,
          value: element.id,
        };
      });
      setFarms(farms);
    };

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
    getFarms();
    getShadingFarmStates();
  }, []);

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let newLot = {};
      values.forEach((element) => {
        const field = element.field;
        newLot = {
          ...newLot,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await updateLot({ ...newLot, id: lot.id });
      setSecondaryLoading(false);
      setModalParams({
        message: "Lote actualizado",
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
      message: "¿Esta seguro que desea cancelar la actualización del lote?",
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
      text: "Actualizar lote",
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
      {Array.isArray(shadingFarmStates) && Array.isArray(farms) ? (
        <>
          <CustomModal {...modalParam} />

          <ControllerForm
            buttonsInfoArray={buttons}
            inputsInfoArray={updateLotInputsInfo(farms, shadingFarmStates, lot)}
          />
          {secondaryLoading && <Loading />}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

UpdateLotPage.propTypes = {
  lot: PropTypes.object.isRequired,
};
