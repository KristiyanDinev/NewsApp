import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import contactUsStyle from '../styles/ContactUsStyle'

export default function ContactUsScreen() {
    return (
        <View>
            <TitleBar />
            <View style={contactUsStyle.box}>
                <Text>Contact Us</Text>
            </View>
        </View>
    );
}

