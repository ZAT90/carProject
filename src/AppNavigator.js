import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import Carlist from './components/Carlist';
import User from './components/User';
import Settings from './components/Settings';
import SplashScreen from './components/SplashScreen';
import ReservationScreen from './components/carFolder/ReservationScreen';
import CompletedReservations from './components/carFolder/CompletedReservations';
import ActiveReservation from './components/carFolder/ActiveReservation';


const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Cars: Carlist,
    User,
    Settings,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'Settings') {
          iconName = 'ios-settings';
        } else if (routeName === 'Cars') {
          iconName = 'ios-car';
        } else if (routeName === 'User') {
          iconName = 'ios-person';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  },
);
const AppNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Login: {
    screen: Login,
  },

},
{
  headerMode: 'none',
});

const CarNavigator = createStackNavigator({
  Reserve: {
    screen: ReservationScreen,
  },
  CompletedRes: {
    screen: CompletedReservations,
  },
  ActiveRes: {
    screen: ActiveReservation,
  },
}, {
  headerMode: 'none',
});

const StackNavigator = createStackNavigator({

  auth: AppNavigator,
  main: TabNavigator,
  car: CarNavigator,
},
{
  headerMode: 'none',
});

export default StackNavigator;
