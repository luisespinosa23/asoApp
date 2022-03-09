import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { ListContractTypes } from "../../../database/ContractTypes";
import { addNewWageInputsInfo } from "../../../inputs_info/addNewWageInputsInfo";
import { saveNewWage } from "../../../database/Wages";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";

export default function AddNewWage({ lots, workers, activities }) {
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });

  const [contractTypes, setContractTypes] = useState();
  const [secondaryLoading, setSecondaryLoading] = useState(false);

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
    console.log(error);
    if (!error) {
      let wage = {};
      values.forEach((element) => {
        const field = element.field;
        wage = {
          ...wage,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await saveNewWage(wage);
      setSecondaryLoading(false);
      setModalParams({
        message: "Jornal registrado",
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
      message: "¿Esta seguro que desea cancelar el registro del jornal?",
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
      text: "Guardar jornal",
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
            inputsInfoArray={addNewWageInputsInfo(
              lots,
              workers,
              activities,
              contractTypes
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
AddNewWage.propTypes = {
  lots: PropTypes.array.isRequired,
  workers: PropTypes.array.isRequired,
  activities: PropTypes.array.isRequired,
};
