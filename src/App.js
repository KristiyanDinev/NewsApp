import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import OptionsScreen from './screens/OptionsScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';


/*
import HTMLView from 'react-native-htmlview';
 const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;
<HTMLView value={htmlContent} />
<HTMLView value={htmlContent} stylesheet={...}/>
411w 890h - small screen (search bar up)
841w 640h - square (search bar up)
1280w 740h - tablet (search bar left)
*/




const Host = "https://localhost:5001";


const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
    title: ''
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {},
    },
    Options: OptionsScreen,
    AboutApp: AboutAppScreen,
    ContactUs: ContactUsScreen,
    AdminLogin: AdminLoginScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function NewsApp() {
  return (
    <Navigation />
  );
};