import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';



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


export default function NewsApp() {
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  return (
    <View >
      <TitleBar />
      <SearchBar />
    </View >
  );
};