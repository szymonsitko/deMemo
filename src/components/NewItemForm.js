import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import Button from 'apsl-react-native-button';

const { height, width } = Dimensions.get('window');

class NewItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = { description: this.props.description };
  }

  state = {
    description: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.itemTitleLabel}
        >
          Create Item
          <Text style={{ fontWeight: 'bold', color: '#cc6600' }}> {this.props.title}</Text>
        </Text>
        <TextInput
          multiline={true}
          placeholder="Item description"
          style={styles.inputField}
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />
        <View style={styles.buttons}>
          <Button onPress={() => this.props.onFormSubmit(this.state.description)} style={styles.addButton} textStyle={{ color: '#0099e6', }}>
            Add
          </Button>
          <Button onPress={() => this.props.onValuesReset()} style={styles.cancelButton} textStyle={{ color: '#e60000' }}>
            Cancel
          </Button>
        </View>
      </View>
    );
  };
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
  inputField: {
    // Dimensions & positioning
    marginBottom: 12,
    marginTop: height * .075
  },
  buttons: {
    // Dimensions & positioning
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    // Dimensions & positioning
    flex: 1,
    height: 35,
    marginRight: 2,
    marginBottom: 12,
    // Colors & styling
    borderColor: '#0099e6',
    borderWidth: 1.5,
  },
  cancelButton: {
    // Dimensions & positioning
    flex: 1,
    height: 35,
    marginLeft: 2,
    marginBottom: 12,
    // Colors & styling
    borderColor: '#e60000',
    borderWidth: 1.5,
  },
}

export default NewItemForm;
