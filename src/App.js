import React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import OptionsScreen from './screens/OptionsScreen';
import AboutAppScreen from './screens/AboutAppScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import SavedNewsScreen from './screens/SavedNewsScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import AdminNewsEditScreen from './screens/AdminNewsEditScreen';
import SearchScreen from './screens/SearchScreen';
import NewsScreen from './screens/NewsScreen';


/*
411w 890h - small screen (search bar up)
841w 640h - square (search bar up)
1280w 740h - tablet (search bar left)
*/



const Navigation = createStaticNavigation(createNativeStackNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false,
    title: '',
  },
  screens: {
    Home: HomeScreen,
    Options: OptionsScreen,
    AboutApp: AboutAppScreen,
    ContactUs: ContactUsScreen,
    AdminLogin: AdminLoginScreen,
    SavedNews: SavedNewsScreen,
    AdminPanel: AdminPanelScreen,
    AdminEditNews: AdminNewsEditScreen,
    Search: SearchScreen,
    News: NewsScreen,
  },
}));

export default function NewsApp() {
  return (
      <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
    
    
  );
};
