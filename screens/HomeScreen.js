import React from 'react';
import {
  Platform,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import LocalStorage from '../state/LocalStorage';

import ListItem from '../components/ListItem';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  _keyExtractor = (item, index) => item.id;

  constructor(props) {
    super(props);
    this.state = {
            isRefreshing: false,
            activeButton: 'new',
            showtab: 'new',
            realtors: {},
            navigation: this.props.navigation
        };
  }

  getRealtors = async () => {

    let realtors = await LocalStorage.getAllRealtorsAsync();
    let imgPreFetch = '';

    realtors.map((photo,i) => {

      imgPreFetch = Image.prefetch(photo.photo);

      return imgPreFetch;
    });

    Promise.all(imgPreFetch).then(results => {

     console.log("loaded images from main");
    });

    this.setState({realtors: realtors})

  };

  componentWillMount() {
    this.getRealtors();
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  handleRefresh(){
    this.setState({
      isRefreshing: true
    });

    fetch('http://www.denverrealestate.com/rest.php/mobile/realtor/list?app_key=f7177163c833dff4b38fc8d2872f1ec6')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({realtors: responseJson});
      this.setState({
        isRefreshing: false
      });
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {

    return (
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <View>
              <FlatList
                  data={this.state.realtors}
                  keyExtractor={this._keyExtractor}
                  onRefresh={() => this.handleRefresh()}
                  refreshing={this.state.isRefreshing}
                  onEndThreshold={0}
                  renderItem={ ({item}) => <ListItem navigation={this.props.navigation} data={item} /> }
               />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    marginTop: 10,
    marginBottom: 20,
  }
});
