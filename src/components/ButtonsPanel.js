import React from 'react';
import { View } from 'react-native';
import Button from 'apsl-react-native-button';

export const ButtonsPanel = props => {
  return (
    <View>
      <Button onPress={() => props.onAddNewItem()} style={styles.addButton} textStyle={{ color: 'white' }}>
        Add
      </Button>
      <Button onPress={() => props.onValuesReset()} style={styles.cancelButton} textStyle={{ color: 'white' }}>
        Cancel
      </Button>
    </View>
  );
}

const styles = {
  addButton: {
    backgroundColor: '#33bbff',
    borderColor: '#0099e6',
    width: 100,
    marginRight: 2,
    position: 'absolute'
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    borderColor: '#e60000',
    width: 100,
    marginLeft: 2,
    position: 'absolute'
  }
}
