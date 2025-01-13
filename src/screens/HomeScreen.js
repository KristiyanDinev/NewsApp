import React from 'react';
import { View } from 'react-native';
import TitleBar from '../components/TitleBar';
import SearchBar from '../components/SearchBar';


export default function HomeScreen() {

    return (
        <View>
            <TitleBar />
            <SearchBar />
        </View>
    );
}

