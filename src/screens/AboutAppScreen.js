import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import aboutAppStyle from '../styles/AboutAppStyle'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutAppScreen() {
    return (
        <SafeAreaView>
            <TitleBar />
            <View style={aboutAppStyle.box}>
                <Text>About the app</Text>
            </View>
        </SafeAreaView>
    );
}

