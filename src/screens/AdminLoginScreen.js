import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import adminLoginStyle from '../styles/AdminLoginStyle';
import { LoginAdmin, setAdmin } from '../ServerManager';
import { useNavigation } from '@react-navigation/native';


export default function AdminLoginScreen() {
    const navigation = useNavigation();

    const [Password, setPassword] = useState('');
    const [Username, setUsername] = useState('');
    const [PasswordStats, setPasswordStats] = useState('');


    const submitAdminLogin = async () => {
        var data = await LoginAdmin(Username, Password);
        if (data !== null) {
            setAdmin(data);
            navigation.navigate('AdminPanel');

        } else {
            setPasswordStats("Invalid Username or Password.");
        }
    }

    return (
        <View>
            <TitleBar />
            <View style={adminLoginStyle.box}>

                <Text style={adminLoginStyle.stats}>{PasswordStats}</Text>

                <TextInput style={adminLoginStyle.input}
                    onChangeText={(u) => {
                        setUsername(u)
                    }}
                    value={Username}
                    placeholder="Admin Username" />

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

