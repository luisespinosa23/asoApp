import React from "react";
import PropTypes from "prop-types";
import ListItem from "./list_item/ListItem";
import ListOptions from "./list_options/ListOptions";
import { FlatList, Text, View } from "react-native";
import { styles } from "./StylesList";

export default function List({
  array,
  emptyListText,
  handleClickOrderButton,
  handleClickFilterButton,
  handleClickNewButton,
  handleClickRow,
  children,
}) {
  const renderItem = ({ item }) => (
    <ListItem handleClickRow={handleClickRow} key={item[1]} array={item} />
  );

  return (
    <View style={styles.ListContainer}>
      <View>{children}</View>
      {array.length > 0 ? (
        <FlatList
          data={array}
          renderItem={renderItem}
          keyExtractor={(item) => item[1].toString()}
        />
      ) : (
        <View style={styles.EmptyTextContainer}>
          <Text style={styles.EmptyText}>{emptyListText}</Text>
        </View>
      )}
      <ListOptions
        handleClickFilterButton={handleClickFilterButton}
        handleClickNewButton={handleClickNewButton}
        handleClickOrderButton={handleClickOrderButton}
      />
    </View>
  );
}

List.propTypes = {
  children: PropTypes.element,
  array: PropTypes.arrayOf(PropTypes.array).isRequired,
  emptyListText: PropTypes.string.isRequired,
  handleClickOrderButton: PropTypes.func,
  handleClickFilterButton: PropTypes.func,
  handleClickNewButton: PropTypes.func.isRequired,
  handleClickRow: PropTypes.func.isRequired,
};
