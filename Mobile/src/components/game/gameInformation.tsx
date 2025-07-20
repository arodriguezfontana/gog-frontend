import React from 'react'
import { View, Text, StyleSheet, Linking, TouchableOpacity, Pressable } from 'react-native'
import { Tag } from '../../types/tag'

interface GameInformationProperties {
  developerName: string
  website: string
  releaseDate: string
  tags: Tag[];
  handleShowTags: () => void;
}

const GameInformation: React.FC<GameInformationProperties> = ({ developerName, website, releaseDate, tags, handleShowTags }) => {

  const fiveTags = tags.slice(0, 5).map((tag, index) => (
    <Text key={index} style={styles.underlineText}>
      {tag.name}
    </Text>
  ));

  const handlePress = () => {
    Linking.openURL(website)
  }

  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.boldText}>Developer: </Text>
        <Text style={styles.underlineText}>{developerName}</Text>
      </Text>
      <Text>
        <View style={styles.row}>
          <Text style={styles.boldText}>Website: </Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.underlineText}>{website}</Text>
          </TouchableOpacity>
        </View>
      </Text>
      <Text>
        <Text style={styles.boldText}>Release date: </Text>
        <Text style={{ fontSize: 18 }}>{releaseDate.split("T")[0]}</Text>
      </Text>
      <View style={styles.tagsContainer}>
        <Text style={styles.boldText}>Tags: </Text>
        {fiveTags}
        <Pressable onPress={() => handleShowTags()}>
          <Text style={styles.underlineText}>more...</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default GameInformation;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  underlineText: {
    textDecorationLine: 'underline',
    marginRight: 5,
    fontSize: 18
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});