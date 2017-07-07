import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import { createTitlesArray } from '../lib/database';

const { height, width } = Dimensions.get('window');

class Items extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(createTitlesArray(this.props.items)),
      input: ''
    };
  }

  renderRow(data) {
    return (
      <TouchableOpacity onPress={() => this.props.displayItemDetails(data)}>
        <Text style={styles.singleRow}>{data}</Text>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    return (
      <View>
        <TextInput
          style={styles.searchItemsInput}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Type to search from list"
          onChangeText={(input) => this.onUserTyping(input)}
        />
      </View>
    )
  }

  clearTimeout() {
    clearInterval(this.state.timeout);
  }

  onUserTyping(text) {
    this.clearTimeout();
    this.setState({
      timeout: setTimeout(() => {
        this.setState({ input: text });
        let newDataStore = [];
        for (let i = 0; i < this.props.items.length; i++) {
          if (this.props.items[i].title.contains(this.state.input)) {
            newDataStore.push(this.props.items[i].title);
          };
        };
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({ dataSource: ds.cloneWithRows(newDataStore)});
      }, 500)
    });
  }

  render() {
    return (
      <ScrollView style={styles.listViewContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          renderHeader={this.renderHeader.bind(this)}
          enableEmptySections={true}
        />
      </ScrollView>
      );
    }
  }

const styles = {
  container: {
    // Dimensions & positioning
    flex: 1,
  },
  listViewContainer: {
    // Dimensions & positioning
    marginTop: 6,
    maxHeight: height * .8,
  },
  searchItemsInput: {
    // Dimensions & positioning
    width: width * .75,
    height: 40,
    borderWidth: 1.5,
    marginTop: 2,
    marginBottom: 2,
    // Colors & styling
    color: '#00001a',
    borderBottomColor: '#484848'
  },
  addButton: {
    // Dimensions & positioning
    width: 100,
    marginRight: 2,
    // Colors & styling
    backgroundColor: '#33bbff',
    borderColor: '#0099e6',
  },
  singleRow: {
    // Dimensions & positioning
    margin: 2,
    // Colors & styling
    fontSize: 14
  },
  buttons: {
    // Dimensions & positioning
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Items;
