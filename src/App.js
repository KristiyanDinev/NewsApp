import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TitleBarStyle from './styles/Styles';

const TitleBar = () => {
  return (
    <View style={TitleBarStyle.box}>

      <Text style={TitleBarStyle.title}>News / Posts / Studies</Text>

      <TouchableOpacity style={TitleBarStyle.menu} onPress={() => {
        
        console.log("pressed")
        
        }}>
        <Text style={TitleBarStyle.menu_text}>☰</Text>
      </TouchableOpacity>

    </View >

  );
}

const Host = "https://localhost:5001";

const NewsApp = () => {
  return (
    <View >
      <TitleBar/>
    </View >
  );
};


export default NewsApp;
