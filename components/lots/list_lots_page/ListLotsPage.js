import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ListLots } from "../../../database/Lots";
import List from "../../shared/list/List";
import { styles } from "./StylesListLotsPage";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
import { ListFarms } from "../../../database/Farms";
import CustomModal from "../../shared/custom_modal/CustomModal";

export default function ListLotsPage({ handleLotToUpdate, handleFarms }) {
  const [farms, setFarms] = useState();
  const [lots, setLots] = useState();
  const [hectares, setHectares] = useState(0);
  const [plants, setPlants] = useState(0);
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });

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

    getFarms();
  }, []);

  useEffect(() => {
    const getLots = async () => {
      let newLots = [];
      newLots = await ListLots();
      if (newLots.length > 0) {
        let hectares = 0;
        let plants = 0;

        const newFarmsFormated = newLots.map((element, key) => {
          let elementPlants = 0;
          let farm;
          hectares = parseFloat(hectares) + parseFloat(element.hectares);
          if (element.numberPlants !== undefined) {
            plants = parseFloat(plants) + parseFloat(element.numberPlants);
            elementPlants = element.numberPlants;
          }

          farms.forEach((farmElement) => {
            if (farmElement.value === element.farm) farm = farmElement.label;
          });

          return [
            element,
            key,
            element.lotName + " - " + farm,
            "Hectareas: " + element.hectares,
            "Número de plantas: " + elementPlants,
          ];
        });
        setLots(newFarmsFormated);
        setHectares(hectares);
        setPlants(plants);
      } else {
        setLots(newLots);
      }
    };

    if (Array.isArray(farms)) {
      getLots();
    }
  }, [farms]);

  const handleClickFilterButton = () => {
    console.log("handleClickFilterButton");
  };

  const closeModal = () => {
    setModalParams({ ...modalParam, isOpen: false });
  };

  const handleClickNewButton = () => {
    if (farms.length > 0) {
      // history.push(location.pathname + "/addLot");
      handleFarms(farms);
    } else {
      setModalParams({
        message:
          "Para agregar un lote, debe haber agregado una finca anteriormente",
        isOpen: true,
        handlePrimaryButton: closeModal,
        primaryText: "Aceptar",
      });
    }
  };
  const handleClickOrderButton = () => {
    console.log("handleClickOrderButton");
  };

  const handleClickRow = (lot) => {
    handleLotToUpdate(lot);
  };

  return (
    <>
      {Array.isArray(lots) ? (
        <View style={styles.LotsPageContainer}>
          <CustomModal {...modalParam} />
          <List
            array={lots}
            emptyListText={"No hay lotes registrados"}
            handleClickFilterButton={handleClickFilterButton}
            handleClickNewButton={handleClickNewButton}
            handleClickOrderButton={handleClickOrderButton}
            handleClickRow={handleClickRow}
          >
            <View style={styles.HeaderContainer}>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Lotes</Text>
                <Text style={styles.HeaderText}>{lots.length}</Text>
              </View>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Hectareas</Text>
                <Text style={styles.HeaderText}>{hectares}</Text>
              </View>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Plantas</Text>
                <Text style={styles.HeaderText}>{plants}</Text>
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
ListLotsPage.propTypes = {
  handleLotToUpdate: PropTypes.func.isRequired,
  handleFarms: PropTypes.func.isRequired,
};
