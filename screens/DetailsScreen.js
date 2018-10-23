import React from 'react';
import { ScrollView, TouchableHighlight, StyleSheet,Text, View, Image, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { RegularText, BoldText } from '../components/StyledText';
import call from 'react-native-phone-call'

import Colors from '../constants/Colors';

let photo = null;

export default class DetailsScreen extends React.Component {



  constructor(props) {

    super(props);

    this.state = {
      isLoading: false,
      data: { first_name: ''},
      imageLoaded: false
    }


  }

  componentWillMount() {

    const { navigation } = this.props;
    const id = navigation.getParam('id', '');

    this.getRealtor(id);
  }

  componentDidMount() {


  }

  static navigationOptions = ({ navigation }) => {

    const params = navigation.state.params || {};

    return {
      id: params.id
    }
  }


  getRealtor(id){

    this.setState({
      isLoading: true
    });

    fetch('http://www.denverrealestate.com/rest.php/mobile/realtor/profile/'+id+'/?app_key=f7177163c833dff4b38fc8d2872f1ec6')
    .then((response) => response.json())
    .then((responseJson) => {

      var imagePrefetch = Image.prefetch(responseJson.data.photo);

      Promise.all(imagePrefetch).then(results => {
        this.setState({imageLoaded: true});
      });

      this.setState({
        isLoading: false
      });

      responseJson.data.bio = responseJson.data.bio.replace(/  +/g, '\n\n');

      this.setState(responseJson);

    })
    .catch((error) => {
      console.error(error);
    });

  }

  _handlePressCall(number) {

    const args = {
      number: number,
      prompt: false
    }

    call(args).catch(console.error)

  }

  render() {

    if(!this.state.imageLoaded) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#2f95dc" style={styles.activityIndicator}/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>

           <View style={styles.profileImageContainer}>
            <Image
                 source={{uri: this.state.data.photo}}
                 style={styles.imagem}
             />
             <BoldText style={{"paddingTop": 15, "fontSize":20}}>
               {this.state.data.first_name} {this.state.data.last_name}
             </BoldText>
           </View>

             <View style={styles.card}>
               <View style={styles.cardBody}>
                 <RegularText>{this.state.data.office}</RegularText>
               </View>
             </View>

             <View style={styles.card}>
               <View style={styles.cardBody}>
                 <RegularText>{this.state.data.title}</RegularText>
               </View>
             </View>

             <View style={styles.card}>
               <View style={styles.cardBody}>
               <TouchableOpacity
                  onPress={() => this._handlePressCall(this.state.data.phone_number)}
                  underlayColor="#eee">
                    <RegularText>{this.state.data.phone_number}</RegularText>
                </TouchableOpacity>
              </View>
             </View>

             <View style={styles.card}>
               <View style={styles.cardBody}>
                 <RegularText>{this.state.data.email}</RegularText>
               </View>
             </View>

             <View style={styles.card}>
               <View style={styles.cardBody}>
                 <RegularText>{this.state.data.bio}</RegularText>
               </View>
             </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    flex: 1
  },
  imagem:{
		width:200,
		height:200,
		marginTop:10,
		borderRadius:100
	},
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  }
});
