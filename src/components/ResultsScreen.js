import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Items from './Items';

class ResultsScreen extends Component {
  render() {
    return (
      <View>
        <Modal
          style={styles.container}
          animationType={"slide"}
          transparent={false}
          visible={this.props.showResultsPage}
          onRequestClose={this.props.closeResultsPage}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text style={styles.recordsMainLabel}>List of All Added Items!</Text>
            <ScrollView>
            <Items
              items={this.props.all_records}
              displayItemDetails={this.props.displayItemDetails}
              closeWindow={this.props.closeResultsPage}
            />
            </ScrollView>
          </View>
         </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ database }) => {
  return database;
}

const styles = {
  container: {
    flex: 1,
    marginTop: 22,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  closeLabel: {
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    fontSize: 18,
  },
  recordsMainLabel: {
    textAlign: 'center',
    fontSize: 22
  }
}

export default connect(mapStateToProps)(ResultsScreen);
