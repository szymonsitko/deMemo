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
import Button from 'apsl-react-native-button';
import {
  initializeDatabaseObject,
  addNewDatabaseItem,
  queryDatabase,
  resetQuery
} from '../actions';
import { realmDatabase } from '../lib/database';
import { DATABASE_NAME } from '../constants';
import NewItemForm from '../components/NewItemForm';
import Item from '../components/Item';
import Items from '../components/Items';

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
      }, 500)
    });
    this.props.queryDatabase(text);
  }

  // Default label rendering function
  renderDefaultLabel() {
    return <Text>Start typing to query history.</Text>;
  }

  resetInputValues() {
    this.setState({ item: '' });
  }

  // Saving new item into the database..
  storeFormValues(description) {
    this.props.addNewDatabaseItem(this.state.item, description);
    this.resetInputValues();
  }

  resetDatabaseQuery() {
    this.props.resetQuery();
  }

  // READ existing records and perform certain actions based on query results!
  renderItem() {
    const { query } = this.props;
    if (Object.keys(query).length === 0) {
      return (
        <NewItemForm
          onFormSubmit={this.storeFormValues.bind(this)}
          onValuesReset={this.resetInputValues.bind(this)}
        >{this.state.item}
        </NewItemForm>
      );
    } else {
      if (Object.keys(query).length >= 1) {
        let keys = Object.keys(query);
        let dataArray = [];
        for (let i = 0; i < Object.keys(query).length; i++) {
          dataArray.push(query[keys[i]].title);
        }
        return (
          <View>
            <Text>Records found for {this.state.item}</Text>
            <Items onResetQuery={this.resetDatabaseQuery.bind(this)} items={dataArray} />
          </View>
        );
      }
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
        {this.state.item ? this.renderItem() : this.renderDefaultLabel()}
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
  },
  addButton: {
    backgroundColor: '#ff4d4d',
    borderColor: '#e60000',
    width: 100,
    marginLeft: 2
  }
};

const mapStateToProps = ({ database }) => {
  return database;
}

export default connect(mapStateToProps, {
  initializeDatabaseObject,
  addNewDatabaseItem,
  queryDatabase,
  resetQuery
})(Page);
