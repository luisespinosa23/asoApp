import React from "react";
import { Route, Switch } from "react-router-native";
import ListWagesPage from "./list_wages_page/ListWagesPage";
import AddNewWagePage from "./add_new_wage_page/AddNewWagePage";
import UpdateWagesPage from "./update_wage_page/UpdateWagesPage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Wages({ match }) {
  const [wageToUpdate, setWageToUpdate] = useState();
  const [lots, setLots] = useState();
  const [workers, setWorkers] = useState();
  const [activities, setActivities] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleWageToUpdate = (wage, lots, workers, activities) => {
    setWageToUpdate(wage);
    setLots(lots);
    setWorkers(workers);
    setActivities(activities);
    history.push(location.pathname + "/updateWage/");
  };

  const handleLotsWorkersAndActivities = (lots, workers, activities) => {
    setLots(lots);
    setWorkers(workers);
    setActivities(activities);
    history.push(location.pathname + "/addWage");
  };

  return (
    <>
      <Switch>
        {wageToUpdate !== undefined && wageToUpdate !== null && (
          <Route path={match.path + "/updateWage"}>
            <UpdateWagesPage
              wage={wageToUpdate}
              lots={lots}
              activities={activities}
              workers={workers}
            />
          </Route>
        )}

        {Array.isArray(lots) &&
          Array.isArray(workers) &&
          Array.isArray(activities) && (
            <Route path={match.path + "/addWage"}>
              <AddNewWagePage
                lots={lots}
                workers={workers}
                activities={activities}
              />
            </Route>
          )}
        <Route path={match.url}>
          <ListWagesPage
            handleWageToUpdate={handleWageToUpdate}
            handleLotsWorkersAndActivities={handleLotsWorkersAndActivities}
          />
        </Route>
      </Switch>
    </>
  );
}
