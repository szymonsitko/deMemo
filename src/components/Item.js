import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Button from 'apsl-react-native-button';

const { height, width } = Dimensions.get('window');

class Item extends Component {
  render() {
    const { title, content, date } = this.props;
    const cd = new Date(date);
    return (
      <View style={styles.container}>
        <Text style={styles.itemTitleLabel}>Item <Text style={{ fontWeight: 'bold', color: '#cc6600' }}>{title}</Text></Text>
        {this.props.content ? <Text style={styles.itemContent}>{content}</Text> : <Text style={styles.noContentMessage}>No content added for this item!</Text>}
        <Text style={styles.dateLabel}>{cd.toString()}</Text>
        <View style={styles.buttons}>
          <Button onPress={() => this.props.onEdit(title)} style={styles.editButton} textStyle={{ color: '#0099e6' }}>
            Edit
          </Button>
          <Button onPress={() => this.props.onDelete(title)} style={styles.removeButton} textStyle={{ color: '#e60000' }}>
            Remove
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button onPress={() => this.props.onClear()} style={styles.clearButton} textStyle={{ color: '#00364d' }}>
            Clear
          </Button>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    // Dimensions & positioning
    width: width * .65,
    paddingLeft: 4,
    paddingRight: 4,
    // Colors & styles
  },
  itemTitleLabel: {
    // Dimensions & positioning
    marginTop: height * .035,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    // Colors
    color: '#00364d',
  },
  itemContent: {
    // Dimensions & positioning
    marginBottom: 6,
    marginTop: height * .035
  },
  noContentMessage: {
    // Dimensions & positioning
    marginBottom: 6,
    marginTop: height * .035,
    // Colors & styling
    color: '#ff9980',
  },
  dateLabel: {
    // Dimensions & positioning
    marginBottom: 12,
    marginTop: height * .035
  },
  buttons: {
    // Dimensions & positioning
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    // Dimensions & positioning
    flex: 1,
    height: 35,
    marginRight: 2,
    // Colors & styling
    borderColor: '#0099e6',
    borderWidth: 1.5,
  },
  removeButton: {
    // Dimensions & positioning
    flex: 1,
    height: 35,
    marginLeft: 2,
    // Colors & styling
    borderColor: '#e60000',
    borderWidth: 1.5,
  },
  clearButton: {
    // Dimensions & positioning
    flex: 1,
    height: 35,
    // Colors & styling
    borderColor: '#00364d',
    borderWidth: 1.5,
  }
}

export default Item;
