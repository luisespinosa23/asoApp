import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { ListSales } from "../../../database/Sales";
import List from "../../shared/list/List";
import { styles } from "./StylesListSalesPage";
import { useHistory, useLocation } from "react-router-native";
import Loading from "../../shared/loading/Loading";
import PropTypes from "prop-types";
import formaterDate from "../../../helpers/FormaterDate";
import CustomModal from "../../shared/custom_modal/CustomModal";

export default function ListSalesPage({ handleSaleToUpdate }) {
  const history = useHistory();
  const location = useLocation();

  const [sales, setSales] = useState();
  const [value, setValue] = useState(0);
  const [modalParam, setModalParams] = useState({
    message: "",
    isOpen: false,
    handlePrimaryButton: () => {},
    primaryText: "",
  });

  useEffect(() => {
    const getSales = async () => {
      let newSales = [];
      newSales = await ListSales();
      if (newSales.length > 0) {
        let value = 0;
        const newSalesFormated = newSales.map((element, key) => {
          value =
            parseFloat(value) +
            parseFloat(element.kgCollected * element.priceByKg);

          return [
            element,
            key,
            formaterDate(element.date.toDate()),
            "Cliente: " + element.customer,
            "Cantidad: " + element.kgCollected,
            "Valor: " + parseFloat(element.kgCollected * element.priceByKg),
          ];
        });
        setSales(newSalesFormated);
        setValue(value);
      } else {
        setSales(newSales);
      }
    };

    getSales();
  }, []);

  const handleClickFilterButton = () => {
    console.log("handleClickFilterButton");
  };

  const handleClickNewButton = () => {
    history.push(location.pathname + "/addSale");
  };
  const handleClickOrderButton = () => {
    console.log("handleClickOrderButton");
  };

  const handleClickRow = (sale) => {
    handleSaleToUpdate(sale);
  };

  return (
    <>
      {Array.isArray(sales) ? (
        <View style={styles.SalesPageContainer}>
          <CustomModal {...modalParam} />
          <List
            array={sales}
            emptyListText={"No hay ventas registradas"}
            handleClickFilterButton={handleClickFilterButton}
            handleClickNewButton={handleClickNewButton}
            handleClickOrderButton={handleClickOrderButton}
            handleClickRow={handleClickRow}
          >
            <View style={styles.HeaderContainer}>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Num registros</Text>
                <Text style={styles.HeaderText}>{sales.length}</Text>
              </View>
              <View style={styles.HeaderGroupText}>
                <Text style={styles.HeaderText}>Valor $</Text>
                <Text style={styles.HeaderText}>{value}</Text>
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
ListSalesPage.propTypes = {
  handleSaleToUpdate: PropTypes.func.isRequired,
};
