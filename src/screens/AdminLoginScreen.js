import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import adminLoginStyle from '../styles/AdminLoginStyle';
import { CheckAdmin } from '../ServerManager';
import HTMLView from 'react-native-htmlview';


export default function AdminLoginScreen() {
    const [Password, setPassword] = useState('');


    const submitAdminLogin = async () => {
        CheckAdmin(Password);
        
    }

    return (
        <View>
            <TitleBar />
            <View style={adminLoginStyle.box}>
                <TextInput style={adminLoginStyle.input}
                    onChangeText={setPassword}
                    value={Password}
                    placeholder="Admin Password" />

                <TouchableOpacity style={adminLoginStyle.submit} onPress={submitAdminLogin}>
                    <Text style={adminLoginStyle.submit_text}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

