import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import type { SimpleGame } from '../types/simpleGame';

type SliderProperties = {
  games: SimpleGame[];
  onPressGame?: (game: SimpleGame) => void;
};

const Slider: React.FC<SliderProperties> = ({ games, onPressGame }) => {
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onPressGame?.(item)}
          activeOpacity={0.8}
        >
          <Image source={{ uri: item.mainImage }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.name.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Slider;

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 240,
    marginRight: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});