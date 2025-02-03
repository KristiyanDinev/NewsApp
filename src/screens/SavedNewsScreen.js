import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import savedNewsStyle from '../styles/SavedNewsStyle';
import { getFevNews, GetNewsByID, GetFileURL } from '../ServerManager';
import { useNavigation, useRoute } from '@react-navigation/native';
import homeStyle from '../styles/HomeStyle';
import ScaledImage from '../components/ScaledImage';



export default function SavedNewsScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { listOfNews } = route.params;

    var num = 0;

    
    const NewsComp = ( {item, index} ) => {
        const _NewsData = item;
        const openNews = () => {
            navigation.navigate('News', {
                newsData: _NewsData
            });
        }

        let tagsArray = _NewsData.tags.length > 0 ? _NewsData.tags.split(";") : [];
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

        let comp = [];
        for (let x in arrOfArr) {
            comp.push((<View style={{ flexDirection: 'row' }} key={++num}>

                {arrOfArr[x].map((v, i) => v.length > 0 ? <Text style={homeStyle.news_tags} key={++num}>{v}</Text> 
                    : <View key={++num}></View>)}

            </View>));
        }

    /*
    <FlatList style={{ flexDirection: 'row' }}
                    data={arrOfArr[x]}
                    renderItem={({ item3 }) => {
                        console.log("tag: "+item3);
                        return item3.length > 0 ? <Text style={homeStyle.news_tags} key={num++}>{item3}</Text> : null
                    }}
                />
    */

        /*
        <FlatList
                        data={comp}
                        renderItem={({ item4 }) => item4}
                    />

                    */

        return (<View key={index.toString()}>
            <TouchableOpacity style={homeStyle.news_view1} onPress={openNews}>
                <View style={{ alignItems: 'center' }}>
                    {_NewsData.thumbnail_path.length > 0 ?
                        <ScaledImage width={Dimensions.get('window').width * 0.8} uri={GetFileURL(_NewsData.thumbnail_path)} />
                        : null}

                    <Text style={homeStyle.news_text}>{_NewsData.title}</Text>

                    {comp.map((v, i) => v)}
                </View>

                <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                    <Text style={homeStyle.news_author}>Posted By: {_NewsData.posted_by_Admin_username}</Text>
                    <Text style={homeStyle.news_author}>Posted on: {new Date(_NewsData.posted_on).toLocaleString()}</Text>

                </View>

                <Text style={{ textAlign: 'center', margin: 20, fontSize: 23 }}>⭐</Text>

            </TouchableOpacity>
            {Number(index) === Number(listOfNews.length-1) ? 
                        <View style={{height: 200}}></View> : null}
        </View>
        );
    }

/*
<FlatList
                style={homeStyle.news_list}
                data={listOfNews}
                renderItem={NewsComp}
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}

            />
                */

                /*
                {listOfNews.map(async (v, i) => {

                    const c = await NewsComp({ v, i })
                    return c;
                })}
                    
                */

    //{ listOfNews.map(async (v, i) => await NewsComp({ v, i })) }
    // {listOfNews.map((v, i) => NewsComp(v, i))}
    return (
        <View>
            <TitleBar />
            <View style={savedNewsStyle.box}>
                <Text style={savedNewsStyle.saved_text}>Saved News</Text>

                <FlatList style={savedNewsStyle.news_list}
                    data={listOfNews} 
                    renderItem={NewsComp}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    />
            </View>
                
        </View>
    );
}

