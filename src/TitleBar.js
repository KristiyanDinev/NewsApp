import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import titleBarStyle from './styles/TitleBarStyle';

const TitleBar = () => {
    return (
        <View style={titleBarStyle.box}>

            <Text style={titleBarStyle.title}>News / Posts / Studies</Text>

            <TouchableOpacity style={titleBarStyle.menu} onPress={() => {

                console.log("pressed")

            }}>
                <Text style={titleBarStyle.menu_text}>☰</Text>
            </TouchableOpacity>

        </View >

    );
}

export default TitleBar;