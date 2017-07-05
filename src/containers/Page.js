import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import Realm from 'realm';
import { initializeDatabaseObject, addNewDatabaseItem } from '../actions';
import { realmDatabase } from '../lib/database';
import { DATABASE_NAME } from '../constants';
import NewItemForm from '../components/NewItemForm';

const { height, width } = Dimensions.get('window');

class Page extends Component {
  state = {
    item: '',
  }

  componentWillMount() {
    this.props.initializeDatabaseObject();
  }

  clearTimeout() {
    clearInterval(this.state.timeout);
  }

  onUserTyping({ text }) {
    this.clearTimeout();
    this.setState({
      timeout: setTimeout(() => {
        this.setState({ item: text });
      }, 1500)
    });
  }

  // Default label rendering function
  renderDefaultLabel() {
    return <Text>Start typing to query history.</Text>;
  }

  // CREATE new record actions related!
  renderNewItemCreateForm() {
    return (
      <NewItemForm onFormSubmit={this.storeFormValues.bind(this)}>{this.state.item}</NewItemForm>
    );
  }
  // Saving new item into the database..
  storeFormValues(description) {
    this.props.addNewDatabaseItem(this.state.item, description);
    this.setState({ item: '' })
  }

  // READ existing records actions related!
  


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Organiser</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here your item name!"
          onChangeText={(text) => this.onUserTyping({text})}
        />
        {this.state.item ? this.renderNewItemCreateForm() : this.renderDefaultLabel()}
      </View>
    );
  };
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 32,
    textAlign: 'center',
    margin: 10,
    marginTop: height * .05
  },
  input: {
    width: width * .75
  }
};

const mapStateToProps = ({ database }) => {
  return database;
}

export default connect(mapStateToProps, {
  initializeDatabaseObject,
  addNewDatabaseItem
})(Page);
