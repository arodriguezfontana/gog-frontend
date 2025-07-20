import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Review } from '../../types/review'

const recommended = require('../../assets/images/recommended.png')
const notRecommended = require('../../assets/images/notRecommended.png')

interface IsRecommendedProperties {
  review: Review
}

const IsRecommendedIcon: React.FC<IsRecommendedProperties> = ({ review }) => {
  return (<Image
    source={review.isRecommended ? recommended : notRecommended}
    style={styles.image}
    accessibilityLabel={
      review.isRecommended ? 'Recommended.' : 'Not recommended.'
    }
  />
  )
}

export default IsRecommendedIcon;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30
  }
});