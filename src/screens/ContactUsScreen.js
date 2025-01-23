import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import contactUsStyle from '../styles/ContactUsStyle'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactUsScreen() {
    return (
        <SafeAreaView>
            <TitleBar />
            <View style={contactUsStyle.box}>
                <Text>Contact Us</Text>
            </View>
        </SafeAreaView>
    );
}

