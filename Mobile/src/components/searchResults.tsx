import { ActivityIndicator, FlatList, View } from "react-native";
import Card from "./card";
import { Game } from "../types/game";

export type searchResultsProps = {
  results: Game[];
  loading: boolean;
  onEndReached?: () => void;
};

const SearchResults = ({
  results,
  loading,
  onEndReached,
}: searchResultsProps) => {
  return (
    <FlatList
      data={results}
      renderItem={({ item }) => <Card card={item} />}
      keyExtractor={(item) => item.id}
      ListFooterComponent={() => (
        <>
          {loading ? (
            <ActivityIndicator
              size={24}
              color="#800080"
              style={{ marginTop: 16 }}
            />
          ) : null}
          <View style={{ height: 80 }} />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
    />
  );
};

export default SearchResults;
