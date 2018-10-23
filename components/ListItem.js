import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Platform, StyleSheet } from 'react-native';

import Image from 'react-native-image-progress';


export default class ListItem extends Component {

	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
	}

  componentDidMount() {


  }

  static navigationOptions = {
    title: 'Realtor Profile',
  };

	click() {
		//alert("Clicou para abrir a conversa: "+this.props.data.id);
    //console.log(this.props.data.id);
    this.props.navigation.navigate('Details', {
      id: this.props.data.id,
      otherParam: 'Realtor Profile'
    });

		//console.log(this.props.data.id);
	}

	render() {

		return (
      (!!this.props.data.first_name &&
        <TouchableHighlight onPress={this.click} underlayColor="#CCCCCC">
  				<View style={styles.item}>

						{(this.props.data.photo ?
  					<Image source={{uri: this.props.data.photo}} style={{width:40, height:40, marginTop:10}} imageStyle={styles.imagem} />
						: ''
						)}
  					<View style={styles.info}>
  						<Text numberOfLines={1} style={styles.nome}>{this.props.data.first_name} {this.props.data.last_name}</Text>
  						<Text numberOfLines={1} style={styles.msg}>{this.props.data.phone_number}</Text>
  					</View>
  				</View>
  			</TouchableHighlight>
      )
		);
	}

}

const styles = StyleSheet.create({
	item:{
		height:60,
		marginLeft:10,
		marginRight:10,
		borderBottomWidth:1,
		borderColor:'#CCCCCC',
		flex:1,
		flexDirection:'row'
	},
	imagem:{
		borderRadius:20
	},
	info:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		marginLeft:10
	},
	nome:{
		fontSize:15,
		fontWeight:'bold'
	}
});
