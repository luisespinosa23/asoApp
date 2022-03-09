import React from "react";
import { Route, Switch } from "react-router-native";
import ListCollectionsPage from "./list_collections_page/ListCollectionsPage";
import AddNewCollectionPage from "./add_new_collection_page/AddNewCollectionPage";
import UpdateCollectionPage from "./update_collection_page/UpdateCollectionPage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Collections({ match }) {
  const [collectionToUpdate, setCollectionToUpdate] = useState();
  const [lots, setLots] = useState();
  const [workers, setWorkers] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleCollectionToUpdate = (collection, lots, workers) => {
    setCollectionToUpdate(collection);
    setLots(lots);
    setWorkers(workers);
    history.push(location.pathname + "/updateCollection/");
  };

  const handleLotsAndWorkers = (lots, workers) => {
    setLots(lots);
    setWorkers(workers);
    history.push(location.pathname + "/addCollection");
  };

  return (
    <>
      <Switch>
        {collectionToUpdate !== undefined && collectionToUpdate !== null && (
          <Route path={match.path + "/updateCollection"}>
            <UpdateCollectionPage
              collection={collectionToUpdate}
              lots={lots}
              workers={workers}
            />
          </Route>
        )}

        {Array.isArray(lots) && Array.isArray(workers) && (
          <Route path={match.path + "/addCollection"}>
            <AddNewCollectionPage lots={lots} workers={workers} />
          </Route>
        )}
        <Route path={match.url}>
          <ListCollectionsPage
            handleCollectionToUpdate={handleCollectionToUpdate}
            handleLotsAndWorkers={handleLotsAndWorkers}
          />
        </Route>
      </Switch>
    </>
  );
}
