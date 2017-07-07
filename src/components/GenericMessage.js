import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { FACTS } from '../constants';
import { pickRandomFact } from '../lib/helpers';

const { height, width } = Dimensions.get('window');

export const GenericMessage = () => {
  const randomFact = pickRandomFact(FACTS);
  return (
    <View>
      <Text style={styles.genericLabel}>Start typing to query history.</Text>
    </View>
  );
}

const styles = {
  genericLabel: {
    // Dimensions & positioning
    marginTop: height * .035,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    // Colors
    color: '#00364d',
  },
}
