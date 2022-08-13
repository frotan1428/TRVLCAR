import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useStore } from "../store";
import Car from "../components/home/car";
import { Button, Searchbar } from "react-native-paper";

const CarsScreen = () => {
  const { vehiclesState, searchBarState } = useStore();
  const { vehicles } = vehiclesState;
  const { isSearchBarVisible } = searchBarState;
  const [filteredList, setFilteredList] = useState(vehicles);


  const handleSearch = (text) => {
    const arr = text
      ? vehicles.filter((item) =>
          item.model.toLowerCase().includes(text.toLowerCase())
        )
      : vehicles;
    setFilteredList(arr);
  };

  return (
    <View style={styles.container}>
      {isSearchBarVisible && (
        <Searchbar placeholder="Search" onChangeText={handleSearch} />
      )}
      <FlatList
        data={filteredList}
        renderItem={(dataItem) => <Car data={dataItem.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CarsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
