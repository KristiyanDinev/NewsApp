import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import savedNewsStyle from '../styles/SavedNewsStyle';

export default function SavedNewsScreen() {
    return (
        <View>
            <TitleBar />
            <View style={savedNewsStyle.box}>
                <Text>Saved News</Text>
            </View>
        </View>
    );
}

