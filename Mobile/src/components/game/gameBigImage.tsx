import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

interface GameBigImageProperties {
  name: string
  mainImage: string
}

const GameBigImage: React.FC<GameBigImageProperties> = ({ name, mainImage }) => {

  const altText = `${name} main image.`;

  return (
    <View style={ styles.container }>
        <Image source={{ uri: mainImage }} style={ styles.imagen } accessibilityLabel={altText} />
    </View>
  );
};

export default GameBigImage;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  imagen: {
    width: '100%',
    height: 170
  }
});