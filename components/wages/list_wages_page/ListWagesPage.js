import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ListWages } from "../../../database/Wages";
import { ListWorkers } from "../../../database/Workers";
import { ListLots } from "../../../database/Lots";
import { ListActivities } from "../../../database/Activities";
import List from "../../shared/list/List";
import { styles } from "./StylesListWagesPage";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
import formaterDate from "../../../helpers/FormaterDate";
import CustomModal from "../../shared/custom_modal/CustomModal";

export default function ListWagesPage({
  handleLotsWorkersAndActivities,
  handleWageToUpdate,
}) {
  const [workers, setWorkers] = useState();
  const [lots, setLots] = useState();
  const [activities, setActivities] = useState();
  const [wages, setWages] = useState();
  const [kgCollected, setKgCollected] = useState(0);
  const [value, setValue] = useState(0);
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

    const getActivities = async () => {
      let activities = await ListActivities();
      activities = activities.map((element) => {
        return {
          label: element.activityName,
          value: element.id,
        };
      });

      setActivities(activities);
    };

    getActivities();
    getLots();
    getWorkers();
  }, []);

  useEffect(() => {
    const getWages = async () => {
      let newWages = [];
      newWages = await ListWages();
      if (newWages.length > 0) {
        let kgCollected = 0;
        let value = 0;
        const newWagesFormated = newWages.map((element, key) => {
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
        setWages(newWagesFormated);
        setKgCollected(kgCollected);
        setValue(value);
      } else {
        setWages(newWages);
      }
    };

    if (Array.isArray(workers) && Array.isArray(lots)) {
      getWages();
    }
  }, [workers, lots]);

  const handleClickFilterButton = () => {
    console.log("handleClickFilterButton");
  };

  const closeModal = () => {
    setModalParams({ ...modalParam, isOpen: false });
  };

  const handleClickNewButton = () => {
    if (lots.length > 0 && workers.length > 0 && activities.length > 0) {
      handleLotsWorkersAndActivities(lots, workers, activities);
    } else {
      setModalParams({
        message:
          "Para agregar una recolección, debe haber agregado un lote, un trabajador y una actividad con anterioridad.",
        isOpen: true,
        handlePrimaryButton: closeModal,
        primaryText: "Aceptar",
      });
    }
  };
  const handleClickOrderButton = () => {
    console.log("handleClickOrderButton");
  };

  const handleClickRow = (wage) => {
    handleWageToUpdate(wage, lots, workers, activities);
  };

  return (
    <>
      {Array.isArray(wages) ? (
        <View style={styles.WagesPageContainer}>
          <CustomModal {...modalParam} />
          <List
            array={wages}
            emptyListText={"No hay jornales registrados"}
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
ListWagesPage.propTypes = {
  handleWageToUpdate: PropTypes.func.isRequired,
  handleLotsWorkersAndActivities: PropTypes.func.isRequired,
};
