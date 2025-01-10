import React from 'react';
import { View, Text } from 'react-native';
import TitleBar from '../components/TitleBar';
import adminLoginStyle from '../styles/AdminLoginStyle'

export default function AdminLoginScreen() {
    return (
        <View>
            <TitleBar />
            <View style={adminLoginStyle.box}>
                <Text>Admin Login</Text>
            </View>
        </View>
    );
}

