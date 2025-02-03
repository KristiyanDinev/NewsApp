import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import TitleBar from '../components/TitleBar';
import contactUsStyle from '../styles/ContactUsStyle'

export default function ContactUsScreen() {
    return (
        <View>
            <TitleBar />
            <View style={contactUsStyle.box}>
                <ScrollView>
                    <Text style={contactUsStyle.title}>Contact Us</Text>

                    <Text style={contactUsStyle.text}></Text>
             </ScrollView>
            </View>
            
        </View>
    );
}

