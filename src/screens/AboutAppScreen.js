import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import aboutAppStyle from '../styles/AboutAppStyle'

export default function AboutAppScreen() {
    return (
        <View>
            <TitleBar />
            <View style={aboutAppStyle.box}>
                <Text>About the app</Text>
            </View>
        </View>
    );
}

