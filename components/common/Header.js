import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useStore } from "../../store";
import { setSearchBarVisibilty } from "../../store/search-bar/searchBarActions";

const Header = (props) => {
  const { back, navigation, options, route } = props;
  const { searchBarState, dispatchSearchBar } = useStore();
  const { isSearchBarVisible } = searchBarState;

  const  handleSearchBar = () => { 
    dispatchSearchBar(setSearchBarVisibilty(!isSearchBarVisible));
  }

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={options.title} />
      {route.name === "cars" && (
        <Appbar.Action icon="magnify" onPress={handleSearchBar} />
      )}
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});
