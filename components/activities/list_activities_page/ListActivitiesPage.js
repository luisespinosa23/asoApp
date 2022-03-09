import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ListActivities } from "../../../database/Activities";
import List from "../../shared/list/List";
import { styles } from "./StylesListActivitiesPage";
import { useHistory, useLocation } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";

export default function ListActivitiesPage({ handleActivityToUpdate }) {
  const history = useHistory();
  const location = useLocation();

  const [activities, setActivities] = useState();
  useEffect(() => {
    const getActivities = async () => {
      let newActivities = [];
      newActivities = await ListActivities();
      if (newActivities.length > 0) {
        const newActivitiesFormated = newActivities.map((element, key) => {
          return [element, key, element.activityName];
        });
        setActivities(newActivitiesFormated);
      } else {
        setActivities(newActivities);
      }
    };
    getActivities();
  }, []);

  const handleClickNewButton = () => {
    console.log("hola");
    history.push(location.pathname + "/addActivity");
  };

  const handleClickRow = (activity) => {
    handleActivityToUpdate(activity);
  };

  return (
    <>
      {Array.isArray(activities) ? (
        <View style={styles.ActivitiesPageContainer}>
          <List
            array={activities}
            emptyListText={"No hay actividades registradas"}
            handleClickNewButton={handleClickNewButton}
            handleClickRow={handleClickRow}
          ></List>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
}
ListActivitiesPage.propTypes = {
  handleActivityToUpdate: PropTypes.func.isRequired,
};
