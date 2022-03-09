import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { ListDocumentTypes } from "../../../database/DocumentTypes";
import { ListWorkerStates } from "../../../database/WorkerStates";
import { addNewWorkerInputsInfo } from "../../../inputs_info/addNewWorkerInputsInfo";
import { saveNewWorker } from "../../../database/Workers";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";

export default function AddNewWorker() {
  const [documentTypes, setDocumentTypes] = useState();
  const [workerStates, setWorkerStates] = useState();
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });
  const [loading, setLoading] = useState(false);
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const getDocumentTypes = async () => {
      setLoading(true);
      let documentTypes = await ListDocumentTypes();
      setLoading(false);
      documentTypes = documentTypes.map((element) => {
        return {
          label: element.documentTypeLong,
          value: element.id,
        };
      });
      setDocumentTypes(documentTypes);
    };

    const getWorkerStates = async () => {
      setLoading(true);
      let workerStates = await ListWorkerStates();
      setLoading(false);
      workerStates = workerStates.map((element) => {
        return {
          label: element.state,
          value: element.id,
        };
      });
      setWorkerStates(workerStates);
    };
    getDocumentTypes();
    getWorkerStates();
  }, []);

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let worker = {};
      values.forEach((element) => {
        const field = element.field;
        worker = {
          ...worker,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await saveNewWorker(worker);
      setSecondaryLoading(false);
      setModalParams({
        message: "Trabajador registrado",
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
      message: "¿Esta seguro que desea cancelar el registro del trabajador?",
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
      text: "Guardar trabajador",
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
      {Array.isArray(documentTypes) && Array.isArray(workerStates) ? (
        <>
          <CustomModal {...modalParam} />

          <ControllerForm
            buttonsInfoArray={buttons}
            inputsInfoArray={addNewWorkerInputsInfo(
              documentTypes,
              workerStates
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
