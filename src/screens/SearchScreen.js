import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import TitleBar from '../components/TitleBar';
import searchStyle from '../styles/SearchStyle'
import { useNavigation } from '@react-navigation/native';
import { SearchNews } from '../ServerManager'

export default function SearchScreen() {
    const navigation = useNavigation();

    const [text, setText] = useState('');
    const [filterText, setFilter] = useState('');
    const [authorsText, setAuthorsText] = useState('');

    const submitSearch = async () => {
        if (
               text.length == 0 &&
               filterText.length == 0 &&
               authorsText.length == 0
             ) {
               return;
             }
             var data = await SearchNews(text, filterText, authorsText, 1, 10);
             if (data.News == null) {
               return;
             }
            navigation.navigate('Home', {
              newsDataP: {1: data.News}, page: 1,
              search: text, tags: filterText, authors: authorsText
            });
    }

    return (
      <View>
        <TitleBar />
        <ScrollView contentContainerStyle={searchStyle.box}>
          <View style={searchStyle.search_box}>
            <TextInput
              style={searchStyle.search_text}
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
            <TextInput
              style={searchStyle.filter_input}
              value={filterText}
              multiline={true}
              onChangeText={setFilter}
              placeholder="Ex: news;bible study;posts"
            />
          </View>

          <View style={searchStyle.filter_box}>
            <Text style={searchStyle.filter_text}>
              Enter usernames of authors to get only their posts. Spaces are
              allowed. Seperate them by ;
            </Text>
            <TextInput
              style={searchStyle.filter_input}
              value={authorsText}
              multiline={true}
              onChangeText={setAuthorsText}
              placeholder="Ex: Ema;Boby"
            />
          </View>
        </ScrollView>
      </View>
    );
}

