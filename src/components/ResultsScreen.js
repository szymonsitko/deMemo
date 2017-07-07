import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'apsl-react-native-button';
import Items from './Items';

const { height, width } = Dimensions.get('window');

class ResultsScreen extends Component {
  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.showResultsPage}
          onRequestClose={this.props.closeResultsPage}
          >
         <View style={styles.container}>
          <View>
            <View style={styles.recordsContainer}>
              <Text style={styles.recordsLabel}>List of Items</Text>
            </View>
            <ScrollView style={styles.itemsList}>
            <Items
              items={this.props.all_records}
              displayItemDetails={this.props.displayItemDetails}
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
    // Dimensions & positioning
    flex: 1,
    alignItems: 'center',
    // Colors & styling
    backgroundColor: '#F5FCFF',
  },
  recordsContainer: {
    // Dimensions & positioning
    width: width,
    // Colors & styling
    borderBottomWidth: 2,
    borderBottomColor: '#ff8000',
    backgroundColor: '#484848',
  },
  recordsLabel: {
    // Dimensions & positioning
    textAlign: 'center',
    margin: 8,
    marginTop: height * .025,
    marginBottom: height * .025,
    // Colors & styling
    fontSize: 28,
    color: 'white',
    fontFamily: 'Lato-Regular',
  },
  itemsList: {
    // Dimensions & positioning
    marginLeft: width * .125,
    marginRight: width * .125,
    width: width * .75,
  },
  recordsMainLabel: {
    textAlign: 'center',
    fontSize: 22
  },
}

export default connect(mapStateToProps)(ResultsScreen);
