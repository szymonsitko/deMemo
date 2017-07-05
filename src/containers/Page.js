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
import { initializeDatabaseObject } from '../actions';
import { realmDatabase } from '../lib/database';
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

  storeFormValues(description) {
    console.log(`Item ${this.state.item} Description ${description}`);
  }

  checkUserInputWithDatastore() {
    // Just an example, but really should include database query here!
    if (this.state.item) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Organiser</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here your item name!"
          onChangeText={(text) => this.onUserTyping({text})}
        />
        {this.checkUserInputWithDatastore() ? <NewItemForm onFormSubmit={this.storeFormValues.bind(this)}>{this.state.item}</NewItemForm> : <Text>Waiting..!</Text>}
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

export default connect(mapStateToProps, { initializeDatabaseObject })(Page);
