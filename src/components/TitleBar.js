import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import titleBarStyle from '../styles/TitleBarStyle';

export default function TitleBar() {
    const navigation = useNavigation();
    const route = useRoute();
    var AllowedRoutsToReturn = ["Options", "AdminLogin", "AboutApp", 
        "ContactUs", "AdminPanel", "AdminEditNews", "News", "Search"]
    return (
        <View style={titleBarStyle.box}>

            <Text style={titleBarStyle.title}>News / Posts / Studies</Text>

            <TouchableOpacity style={titleBarStyle.menu} onPress={() => {
                if (AllowedRoutsToReturn.includes(route.name)) {
                    navigation.goBack()
                } else {
                    navigation.navigate('Options')
                }
            }}>
                <Text style={titleBarStyle.menu_text}>☰</Text>
            </TouchableOpacity>

        </View >

    );
}
