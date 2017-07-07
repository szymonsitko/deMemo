import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { createTitlesArray } from '../lib/database';

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

  renderFooter() {
    return (
      <View>
        <TextInput
          onChangeText={(input) => this.onUserTyping(input)}
        />
        <Text style={styles.closeButton} onPress={() => this.props.closeWindow()}>Close</Text>
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
      <ScrollView>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          renderFooter={this.renderFooter.bind(this)}
          enableEmptySections={true}
        />
      </ScrollView>
      );
    }
  }

const styles = {
  container: {
    flex: 1,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#33bbff',
    borderColor: '#0099e6',
    width: 100,
    marginRight: 2
  },
  singleRow: {
    margin: 2,
    fontSize: 14
  },
  closeButton: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  }
};

export default Items;