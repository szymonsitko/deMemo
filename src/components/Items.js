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

class Items extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),
      input: ''
    };
  }

  renderRow(data) {
    return (
      <TouchableOpacity onPress={() => console.log(data)}>
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
        <Text onPress={() => this.props.closeWindow()}>Close</Text>
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
        // Logic here!
        let newDataStore = [];

        for (let i = 0; i < this.props.items.length; i++) {
          if (this.props.items[i].contains(this.state.input)) {
            newDataStore.push(this.props.items[i]);
          }
        }
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({ dataSource: ds.cloneWithRows(newDataStore) });
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
  }
};

export default Items;
