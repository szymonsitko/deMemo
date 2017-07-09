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
            <View style={styles.itemsList}>
            <Items
              items={this.props.all_records}
              displayItemDetails={this.props.displayItemDetails}
            />
            </View>
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
    borderBottomWidth: 6,
    borderBottomColor: '#f29a8d',
    backgroundColor: '#E84E38',
  },
  recordsLabel: {
    // Dimensions & positioning
    textAlign: 'center',
    margin: 2,
    marginTop: height * .025,
    marginBottom: height * .025,
    // Colors & styling
    fontSize: 18,
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
