import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import LocalStorage from './state/LocalStorage';

import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    realtors: {}
  };

  saveAllRealtors = (responseJson) => {

    return LocalStorage.saveAllRealtorsAsync(responseJson);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {

    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/icon.png'),

      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
        'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('./assets/fonts/OpenSans-Semibold.ttf'),
      }),
      fetch('http://www.denverrealestate.com/rest.php/mobile/realtor/list?app_key=f7177163c833dff4b38fc8d2872f1ec6')
      .then((response) => response.json())
      .then((responseJson) => {
        this.saveAllRealtors(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
