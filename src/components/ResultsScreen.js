import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Items from './Items';

class ResultsScreen extends Component {
  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.showResultsPage}
          onRequestClose={() => { }}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>List of All Added Items!</Text>

            <ScrollView>
            <Items
              items={this.props.titles}
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
  closeLabel: {
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    fontSize: 18,
  }
}

export default connect(mapStateToProps)(ResultsScreen);

            // <Text style={styles.closeLabel} onPress={() => this.props.closeResultsPage()}>Close me</Text>

// onResetQuery={this.resetDatabaseQuery.bind(this)}
// resetInput={this.resetInputValues.bind(this)}
