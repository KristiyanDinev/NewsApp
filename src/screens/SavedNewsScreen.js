import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import TitleBar from '../components/TitleBar';
import savedNewsStyle from '../styles/SavedNewsStyle';
import { getFevNews, GetNewsByID } from '../ServerManager';
import { useNavigation } from '@react-navigation/native';
import homeStyle from '../styles/HomeStyle';



export default function SavedNewsScreen() {
    const navigation = useNavigation();

    const [listOfNews, setNews] = useState([]);
    var num = 0;

    useEffect(() => {
        const loadF = async () => {
            const savedNews = await getFevNews();
            setNews(savedNews.split(';'));
        }
        loadF();
    }, []);

    
    const NewsComp = async ({ item, index }) => {
        if (item.length === 0) {
            return null;
        }

        const item2 = await GetNewsByID(item);
        if (item2.News === null) {
            return null;
        }
        
        const _NewsData = item2.News;
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
            comp.push((<View>

                <FlatList style={{ flexDirection: 'row' }}
                    data={arrOfArr[x]}
                    renderItem={({ item3 }) =>
                        item3.length > 0 ? <Text style={homeStyle.news_tags} key={num++}>{item3}</Text> : null
                    }
                    keyExtractor={(item5, index) => {
                        num += 1
                        return num.toString()
                    }}
                />
            </View>));
        }

        return (<View>
            <TouchableOpacity style={homeStyle.news_view1} onPress={openNews}>
                <View style={{ alignItems: 'center', }}>
                    {_NewsData.thumbnail_path.length > 0 ?
                        <ScaledImage width={Dimensions.get('window').width * 0.8} uri={GetFileURL(_NewsData.thumbnail_path)} />
                        : null}

                    <Text style={homeStyle.news_text}>{_NewsData.title}</Text>

                    <FlatList
                        data={comp}
                        renderItem={({ item4 }) => item4}
                    />
                </View>

                <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                    <Text style={homeStyle.news_author}>Posted By: {_NewsData.posted_by_Admin_username}</Text>
                    <Text style={homeStyle.news_author}>Posted on: {new Date(_NewsData.posted_on).toLocaleString()}</Text>

                </View>

                <Text style={{ textAlign: 'center', margin: 20, fontSize: 23 }}>⭐</Text>

            </TouchableOpacity>
        </View>
        );
    }

/*
<FlatList
                    style={{ backgroundColor: "rgb(137, 190, 255)"}}
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

    return (
        <View>
            <TitleBar />
            <View style={savedNewsStyle.box}>
                {listOfNews.map(async (v, i) => {

                    const c = await NewsComp({ v, i })
                    return c;
                })}
                
            </View>
        </View>
    );
}

