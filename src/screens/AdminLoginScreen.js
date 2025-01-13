import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import adminLoginStyle from '../styles/AdminLoginStyle';
import { CheckAdmin, setAdmin } from '../ServerManager';
import { useNavigation } from '@react-navigation/native';


export default function AdminLoginScreen() {
    const navigation = useNavigation();

    const [Password, setPassword] = useState('');
    const [PasswordStats, setPasswordStats] = useState('');


    const submitAdminLogin = async () => {
        if (Password.includes("&") || Password.includes("=") || Password.includes("\\")) {
            setPasswordStats("Invalid Characters.");
            return;
        }
        var loged = await CheckAdmin(Password);
        if (loged) {
            setAdmin(Password);
            navigation.navigate('AdminPanel');

        } else {
            setPasswordStats("Invalid Password.");
        }
    }

    return (
        <View>
            <TitleBar />
            <View style={adminLoginStyle.box}>

                <Text style={adminLoginStyle.stats}>{PasswordStats}</Text>
                <TextInput style={adminLoginStyle.input}
                    onChangeText={(p) => {
                        setPassword(p)
                    }}
                    value={Password}
                    placeholder="Admin Password" />

                <TouchableOpacity style={adminLoginStyle.submit} onPress={submitAdminLogin}>
                    <Text style={adminLoginStyle.submit_text}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

