import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from 'apsl-react-native-button';

class NewItemForm extends Component {
  state = {
    description: ''
  }

  render() {
    return (
      <View>
        <Text style={styles.itemTitleLabel}>Item Title <Text style={{ fontWeight: 'bold' }}>{this.props.children}</Text></Text>
        <Text style={styles.descriptionLabel}>Description</Text>
        <TextInput
          multiline={true}
          onChangeText={(text) => this.setState({ description: text }) }
          value={this.state.description}
        />
        <View style={{  flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button onPress={() => this.props.onFormSubmit(this.state.description)} style={styles.addButton} textStyle={{ color: 'white' }}>
            Add
          </Button>
          <Button onPress={() => this.props.onValuesReset()} style={styles.cancelButton} textStyle={{ color: 'white' }}>
            Cancel
          </Button>
        </View>
      </View>
    );
  };
}

const styles = {
  addButton: {
    backgroundColor: '#33bbff',
    borderColor: '#0099e6',
    width: 100,
    marginRight: 2
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
    borderColor: '#e60000',
    width: 100,
    marginLeft: 2
  },
  itemTitleLabel: {
    textAlign: 'center'
  },
  descriptionLabel: {
    textAlign: 'center'
  }
}

export default NewItemForm;
