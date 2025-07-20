import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import AppLayout from "../../components/appLayout";
import SearchResults from "../../components/searchResults";
import H2 from "../../components/customElements/h2";
import React from "react";
import { useSearch } from "../../context/searchContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
  },
  searchBar: {
    height: 36,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#EDEDED",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    fontSize: 20,
    color: "#212121",
  },
});

const Search = () => {
  const {
    loading,
    searchQuery,
    searchResults,
    hasSearched,
    setSearchQuery,
    handleEndReached,
  } = useSearch();

  return (
    <AppLayout>
      <View style={styles.container}>
        <H2>SEARCH GAME</H2>
        <TextInput
          placeholder=""
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />
        {loading && (
          <ActivityIndicator
            size={24}
            color="#800080"
            style={{ marginTop: 16 }}
          />
        )}
        {hasSearched &&
          !loading &&
          searchResults.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResults}>No se encontraron resultados</Text>
            </View>
          )}
        {searchResults.length > 0 && (
          <SearchResults
            results={searchResults}
            loading={loading}
            onEndReached={handleEndReached}
          />
        )}
      </View>
    </AppLayout>
  );
};

export default Search;