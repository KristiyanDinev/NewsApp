import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import TitleBar from '../components/TitleBar';
import homeStyle from '../styles/HomeStyle'
import { useNavigation, useRoute } from '@react-navigation/native';
import { GetFileURL, SearchNews } from '../ServerManager';
import ScaledImage from '../components/ScaledImage';

export default function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const newsDataP = route.params?.newsDataP ?? {}  // page : key | [news] : value

    const searchText = route.params?.search ?? '';
    const searchTags = route.params?.tags ?? '';
    const searchAuthors = route.params?.authors ?? '';

    const page = route.params?.page ?? 1

    const [text, setText] = useState('');

    var amountPerPage = 10;

    const currentListOfNews = newsDataP[String(page)];

    const submitSearch = async () => {
        if (text.length == 0) {
            return;
        } 
        let data = await SearchNews(text, '', '', 1, amountPerPage);
        if (data.News == null) {
            return;
        }
        navigation.navigate('Home', {
            newsDataP: {
                1: data.News
            }, page: 1, 
            search: text, tags: '', authors: ''});
    }

    const filterSearchButton = () => {
        navigation.navigate('Search');
    }

    const PageControllComp = () => {
        const goForward = async () => {
            if (text.length == 0 || newsDataP[page].length < amountPerPage) {
                return;
            }
            let newPage = page + 1;
            let data = await SearchNews(searchText, searchTags, searchAuthors, newPage, amountPerPage);

            if (data.News == null) {
                return;
            }
            let someNewsData = {};
            for (var i in newsDataP)
                someNewsData[i] = newsDataP[i];
            someNewsData[newPage] = data.News;
            navigation.navigate('Home', { newsDataP: someNewsData, page: newPage, 
                search: searchText, tags: searchTags, authors: searchAuthors });
        }

        const goBack = async () => {
            navigation.navigate('Home', { newsDataP: newsDataP, page: page - 1, 
                search: searchText, tags: searchTags, authors: searchAuthors
            });
        }

        return (
            searchText.length > 0 ? <View style={homeStyle.page_view}>
                {page > 1 ? <TouchableOpacity onPress={goBack}>
                    <Text style={homeStyle.page_text}> ◀ Page {page - 1} </Text></TouchableOpacity>
                    : null}


                <Text style={homeStyle.cur_page_text}> Page {page} </Text>

                <TouchableOpacity onPress={goForward}>
                    <Text style={homeStyle.page_text}> Page {page + 1} ▶ </Text>
                </TouchableOpacity>


            </View>
            :
                null
            
        );
    }

    var num = 0;

    const NewsComp = ({item, index}) => {
        const openNews = async () => {
            navigation.navigate('News', {
                newsData: item
            });
        }

        let tagsArray = item.tags.length > 0 ? item.tags.split(";") : [];
        let arrOfArr = [];
        let tempArr = [];
        let count = 0;
        for (let index in tagsArray) {
            count += 1;
            
            if (count == 4 || Number(index)  === Number(tagsArray.length-1)) {
                count = 0;
                tempArr.push(tagsArray[index]);
                arrOfArr.push(tempArr);
                tempArr = [];
                continue;
            }

            tempArr.push(tagsArray[index]);
        }

        let comp = [];
        for (let x in arrOfArr) {
            comp.push((<View>
                
                <FlatList style={{ flexDirection: 'row' }}
                    data={arrOfArr[x]}
                    renderItem={({ item }) =>
                        item.length > 0 ? <Text style={homeStyle.news_tags} key={num++}>{item}</Text> : null
                    }
                    keyExtractor={(item, index) => {
                        num += 1
                        return num.toString()
                    }}
                />
                </View>));
        }

        return (<View>
            <TouchableOpacity style={homeStyle.news_view1} onPress={openNews}>
                <View style={{ alignItems: 'center', }}>
                    {item.thumbnail_path.length > 0 ?
                    <ScaledImage width={Dimensions.get('window').width * 0.8} uri={GetFileURL(item.thumbnail_path)} />
                : null}

                <Text style={homeStyle.news_text}>{item.title}</Text>
                
                <FlatList
                    data={comp}
                    renderItem={({ item }) => item }
                />
                </View>
                
                <View style={{alignItems: 'flex-start', marginLeft: 10}}>
<Text style={homeStyle.news_author}>Posted By: {item.posted_by_Admin_username}</Text>
                <Text style={homeStyle.news_author}>Posted on: {new Date(item.posted_on).toLocaleString()}</Text>
                </View>
                

            </TouchableOpacity>
            {Number(index) === Number(currentListOfNews.length-1) ? 
            <View style={{height: 200}}></View> : null}
            </View>
        );
    }

    return (
        <View>
            <TitleBar />
            <View style={homeStyle.box}>
                <View style={homeStyle.search_box}>
                    <TextInput style={homeStyle.search_text}
                        value={text}
                        multiline={true}
                        onChangeText={setText}
                        placeholder="Search anything..."
                    />

                    <TouchableOpacity style={homeStyle.submit} onPress={submitSearch}>
                        <Text style={homeStyle.submit_text}>🔍</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={homeStyle.button} onPress={filterSearchButton}>
                    <Text style={homeStyle.text}>☰ Filter Search</Text>
                </TouchableOpacity>
                <PageControllComp />

                <FlatList
                    style={homeStyle.news_list}
                    data={currentListOfNews}
                    renderItem={NewsComp}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    
                />
                
                
            </View>
        </View>
    );
}

