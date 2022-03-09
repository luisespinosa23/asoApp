import React from "react";
import { Route, Switch } from "react-router-native";
import ListActivitiesPage from "./list_activities_page/ListActivitiesPage";
import AddNewActivityPage from "./add_new_activity_page/AddNewActivityPage";
import UpdateActivityPage from "./update_activity_page/UpdateActivityPage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Activities({ match }) {
  const [activityToUpdate, setActivityToUpdate] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleActivityToUpdate = (activity) => {
    setActivityToUpdate(activity);
    history.push(location.pathname + "/updateActivity/");
  };

  return (
    <>
      <Switch>
        {activityToUpdate !== undefined && activityToUpdate !== null && (
          <Route path={match.path + "/updateActivity"}>
            <UpdateActivityPage activity={activityToUpdate} />
          </Route>
        )}

        <Route path={match.path + "/addActivity"}>
          <AddNewActivityPage />
        </Route>
        <Route path={match.url}>
          <ListActivitiesPage handleActivityToUpdate={handleActivityToUpdate} />
        </Route>
      </Switch>
    </>
  );
}
