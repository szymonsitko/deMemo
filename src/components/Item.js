import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import Button from 'apsl-react-native-button';

const { height, width } = Dimensions.get('window');

class Item extends Component {
  render() {
    const { title, content, date } = this.props;
    const cd = new Date(date);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.itemTitleLabel}>Item <Text style={{ fontWeight: 'bold', color: '#cc6600' }}>{title}</Text></Text>
          {this.props.content ? <Text style={styles.itemContent}>{content}</Text> : <Text style={styles.noContentMessage}>No content added for this item!</Text>}
          <Text style={styles.dateAddedLabel}>Added at:</Text>
          <Text style={styles.dateLabel}>{cd.toString()}</Text>
          <View style={styles.buttons}>
            <Button onPress={() => this.props.onEdit(title)} style={styles.editButton} textStyle={{ color: '#0099e6' }}>
              Edit
            </Button>
            <Button onPress={() => this.props.onDelete(title)} style={styles.removeButton} textStyle={{ color: '#E84E38' }}>
              Remove
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button onPress={() => this.props.onClear()} style={styles.clearButton} textStyle={{ color: '#00364d' }}>
              Clear Item
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    // Dimensions & positioning
    width: width * .85,
    paddingLeft: 4,
    paddingRight: 4,
    // Colors & styles
  },
  itemTitleLabel: {
    // Dimensions & positioning
    marginTop: height * .01,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    // Colors
    color: '#00364d',
  },
  itemContent: {
    // Dimensions & positioning
    marginBottom: 6,
    marginTop: height * .035,
    // Colors & styling
    fontSize: 16
  },
  noContentMessage: {
    // Dimensions & positioning
    marginBottom: 6,
    marginTop: height * .035,
    // Colors & styling
    fontSize: 16,
    color: '#E84E38',
  },
  dateAddedLabel: {
    // Colors & styles
    marginTop: height * .035,
    fontWeight: 'bold'
  },
  dateLabel: {
    // Dimensions & positioning
    marginBottom: 12,
  },
  buttons: {
    // Dimensions & positioning
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    // Dimensions & positioning
    flex: 1,
    height: 40,
    marginRight: 2,
    // Colors & styling
    borderColor: '#0099e6',
    borderWidth: 2,
  },
  removeButton: {
    // Dimensions & positioning
    flex: 1,
    height: 40,
    marginRight: 2,
    // Colors & styling
    borderColor: '#E84E38',
    borderWidth: 2,
  },
  clearButton: {
    // Dimensions & positioning
    flex: 1,
    height: 40,
    marginBottom: (42 + (height * .035)),
    // Colors & styling
    borderColor: '#00364d',
    borderWidth: 2,
  }
}

export default Item;
