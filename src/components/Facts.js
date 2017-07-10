import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { FACTS } from '../constants';
import { pickRandomFact } from '../lib/helpers';

const { height, width } = Dimensions.get('window');

export const Facts = props => {
  const { fact } = props;
  return (
    <View>
      <Text style={styles.didYouKnowLabel}>Did You Know?</Text>
      <Text style={styles.didYouKnowContent}>{fact}</Text>
    </View>
  );
}

const styles = {
  didYouKnowLabel: {
    // Dimensions & positioning
    marginTop: height * .16,
    fontSize: 20,
    textAlign: 'center',
    // Colors & styling
    fontWeight: 'bold',
    color: '#cc6600'
  },
  didYouKnowContent: {
    // Dimensions & positioning
    marginTop: 20,
    textAlign: 'center',
    width: width * .75,
  }
}
