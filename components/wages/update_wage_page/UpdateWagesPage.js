import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { updateWageInputsInfo } from "../../../inputs_info/updateWageInputsInfo";
import { updateWage } from "../../../database/Wages";
import { ListContractTypes } from "../../../database/ContractTypes";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
export default function UpdateWagePage({ wage, lots, workers, activities }) {
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });
  const [secondaryLoading, setSecondaryLoading] = useState(false);
  const [contractTypes, setContractTypes] = useState();
  const history = useHistory();

  useEffect(() => {
    const getContractTypes = async () => {
      let contractTypes = await ListContractTypes();
      contractTypes = contractTypes.map((element) => {
        return {
          label: element.contract,
          value: element.id,
        };
      });
      setContractTypes(contractTypes);
    };

    getContractTypes();
  }, []);

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let newWage = {};
      values.forEach((element) => {
        if (element.field === "date") {
          const field = element.field;
          newWage = {
            ...newWage,
            [field]: new Date(element.value),
          };
        } else {
          const field = element.field;
          newWage = {
            ...newWage,
            [field]: element.value,
          };
        }
      });
      setSecondaryLoading(true);
      await updateWage({ ...newWage, id: wage.id });
      setSecondaryLoading(false);
      setModalParams({
        message: "Jornal actualizado",
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
      message: "¿Esta seguro que desea cancelar la acutalización del jornal?",
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
      text: "Actualizar jornal",
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
      {Array.isArray(contractTypes) ? (
        <>
          <CustomModal {...modalParam} />
          <ControllerForm
            buttonsInfoArray={buttons}
            inputsInfoArray={updateWageInputsInfo(
              lots,
              workers,
              activities,
              contractTypes,
              wage
            )}
          />
          {secondaryLoading && <Loading />}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

UpdateWagePage.propTypes = {
  wage: PropTypes.object.isRequired,
  lots: PropTypes.array.isRequired,
  workers: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
};
