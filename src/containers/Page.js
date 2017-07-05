import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Animated
} from 'react-native';
import FadeIn from '../components/FadeIn';

const { height, width } = Dimensions.get('window');

export class Page extends Component {
  state = {
    input: '',
  }

  clearTimeout() {
    clearInterval(this.state.timeout);
  }

  renderItemBasedOnUserInput() {
    return (
        <Text>{this.state.input}</Text>
    );
  }

  onUserTyping({ text }) {
    this.clearTimeout();
    this.setState({
      timeout: setTimeout(() => {
        this.setState({ input: text });
      }, 1500)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Organiser</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here your item name!"
          onChangeText={(text) => this.onUserTyping({text})}
        />
        {this.renderItemBasedOnUserInput()}
      </View>
    );
  };
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 32,
    textAlign: 'center',
    margin: 10,
    marginTop: height * .05
  },
  input: {
    width: width * .75
  }
};
