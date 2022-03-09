import React from "react";
import { Route, Switch } from "react-router-native";
import ListSalesPage from "./list_sales_page/ListSalesPage";
import AddNewSalePage from "./add_new_sale_page/AddNewSalePage";
import UpdateSalePage from "./update_sale_page/UpdateSalePage";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-native";

export default function Sales({ match }) {
  const [saleToUpdate, setSaleToUpdate] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleSaleToUpdate = (sale) => {
    setSaleToUpdate(sale);
    history.push(location.pathname + "/updateSale/");
  };

  return (
    <>
      <Switch>
        {saleToUpdate !== undefined && saleToUpdate !== null && (
          <Route path={match.path + "/updateSale"}>
            <UpdateSalePage sale={saleToUpdate} />
          </Route>
        )}
        <Route path={match.path + "/addSale"}>
          <AddNewSalePage />
        </Route>
        <Route path={match.url}>
          <ListSalesPage handleSaleToUpdate={handleSaleToUpdate} />
        </Route>
      </Switch>
    </>
  );
}
