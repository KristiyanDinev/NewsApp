import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import titleBarStyle from '../styles/TitleBarStyle';

export default function TitleBar() {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View style={titleBarStyle.box}>

            <Text style={titleBarStyle.title}>News / Posts / Studies</Text>

            <TouchableOpacity style={titleBarStyle.menu} onPress={() => {
                if ('Home' === route.name) {
                    navigation.navigate('Options')
                } else {
                    navigation.goBack()
                }
            }}>
                <Text style={titleBarStyle.menu_text}>☰</Text>
            </TouchableOpacity>

        </View >

    );
}
