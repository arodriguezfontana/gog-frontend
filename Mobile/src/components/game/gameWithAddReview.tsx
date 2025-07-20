import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import ProfileIcon from '../icon/profileIcon'
import { putAddReviewToGame } from '../../services/gamesService'
import { User } from '../../types/user';
import GogButton from '../customElements/gogButton';
import { APIException } from "../../services/exceptions";
import { useRouter } from 'expo-router'
import { useAuth } from "../../context/authContext";

interface GameWithAddReviewProperties {
  user: User;
  gameId: string;
  onReviewAdded?: () => void;
  colorSchema: string;
}

const GameWithAddReview: React.FC<GameWithAddReviewProperties> = ({ user, gameId, onReviewAdded, colorSchema }) => {
  const { token } = useAuth();
  const router = useRouter()
  const recommended = require('../../assets/images/recommended.png')
  const notRecommended = require('../../assets/images/notRecommended.png')

  const [isRecommended, setIsRecommended] = useState<boolean | null>(null);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const clickAddReviewHandler = async () => {
    if (isRecommended === null) {
      setError('You must select whether the game is recommended or not.');
      return;
    }

    if (!text.trim()) {
      setError('The review text cannot be empty.');
      return;
    }

    try {
      await putAddReviewToGame(gameId, {
        isRecommended,
        text,
      }, token);
      onReviewAdded?.();
    } catch (err) {
      if (err instanceof APIException) {
        router.replace(err.path);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>

        <View style={styles.headerRow}>
          <ProfileIcon user={user} colorSchema="white" />
          <TouchableOpacity onPress={() => router.push(`/profile/${user.id}`)}>
            <Text style={[styles.name, { color: colorSchema }]}>
              {user.name}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendationRow}>
          <Text style={styles.recommendationText}>Recommended</Text>
          <TouchableOpacity onPress={() => setIsRecommended(true)}>
            <Image
              source={recommended}
              style={[styles.thumb, isRecommended === true && styles.selected]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsRecommended(false)}>
            <Image
              source={notRecommended}
              style={[styles.thumb, isRecommended === false && styles.selected]}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Text</Text>
        <TextInput
          multiline
          value={text}
          onChangeText={setText}
          style={styles.textArea}
          placeholderTextColor="#999"
        />

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <View style={styles.buttonWrapper}>
          <GogButton bgColor="violet"
            fontColor="white"
            onHandlePress={clickAddReviewHandler}>
            Add review
          </GogButton>
        </View>
      </View>
    </View>
  )
}

export default GameWithAddReview;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5
  },
  box: {
    backgroundColor: 'grey',
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  recommendationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 16,
    color: 'white',
    marginRight: 5
  },
  thumb: {
    width: 30,
    height: 30,
    opacity: 0.7,
  },
  selected: {
    opacity: 1,
  },
  textLabel: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  textArea: {
    width: '100%',
    textAlignVertical: 'top',
    borderRadius: 5,
    height: 80,
    backgroundColor: 'white',
    marginBottom: 10
  },
  error: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
  },
  buttonWrapper: {
    width: '100%',
  }
});