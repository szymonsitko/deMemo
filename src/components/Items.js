import React, { Component } from 'react';
import { View, ScrollView, ListView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Button from 'apsl-react-native-button';

class Items extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.items),

    };
  }

  _onPressAddressList(data) {
    console.log(data);
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
        <Button onPress={() => {this.props.onResetQuery()}}>Add New</Button>
        <Button onPress={() => {this.props.resetInput()}}>Clear List</Button>
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
          renderFooter={this.renderFooter.bind(this)}
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
