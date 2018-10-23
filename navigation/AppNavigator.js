import React from 'react';
//import { createSwitchNavigator } from 'react-navigation';

import { createStackNavigator } from 'react-navigation';

//import MainTabNavigator from './MainTabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';


/* USE IF TO IMPLEMENT A TAB NAVIGATOR 
export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator
});
*/

export default createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen
});
