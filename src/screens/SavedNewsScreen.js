import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import savedNewsStyle from '../styles/SavedNewsStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SavedNewsScreen() {
    return (
        <SafeAreaView>
            <TitleBar />
            <View style={savedNewsStyle.box}>
                <Text>Saved News</Text>
            </View>
        </SafeAreaView>
    );
}

