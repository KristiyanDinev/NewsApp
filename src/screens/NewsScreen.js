import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import TitleBar from '../components/TitleBar';
import newsStyle from '../styles/NewsStyle';
import homeStyle from '../styles/HomeStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

export default function NewsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { newsData } = route.params;

    let tagsArray = newsData.tags.length > 0 ? newsData.tags.split(";") : [];
    let arrOfArr = [];
    let tempArr = [];
    let count = 0;
    for (let index in tagsArray) {
        count += 1;

        if (count == 4 || Number(index) === Number(tagsArray.length - 1)) {
            count = 0;
            tempArr.push(tagsArray[index]);
            arrOfArr.push(tempArr);
            tempArr = [];
            continue;
        }

        tempArr.push(tagsArray[index]);
    }
    var num = 0;
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


    let attachments = newsData.attachments_path.length > 0 ? newsData.attachments_path.split(';') : []
    const renderAttachment = ({v, i}) => {
        return (
            <View>
                <Text>{v}</Text>
            </View>
        );
    }


    return (
        <View>
            <TitleBar />
            <View>

                    <FlatList
                        data={attachments}
                        renderItem={renderAttachment}
                        scrollEnabled={true}
                    persistentScrollbar={true}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => index.toString()}

                        ListHeaderComponent={() => (
                            <View style={newsStyle.box}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <Text style={{ fontSize: 23, margin: 10 }}>{newsData.title}</Text>
                                
                                    <FlatList data={comp} renderItem={({ item }) => item} />

                                </View>

                                <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                                    <Text style={homeStyle.news_author}>Posted by: {newsData.posted_by_Admin_username}</Text>
                                <Text style={homeStyle.news_author}>Posted on: {new Date(newsData.posted_on).toLocaleString()}</Text>
                                
                                </View>

                                <WebView
                                    source={{
                                        html: newsData.htmL_body}}
                                    style={[newsStyle.webview, 
                                        { height: newsData.htmL_body.split('\n').length * 50}]}
                                    originWhitelist={['*']}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    startInLoadingState={true}
                                    scalesPageToFit={false}
                                    scrollEnabled={true}
                                />
                            </View>

    )}

                        ListFooterComponent={() => (
                            <View style={newsStyle.attachments_view}>
                                <Text style={newsStyle.attachments_text}>Attachments. Feel free do download and use any of them. ❤️❤️❤️</Text>
                            </View>
                        )}
                    />
            </View>
        </View>
    );
}

