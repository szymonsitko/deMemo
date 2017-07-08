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
    const formattedDate = new Date(data.date);
    return (
      <TouchableOpacity onPress={() => this.props.displayItemDetails(data.title)}>
        <View>
          <Text style={styles.singleRowTitle}>{data.title}</Text>
          <Text style={styles.singleRowDate}>{formattedDate.toUTCString().replace("GMT", "")}</Text>
        </View>
      </TouchableOpacity>
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
          let titleAndDate = {};
          if (this.props.items[i].title.contains(this.state.input)) {
            titleAndDate['title'] = this.props.items[i].title;
            titleAndDate['date'] = this.props.items[i].date;
            newDataStore.push(titleAndDate);
          };
        };
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({ dataSource: ds.cloneWithRows(newDataStore) });
      }, 500)
    });
  }

  render() {
    return (
      <View>
        <View style={styles.stickyHeader}>
          <TextInput
            style={styles.searchItemsInput}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Type to search from list"
            onChangeText={(input) => this.onUserTyping(input)}
          />
        </View>
        <ScrollView style={styles.listViewContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => this.renderRow(data)}
            enableEmptySections={true}
          />
        </ScrollView>
      </View>
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
    maxHeight: height * .7,
  },
  searchItemsInput: {
    // Dimensions & positioning
    width: width * .75,
    height: 40,
    borderWidth: 1.5,
    marginTop: 12,
    marginBottom: 8,
    // Colors & styling
    color: '#00001a',
    borderBottomColor: '#484848'
  },
  singleRowTitle: {
    // Dimensions & positioning
    marginTop: 3,
    // Colors & styling
    fontSize: 18,
    color: '#00364d',
    fontWeight: 'bold'
  },
  singleRowDate: {
    // Colors & styling
    fontSize: 12,
    marginBottom: 3,
    padding: 2,
  }
};

export default Items;
