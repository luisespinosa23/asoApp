import React from "react";
import ControllerForm from "../../shared/form/ControllerForm";
import { useEffect, useState } from "react";
import { ListDocumentTypes } from "../../../database/DocumentTypes";
import { ListWorkerStates } from "../../../database/WorkerStates";
import { updateWorkerInputsInfo } from "../../../inputs_info/updateWorkerInputsInfo";
import { updateWorker } from "../../../database/Workers";
import { downloadImage } from "../../../database/Workers";
import CustomModal from "../../shared/custom_modal/CustomModal";
import { useHistory } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
export default function UpdateWorkerPage({ worker }) {
  const [documentTypes, setDocumentTypes] = useState();
  const [workerStates, setWorkerStates] = useState();
  const [photo, setPhoto] = useState();
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });
  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const getDocumentTypes = async () => {
      let documentTypes = await ListDocumentTypes();
      documentTypes = documentTypes.map((element) => {
        return {
          label: element.documentTypeLong,
          value: element.id,
        };
      });
      setDocumentTypes(documentTypes);
    };

    const getWorkerStates = async () => {
      let workerStates = await ListWorkerStates();
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

  useEffect(() => {
    const getPhoto = async () => {
      const urlImage = await downloadImage(worker.id);
      setPhoto(urlImage);
    };
    getPhoto();
  }, [worker]);

  const handleSubmitForm = async (values, error) => {
    if (!error) {
      let newWorker = {};
      values.forEach((element) => {
        const field = element.field;
        newWorker = {
          ...newWorker,
          [field]: element.value,
        };
      });
      setSecondaryLoading(true);
      await updateWorker({ ...newWorker, id: worker.id });
      setSecondaryLoading(false);
      setModalParams({
        message: "Trabajador actualizado",
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
        "¿Esta seguro que desea cancelar la acutalización del trabajador?",
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
      text: "Actualizar trabajador",
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
      {Array.isArray(documentTypes) &&
      Array.isArray(workerStates) &&
      photo !== undefined ? (
        <>
          <CustomModal {...modalParam} />

          <ControllerForm
            buttonsInfoArray={buttons}
            inputsInfoArray={updateWorkerInputsInfo(
              documentTypes,
              workerStates,
              worker,
              photo
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

UpdateWorkerPage.propTypes = {
  worker: PropTypes.object.isRequired,
};
