import React from "react";
import { Route, Switch } from "react-router-native";
import ListLotsPage from "./list_lots_page/ListLotsPage";
import AddNewLotPage from "./add_new_lot_page/AddNewLotsPage";
import UpdateLotPage from "./update_lots_page/UpdateLotsPage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Workers({ match }) {
  const [lotToUpdate, setLotToUpdate] = useState();
  const [farms, setFarms] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleLotToUpdate = (lot) => {
    setLotToUpdate(lot);
    history.push(location.pathname + "/updateLot/");
  };

  const handleFarms = (farms) => {
    setFarms(farms);
    history.push(location.pathname + "/addLot");
  };

  return (
    <>
      <Switch>
        {lotToUpdate !== undefined && lotToUpdate !== null && (
          <Route path={match.path + "/updateLot"}>
            <UpdateLotPage lot={lotToUpdate} />
          </Route>
        )}
        {Array.isArray(farms) && (
          <Route path={match.path + "/addLot"}>
            <AddNewLotPage farms={farms} />
          </Route>
        )}

        <Route path={match.url}>
          <ListLotsPage
            handleLotToUpdate={handleLotToUpdate}
            handleFarms={handleFarms}
          />
        </Route>
      </Switch>
    </>
  );
}
