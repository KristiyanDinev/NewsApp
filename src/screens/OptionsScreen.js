import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TitleBar from '../components/TitleBar';
import optionsStyle from '../styles/OptionsStyle';

export default function OptionsScreen() {
    const navigation = useNavigation();

    return (
        <View >
            <TitleBar />
            
                <FlatList contentContainerStyle={optionsStyle.box}
                ListHeaderComponent={() => (
                    <View>
                        <TouchableOpacity style={optionsStyle.button} onPress={() => {
                            navigation.navigate('AboutApp');
                        }}>
                            <Text style={optionsStyle.button_text}>About the app</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={optionsStyle.button} onPress={() => {
                            navigation.navigate('ContactUs');
                        }}>
                            <Text style={optionsStyle.button_text}>Contact us</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={optionsStyle.button} onPress={() => {
                            navigation.navigate('SavedNews');
                        }}>
                            <Text style={optionsStyle.button_text}>Saved News</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={optionsStyle.button} onPress={() => {
                            navigation.navigate('AdminLogin');
                        }}>
                            <Text style={optionsStyle.button_text}>Admin Login</Text>
                        </TouchableOpacity>
                        <View style={optionsStyle.scroll_view_fix}></View>
                    </View>
                )}
                    
            />
            
        </View >
    );
}

