import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { ListFarms } from "../../../database/Farms";
import List from "../../shared/list/List";
import { styles } from "./StylesListFarmsPage";
import { useHistory, useLocation } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";

export default function ListFarmsPage({ handleFarmToUpdate }) {
  const history = useHistory();
  const location = useLocation();

  const [farms, setFarms] = useState();

  useEffect(() => {
    const getFarms = async () => {
      let newFarms = [];
      newFarms = await ListFarms();
      if (newFarms.length > 0) {
        const newFarmsFormated = newFarms.map((element, key) => {
          return [
            element,
            key,
            element.farmName,
            "Hectareas: " + element.hectares,
          ];
        });
        setFarms(newFarmsFormated);
      } else {
        setFarms(newFarms);
      }
    };
    getFarms();
  }, []);

  const handleClickFilterButton = () => {
    console.log("handleClickFilterButton");
  };
  const handleClickNewButton = () => {
    history.push(location.pathname + "/addFarm");
  };
  const handleClickOrderButton = () => {
    console.log("handleClickOrderButton");
  };

  const handleClickRow = (farm) => {
    handleFarmToUpdate(farm);
  };

  return (
    <>
      {Array.isArray(farms) ? (
        <View style={styles.FarmsPageContainer}>
          <List
            array={farms}
            emptyListText={"No hay fincas registradas"}
            handleClickFilterButton={handleClickFilterButton}
            handleClickNewButton={handleClickNewButton}
            handleClickOrderButton={handleClickOrderButton}
            handleClickRow={handleClickRow}
          ></List>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
}
ListFarmsPage.propTypes = {
  handleFarmToUpdate: PropTypes.func.isRequired,
};
