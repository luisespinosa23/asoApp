import React from "react";
import { Route, Switch } from "react-router-native";
import ListWorkersPage from "./list_workers_page/ListWorkersPage";
import AddNewWorkerPage from "./add_new_worker_page/AddNewWorkerPage";
import UpdateWorkerPage from "./update_worker_page/UpdateWorkerPage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Workers({ match }) {
  const [workerToUpdate, setWorkerToUpdate] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleWorkerToUpdate = (worker) => {
    setWorkerToUpdate(worker);
    history.push(location.pathname + "/updateWorker/");
  };

  return (
    <>
      <Switch>
        {workerToUpdate !== undefined && (
          <Route path={match.path + "/updateWorker"}>
            <UpdateWorkerPage worker={workerToUpdate} />
          </Route>
        )}

        <Route path={match.path + "/addWorker"}>
          <AddNewWorkerPage />
        </Route>
        <Route path={match.url}>
          <ListWorkersPage handleWorkerToUpdate={handleWorkerToUpdate} />
        </Route>
      </Switch>
    </>
  );
}
