import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Item extends Component {
  render() {
    const { title, content, date } = this.props;
    const cd = new Date(date);
    return (
      <View>
        <Text>{title}</Text>
        <Text>{content}</Text>
        <Text>{cd.toString()}</Text>
      </View>
    )
  }
}

export default Item;
