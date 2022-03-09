import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ListCollections } from "../../../database/Collections";
import { ListWorkers } from "../../../database/Workers";
import { ListLots } from "../../../database/Lots";
import List from "../../shared/list/List";
import { styles } from "./StylesListCollectionsPage";
import { useHistory, useLocation } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
import formaterDate from "../../../helpers/FormaterDate";
import CustomModal from "../../shared/custom_modal/CustomModal";

export default function ListCollectionsPage({
  handleLotsAndWorkers,
  handleCollectionToUpdate,
}) {
  const [workers, setWorkers] = useState();
  const [lots, setLots] = useState();
  const [collections, setCollections] = useState();
  const [kgCollected, setKgCollected] = useState(0);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });

  useEffect(() => {
    const getLots = async () => {
      let lots = await ListLots();
      lots = lots.map((element) => {
        return {
          label: element.lotName,
          value: element.id,
        };
      });
      setLots(lots);
    };

    const getWorkers = async () => {
      let workers = await ListWorkers();
      workers = workers.map((element) => {
        return {
          label: element.names + " " + element.surnames,
          value: element.id,
        };
      });

      setWorkers(workers);
    };
    getLots();
    getWorkers();
  }, []);

  useEffect(() => {
    const getCollections = async () => {
      let newCollections = [];
      newCollections = await ListCollections();
      if (newCollections.length > 0) {
        let kgCollected = 0;
        let value = 0;
        const newCollectionsFormated = newCollections.map((element, key) => {
          kgCollected =
            parseFloat(kgCollected) + parseFloat(element.kgCollected);
          value =
            parseFloat(value) +
            parseFloat(element.kgCollected * element.priceByKg);

          let worker;
          let lot;

          workers.forEach((workerElement) => {
            if (element.worker === workerElement.value) {
              worker = workerElement.label;
            }
          });

          lots.forEach((lotElement) => {
            if (element.lot === lotElement.value) {
              lot = lotElement.label;
            }
          });

          return [
            element,
            key,
            formaterDate(element.date.toDate()),
            "Lote: " + lot,
            "Trabajador: " + worker,
            "Cantidad: " + element.kgCollected,
            "Valor: " + parseFloat(element.kgCollected * element.priceByKg),
          ];
        });
        setCollections(newCollectionsFormated);
        setKgCollected(kgCollected);
        setValue(value);
      } else {
        setCollections(newCollections);
      }
    };

    if (Array.isArray(workers) && Array.isArray(lots)) {
      getCollections();
    }
  }, [workers, lots]);

  const handleClickFilterButton = () => {
    console.log("handleClickFilterButton");
  };

  const closeModal = () => {
    setModalParams({ ...modalParam, isOpen: false });
  };

  const handleClickNewButton = () => {
    if (lots.length > 0 && workers.length > 0) {
      handleLotsAndWorkers(lots, workers);
    } else {
      setModalParams({
        message:
          "Para agregar una recolección, debe haber agregado un lote y un trabajador con anterioridad.",
        isOpen: true,
        handlePrimaryButton: closeModal,
        primaryText: "Aceptar",
      });
    }
  };
  const handleClickOrderButton = () => {
    console.log("handleClickOrderButton");
  };

  const handleClickRow = (collection) => {
    handleCollectionToUpdate(collection, lots, workers);
  };

  return (
    <>
      {Array.isArray(collections) ? (
        <View style={styles.CollectionsPageContainer}>
          <CustomModal {...modalParam} />
          <List
            array={collections}
            emptyListText={"No hay recolecciones registradas"}
            handleClickFilterButton={handleClickFilterButton}
            handleClickNewButton={handleClickNewButton}
            handleClickOrderButton={handleClickOrderButton}
            handleClickRow={handleClickRow}
          >
            <View style={styles.HeaderContainer}>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Kg recolectaods</Text>
                <Text style={styles.HeaderText}>{kgCollected}</Text>
              </View>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Valor $</Text>
                <Text style={styles.HeaderText}>{value}</Text>
              </View>
            </View>
          </List>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
}
ListCollectionsPage.propTypes = {
  handleCollectionToUpdate: PropTypes.func.isRequired,
  handleLotsAndWorkers: PropTypes.func.isRequired,
};
