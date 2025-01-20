import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import searchStyle from '../styles/SearchStyle'

export default function SearchScreen() {
    const [text, setText] = useState('');
    const [filterText, setFilter] = useState('');
    const [authorsText, setAuthorsText] = useState('');

    const submitSearch = async () => {
        console.log(text);
        console.log(filterText);
        console.log(authorsText);
    }

    return (
        <View>
            <TitleBar />
            <View style={searchStyle.box}>
                <View style={searchStyle.search_box}>
                    <TextInput style={searchStyle.search_text}
                        value={text}
                        multiline={true}
                        onChangeText={setText}
                        placeholder="Search anything..."
                    />

                    <TouchableOpacity style={searchStyle.submit} onPress={submitSearch}>
                        <Text style={searchStyle.submit_text}>🔍</Text>
                    </TouchableOpacity>
                </View>

                <View style={searchStyle.filter_box}>
                    <Text style={searchStyle.filter_text}>
                        Filter: Enter tags to filter your result. Spaces are allowed. Seperate them by ;
                    </Text>
                    <TextInput style={searchStyle.filter_input}
                        value={filterText}
                        multiline={true}
                        onChangeText={setFilter}
                        placeholder="Ex: news;bible study;posts"
                    />
                </View>

                <View style={searchStyle.filter_box}>
                    <Text style={searchStyle.filter_text}>
                        Enter usernames of authors to get only their posts. Spaces are allowed. Seperate them by ;
                    </Text>
                    <TextInput style={searchStyle.filter_input}
                        value={authorsText}
                        multiline={true}
                        onChangeText={setAuthorsText}
                        placeholder="Ex: Ema;Boby"
                    />
                </View>
            </View>
        </View>
    );
}

