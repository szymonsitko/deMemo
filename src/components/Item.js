import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from 'apsl-react-native-button';

class Item extends Component {
  render() {
    const { title, content, date } = this.props;
    const cd = new Date(date);
    return (
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
        <Text>{cd.toString()}</Text>
        <View style={{  flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button onPress={() => this.props.onEdit(title)} style={styles.editButton} textStyle={{ color: 'white' }}>
            Edit
          </Button>
          <Button onPress={() => this.props.onDelete(title)} style={styles.removeButton} textStyle={{ color: 'white' }}>
            Remove
          </Button>
        </View>
      </View>
    )
  }
}

const styles = {
  editButton: {
    backgroundColor: '#33bbff',
    borderColor: '#0099e6',
    width: 100,
    marginRight: 2
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    borderColor: '#e60000',
    width: 100,
    marginLeft: 2
  },
}

export default Item;
