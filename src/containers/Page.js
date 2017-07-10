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
import Button from 'apsl-react-native-button';
import {
  initializeDatabaseObject,
  addNewDatabaseItem,
  queryDatabase,
  resetQuery,
  getAllRecords,
  removeDatabaseItem
} from '../actions';
import NewItemForm from '../components/NewItemForm';
import Item from '../components/Item';
import Items from '../components/Items';
import ResultsScreen from '../components/ResultsScreen';
import { GenericMessage } from '../components/GenericMessage';
import { Facts } from '../components/Facts';
import { FACTS } from '../constants';
import { pickRandomFact } from '../lib/helpers';

const { height, width } = Dimensions.get('window');

class Page extends Component {
  state = {
    item: '',
    fact: pickRandomFact(FACTS),
    showRecordsPage: false,
    editItem: false,
  }

  // Taking advantage of lifecycle methods
  componentWillMount() {
    this.props.initializeDatabaseObject();
    this.setState({ editItem: false });
  }

  clearTimeout() {
    clearInterval(this.state.timeout);
  }

  // Acknowledge user input with little time delay
  onUserTyping({ text }) {
    text = text.replace("\"", "").replace("\\", "")
    this.clearTimeout();
    this.setState({
      timeout: setTimeout(() => {
        this.setState({ item: text });
        this.props.queryDatabase(text);
      }, 500)
    });
    this.setState({ editItem: false });
  }

  // Default label rendering function
  renderDefaultLabel() {
    return (
      <View>
        <GenericMessage />
        <Facts fact={this.state.fact}/>
      </View>
    );
  }

  resetInputValues() {
    this.setState({ item: '' });
    this.refs['mainInput'].setNativeProps({text: ''});
  }

  // Saving new item into the database..
  storeFormValues(description) {
    this.setState({ editItem: false });
    this.props.addNewDatabaseItem(this.state.item, description);
    this.props.queryDatabase(this.state.item);
  }

  resetDatabaseQuery() {
    this.props.resetQuery();
  }

  deleteDatabaseItem(item) {
    this.props.removeDatabaseItem(item);
    this.resetInputValues();
  }

  editDatabaseItem(item) {
    this.setState({ editItem: true });
    this.props.queryDatabase(item);
  }

  // READ existing records and perform certain actions based on query results!
  renderItem() {
    const { query } = this.props;
    if (Object.keys(query).length === 0) {
      return (
        <NewItemForm
          title={this.state.item}
          description={''}
          onFormSubmit={this.storeFormValues.bind(this)}
          onValuesReset={this.resetInputValues.bind(this)}
        />
      );
    } else {
      if (Object.keys(query).length === 1 && this.state.editItem) {
        const itemData = query[0];
        return (
          <NewItemForm
            title={this.state.item}
            description={itemData.content}
            onFormSubmit={this.storeFormValues.bind(this)}
            onValuesReset={this.resetInputValues.bind(this)}
          />
        )
      }
      if (Object.keys(query).length === 1) {
        const itemData = query[0];
        return (
          <Item
            onClear={this.resetInputValues.bind(this)}
            onEdit={this.editDatabaseItem.bind(this)}
            onDelete={this.deleteDatabaseItem.bind(this)}
            title={itemData.title}
            content={itemData.content}
            date={itemData.date}
          />
        );
      }
    }
  }

  closeResultsPage() {
    this.setState({ showRecordsPage: false });
  }

  displaySingleItem(itemName) {
    // Make sure that the result screen is closed, this is on case if function is
    // invoked from ResultsScreen Modal
    itemName = itemName.replace("\"", "").replace("\\", "");
    this.closeResultsPage();
    this.onUserTyping({ text: itemName });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>de<Text style={{ color: 'white' }}>Memo</Text></Text>
          <Text style={styles.littleMessage}>Helps to organise everyday tasks</Text>
        </View>
        <TextInput
          ref={'mainInput'}
          style={styles.input}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Type here your item title!"
          onChangeText={(text) => this.onUserTyping({text})}
        />
          {this.state.item ? this.renderItem() : this.renderDefaultLabel()}
        <ResultsScreen
          displayItemDetails={this.displaySingleItem.bind(this)}
          showResultsPage={this.state.showRecordsPage}
          closeResultsPage={this.closeResultsPage.bind(this)}
        />
        <Text
          style={styles.listBottomLabel}
          onPress={() => this.setState({ showRecordsPage: true })}
        >
        All Records List
        </Text>
      </View>
    );
  };
}

const styles = {
  container: {
    // Dimensions & positioning
    flex: 1,
    alignItems: 'center',
    // Colors & styling
    backgroundColor: '#F5FCFF',
  },
  welcomeContainer: {
    // Dimensions & positioning
    width: width,
    // Colors & styling
    borderBottomWidth: 8,
    backgroundColor: '#E84E38',
    borderBottomColor: '#f29a8d',
  },
  welcome: {
    // Dimensions & positioning
    fontSize: 46,
    marginTop: height * .015,
    // Colors & styling
    color: '#721b0d',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  littleMessage: {
    // Dimensions & positioning
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    // Colors & styling
    color: 'white',
  },
  input: {
    // Dimensions & positioning
    width: width * .825,
    height: 52,
    borderWidth: 2,
    marginTop: height * .03,
    fontSize: 22,
    // Colors
    color: '#00001a',
    borderBottomColor: '#484848',
    backgroundColor: 'white'
  },
  listBottomLabel: {
    // Dimensions & positioning
    flex: 1,
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // Styles
    fontFamily: 'Lato-Regular',
    // Colors
    backgroundColor: '#E84E38',
    color: 'white',
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
  getAllRecords,
  removeDatabaseItem
})(Page);
