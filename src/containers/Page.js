import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Realm from 'realm';
import Button from 'apsl-react-native-button';
import {
  initializeDatabaseObject,
  addNewDatabaseItem,
  queryDatabase,
  resetQuery,
  getAllRecords
} from '../actions';
import { realmDatabase } from '../lib/database';
import { DATABASE_NAME } from '../constants';
import NewItemForm from '../components/NewItemForm';
import Item from '../components/Item';
import Items from '../components/Items';
import ResultsScreen from '../components/ResultsScreen';

const { height, width } = Dimensions.get('window');

class Page extends Component {
  state = {
    item: '',
    showRecordsPage: false
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
        this.props.queryDatabase(text);
      }, 500)
    });
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
    console.log(query);
    if (Object.keys(query).length === 0) {
      return (
        <NewItemForm
          onFormSubmit={this.storeFormValues.bind(this)}
          onValuesReset={this.resetInputValues.bind(this)}
        >{this.state.item}
        </NewItemForm>
      );
    } else {

      if (Object.keys(query).length === 1) {
        const itemData = query[0];
        return (
          <Item title={itemData.title} content={itemData.content} date={itemData.date} />
        );
      }
    }
  }

  closeResultsPage() {
    this.setState({ showRecordsPage: false });
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
        <ResultsScreen
          showResultsPage={this.state.showRecordsPage}
          closeResultsPage={this.closeResultsPage.bind(this)}
        />
        <Text
          style={styles.listBottomButton}
          onPress={() => this.setState({ showRecordsPage: true })}
        >
        Click me
        </Text>
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
  },
  listBottomButton: {
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: 18,
  }
};

const mapStateToProps = ({ database }) => {
  return database;
}

export default connect(mapStateToProps, {
  initializeDatabaseObject,
  addNewDatabaseItem,
  queryDatabase,
  resetQuery,
  getAllRecords
})(Page);
