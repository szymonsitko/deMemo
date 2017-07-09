import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView } from 'react-native';
import Button from 'apsl-react-native-button';

const { height, width } = Dimensions.get('window');

class NewItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      formHeight: 35
    };
  }

  state = {
    description: '',
    formHeight: 35
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={styles.itemTitleLabel}
        >
          Item
          <Text style={{ fontWeight: 'bold', color: '#cc6600' }}> {this.props.title}</Text>
        </Text>
        <TextInput
          multiline={true}
          placeholder="Place item description here.."
          style={styles.inputField}
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />
        <View style={styles.buttons}>
          <Button onPress={() => this.props.onFormSubmit(this.state.description)} style={styles.saveButton} textStyle={{ color: '#0099e6', fontWeight: 'bold' }}>
            Save
          </Button>
          <Button onPress={() => this.props.onValuesReset()} style={styles.cancelButton} textStyle={{ color: '#e60000', fontWeight: 'bold' }}>
            Cancel
          </Button>
        </View>
      </ScrollView>
    );
  };
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
  inputField: {
    // Dimensions & positioning
    marginBottom: 12,
    marginTop: 6,
    textAlignVertical: 'bottom',
    height: 220,
    // Colors & styling
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#f2f2f2'
  },
  buttons: {
    // Dimensions & positioning
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    // Dimensions & positioning
    flex: 1,
    height: 40,
    marginRight: 2,
    marginBottom: 12,
    // Colors & styling
    borderColor: '#0099e6',
    borderWidth: 2,
  },
  cancelButton: {
    // Dimensions & positioning
    flex: 1,
    height: 40,
    marginLeft: 2,
    marginBottom: (42 + (height * .035)),
    // Colors & styling
    borderColor: '#e60000',
    borderWidth: 2,
  },
}

export default NewItemForm;
