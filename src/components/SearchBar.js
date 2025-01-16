import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import searchBarStyle from '../styles/SearchBarStyle';

/*
 marginTop: heightSubmit > submitHightDefault ? heightSubmit - 40 : null
 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
*/

export default SearchBar = () => {
    const [text, setText] = useState('');
    const [filterText, setFilter] = useState('');

    const submitHightDefault = 48;
    const filterHightDefault = 48;

    const [heightSubmit, setHeightSubmit] = useState(submitHightDefault);
    const [heightFilter, setHeightFilter] = useState(filterHightDefault);

    const isLeft = (Dimensions.get('window').width - Dimensions.get('window').height) >= 200;

    const onText = (giveText) => {
        setText(giveText);
    }

    const onFilter = (giveText) => {
        setFilter(giveText);
    }

    const submitSearch = () => {
        //console.log("Search: " + text);
        //console.log("Filter: " + filterText);
        for (let tag of giveText.split(";")) {
            tag
        }
    }
    var maxH = isLeft ? 205 : 120;
    var filterMaxH = isLeft ? 96 : 80;

    return (
        <View style={searchBarStyle.box}>
            <View style={[searchBarStyle.search_box, { height: Math.max(submitHightDefault, heightSubmit) }]}>
                <TextInput style={searchBarStyle.search_text}
                    value={text}
                    multiline={true}
                    onChangeText={onText}
                    placeholder="Search anything..."
                    onContentSizeChange={(event) => {
                        var newH = event.nativeEvent.contentSize.height;
                        if (newH >= maxH) {
                            setHeightSubmit(maxH);
                            return;
                        }
                        setHeightSubmit(newH);
                    }}
                />

                <TouchableOpacity style={searchBarStyle.submit} onPress={submitSearch}>
                    <Text style={searchBarStyle.submit_text}>🔍</Text>
                </TouchableOpacity>
            </View>
                
            <View style={[searchBarStyle.filter_box, { marginTop: heightSubmit - 70 }]}>
                <Text style={searchBarStyle.filter_text}>
                    Filter: Enter tags to filter your result. Spaces are allowed. Seperate them by ;
                </Text>
                <TextInput style={[searchBarStyle.filter_input, {
                    height: Math.max(filterHightDefault, heightFilter)
                }]}
                    value={filterText}
                    multiline={true}
                    onChangeText={onFilter}
                    placeholder="Ex: news;bible study;posts"
                    onContentSizeChange={(event) => {
                        var newH = event.nativeEvent.contentSize.height;
                        if (newH >= filterMaxH) {
                            setHeightFilter(filterMaxH);
                            return;
                        }
                        setHeightFilter(newH);
                    }}
                />
            </View>
            
        </View >

    );
}

