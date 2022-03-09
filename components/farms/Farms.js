import React from "react";
import { Route, Switch } from "react-router-native";
import ListFarmsPage from "./list_farms_page/ListFarmsPage";
import AddNewFarmPage from "./add_new_farm_page/AddNewFarmPage";
import UpdateFarmPage from "./update_farm_page/UpdateFarmPage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Workers({ match }) {
  const [farmToUpdate, setFarmToUpdate] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleFarmToUpdate = (farm) => {
    setFarmToUpdate(farm);
    history.push(location.pathname + "/updateFarm/");
  };

  return (
    <>
      <Switch>
        {farmToUpdate !== undefined && farmToUpdate !== null && (
          <Route path={match.path + "/updateFarm"}>
            <UpdateFarmPage farm={farmToUpdate} />
          </Route>
        )}

        <Route path={match.path + "/addFarm"}>
          <AddNewFarmPage />
        </Route>
        <Route path={match.url}>
          <ListFarmsPage handleFarmToUpdate={handleFarmToUpdate} />
        </Route>
      </Switch>
    </>
  );
}
