import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Button from 'apsl-react-native-button';

class Items extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),

    };
  }

  renderRow(data) {
    return (
      <View>
        <Text style={styles.singleRow} onPress={() => console.log(data)}>{data}</Text>
      </View>
    )
  }

  renderFooter() {
    return (
      <View>
        <Button onPress={() => {this.props.onResetQuery()}}>Add New</Button>
      </View>
    )
  }

  render() {
    return (
      <View>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          renderFooter={this.renderFooter.bind(this)}
        />
      </View>
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
