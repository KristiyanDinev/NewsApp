import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import searchBarStyle from './styles/SearchBarStyle';



const SearchBar = () => {
    const [text, setText] = useState('');
    const [height2, setHeight] = useState(48);

    const onText = (giveText) => {
        setText(giveText);
    }

    const submitSearch = () => {
        console.log(text);
    }

    return (
        <View style={searchBarStyle.box}>
            <View style={[searchBarStyle.search_box, { height: Math.max(48, height2) }]}>
                <TextInput style={searchBarStyle.search_text}
                    value={text}
                    multiline={true}
                    onChangeText={onText}
                    placeholder="Search anything..."
                    onContentSizeChange={(event) => {
                        setHeight(event.nativeEvent.contentSize.height + 3);
                        }
                    }
                />

                <TouchableOpacity style={searchBarStyle.submit} onPress={submitSearch}>
                    <Text style={searchBarStyle.submit_text}>🔍</Text>
                </TouchableOpacity>
            </View>
        </View >

    );
}

export default SearchBar;
