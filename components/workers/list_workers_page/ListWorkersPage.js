import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { ListWorkers } from "../../../database/Workers";
import List from "../../shared/list/List";
import { styles } from "./StylesListWorkersPage";
import { useHistory, useLocation } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";

export default function ListWorkersPage({ handleWorkerToUpdate }) {
  const history = useHistory();
  const location = useLocation();

  const [workers, setWorkers] = useState();
  const [activeWorkers, setActiveWorkers] = useState(0);
  useEffect(() => {
    const getWorkers = async () => {
      let newWorkers = [];
      newWorkers = await ListWorkers();
      if (newWorkers.length > 0) {
        let activeWorkers = 0;
        const newWorkersFormated = newWorkers.map((element, key) => {
          let estado;
          if (element.state === "active") {
            estado = "Activo";
            activeWorkers++;
          } else if (element.state === "inactive") {
            estado = "Inactivo";
          }
          return [
            element,
            key,
            element.names + " " + element.surnames,
            "Estado: " + estado,
            "Eps: " + element.eps,
          ];
        });
        setWorkers(newWorkersFormated);
        setActiveWorkers(activeWorkers);
      } else {
        setWorkers(newWorkers);
      }
    };
    getWorkers();
  }, []);

  const handleClickFilterButton = () => {
    console.log("handleClickFilterButton");
  };
  const handleClickNewButton = () => {
    history.push(location.pathname + "/addWorker");
  };
  const handleClickOrderButton = () => {
    console.log("handleClickOrderButton");
  };

  const handleClickRow = (worker) => {
    handleWorkerToUpdate(worker);
  };

  return (
    <>
      {Array.isArray(workers) ? (
        <View key={1} style={styles.WorkersPageContainer}>
          <List
            array={workers}
            emptyListText={"No hay trabajadores registrados"}
            handleClickFilterButton={handleClickFilterButton}
            handleClickNewButton={handleClickNewButton}
            handleClickOrderButton={handleClickOrderButton}
            handleClickRow={handleClickRow}
          >
            <View style={styles.HeaderContainer}>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Trabajadores</Text>
                <Text style={styles.HeaderText}>{workers.length}</Text>
              </View>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Activos</Text>
                <Text style={styles.HeaderText}>{activeWorkers}</Text>
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
ListWorkersPage.propTypes = {
  handleWorkerToUpdate: PropTypes.func.isRequired,
};
