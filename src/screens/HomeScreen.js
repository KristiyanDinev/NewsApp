import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import { useNavigation } from '@react-navigation/native';
import homeStyle from '../styles/HomeStyle'

export default function HomeScreen() {
    const navigation = useNavigation();

    const [text, setText] = useState('');

    const submitSearch = async () => {
    }

    const filterSearchButton = () => {
        navigation.navigate('Search');
        // Go back to Home screen when  click button in SearchScreen
    }

    return (
        <View>
            <TitleBar />
            <View style={homeStyle.box}>
                <View style={homeStyle.search_box}>
                    <TextInput style={homeStyle.search_text}
                        value={text}
                        multiline={true}
                        onChangeText={setText}
                        placeholder="Search anything..."
                    />

                    <TouchableOpacity style={homeStyle.submit} onPress={submitSearch}>
                        <Text style={homeStyle.submit_text}>🔍</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={homeStyle.button} onPress={filterSearchButton}>
                    <Text style={homeStyle.text}>☰ Filter Search</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

