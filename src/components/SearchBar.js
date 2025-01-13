import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import searchBarStyle from '../styles/SearchBarStyle';

/*
 marginTop: heightSubmit > submitHightDefault ? heightSubmit - 40 : null
 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
*/

const SearchBar = () => {
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

export const SearchBarSimple = (submitSearch, text, onText, filterText, onFilter) => {
    const submitHightDefault = 48;
    const filterHightDefault = 48;
    var maxH = 120;
    var filterMaxH =  80;
    const [heightSubmit, setHeightSubmit] = useState(submitHightDefault);
    const [heightFilter, setHeightFilter] = useState(filterHightDefault);


    return (
        <View style={{
            backgroundColor: "rgb(137, 190, 255)",
            padding: 20,
            alignItems: 'center',
        }}>
            <View style={{

                height: Math.max(submitHightDefault, heightSubmit), 
                borderColor: "rgb(51, 145, 253)",
                borderRadius: 20,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 3,
                borderStyle: 'solid',
                backgroundColor: "rgb(234, 243, 253)",
                width: 170,
                maxWidth: 170, 
                
                }}>
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

            <View style={{alignItems: 'center', 
                marginTop: heightSubmit}}>
                <Text style={searchBarStyle.filter_text}>
                    Filter: Enter tags to filter your result. Spaces are allowed. Seperate them by ;
                </Text>
                <TextInput style={{
                    height: Math.max(filterHightDefault, heightFilter),
                    borderColor: "rgb(104, 131, 165)",
                    borderRadius: 5,
                    borderWidth: 3,
                    borderStyle: 'solid',
                    backgroundColor: "rgb(236, 236, 236)",
                    width: 200,
                    maxWidth: 200,
                    marginTop: 15,
                    maxHeight: filterMaxH,
                    textAlign: 'left',
                    fontSize: 15,
                }}
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

export default SearchBar;
