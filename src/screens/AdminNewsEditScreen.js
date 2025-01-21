import React from 'react';
import { ScrollView, View } from 'react-native';
import TitleBar from '../components/TitleBar';
import adminNewsEditStyle from '../styles/AdminNewsEditStyle'
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import {EditNews} from '../ServerManager';

export default function AdminNewsEditScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { news } = route.params;
    console.log(news);
    // {"htmL_body": "c", "id": 7, "pdF_path": "", "posted_by_Admin_username": null, "posted_on_UTC_timezoned": "2025-01-19T14:13:00", "tags": "3", "thumbnail_path": "", "title": "c"}
    const htmlEditor =
      `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/default.min.css" id="theme-style" />
    
     <script src="https://cdn.jsdelivr.net/npm/sceditor@3/minified/sceditor.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sceditor@3/minified/icons/monocons.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/bbcode.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/sceditor@3/minified/formats/xhtml.js"></script>
    
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    
            <style>
    
                input[type=button], input[type=submit], input[type=reset], button[type=submit] {
                    background-color:rgb(39, 108, 188);
                    border-radius: 10px;
                    font-size: 15px;
                    color: black;
                    margin-top: 15px;
                    padding: 20px;
                    border-color: rgb(137, 190, 255);
                    }
    
                input[type=file] {
                        font-size: 15px;
                        padding: 5px;
                        margin-bottom: 20px;
                    }
    
    
                input[type=text] {
                    padding: 10px;
                    margin: 20px;
                    border: 2px solid black;
                    border-radius: 5px;
                    font-size: 15px;
                    }
    
                lable {
                    font-size: 20px;
                }
    
            </style>
    
    <center>
        <h3>Editing Post</h3>

            <form id="newsForm">
                <lable>Title:</lable>
                <input name="Title" type="text" placeholder="Post Title" id="title" value="` +
      news.title +
      `">
                <hr>
                <lable>Tags:</lable>
                <input name="Tags" type="text" placeholder="post;bible study;news" id="tags" value="` +
      news.tags +
      `">
                <hr>
                <lable>Body (Using SCEditor under MIT)</lable>
                <textarea name="HTML_body" id="example" rows="20" cols="50">` +
      news.htmL_body +
      `</textarea>
                <hr>
                <lable>Select Thumbnail</lable>
                <input name="ThumbnailFile" type="file" accept="image/png,image/jpg,image/jpeg,image/svg,image/apng" id="thum">
                <hr>
                <lable>Select PDFs</lable>
                <input name="PDFs" type="file" accept="application/pdf" id="p" multiple>
                <hr>
                <input type="submit" value="Submit">
    
            </form><center>
            <script>
                var textarea = document.getElementById('example');
                sceditor.create(textarea, {
                    format: 'bbcode',
                    icons: 'monocons',
                    toolbar: 'bold,italic,underline,strike,subscript,superscript,left,center,right|justify,font,size,color,code,cut,copy,paste|horizontalrule,image,link,unlink,youtube,date,time,maximize,source',
                    style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/default.min.css'
                });
    
    
                var ThumbnailFile = "";
                let fileSelection = document.getElementById("thum");
                fileSelection.addEventListener('change', async function(e) {
                    let targetFile = e.target.files[0];
                    if (targetFile) {
                        
                        ThumbnailFile += targetFile.name + ';';
    
                        var ThumbnailReader = new FileReader();
                        ThumbnailReader.onload = function() {
    
                            let array1 = new Uint8Array(ThumbnailReader.result);
                            ThumbnailFile += btoa(array1);
    
                        }
                        ThumbnailReader.readAsArrayBuffer(targetFile);
                    }            
                });
    
                var PDFsData = "";
                let fileSelection1 = document.getElementById("p");
                fileSelection1.addEventListener('change', function(e) {
                    let targetFiles = e.target.files;
                    for (let i = 0; i < targetFiles.length; i++) {
                        let f = targetFiles[i];
                        PDFsData += f.name;
    
                        var PDFreader = new FileReader();
                        PDFreader.onload = function() {
    
                            let array2 = new Uint8Array(PDFreader.result);
                            PDFsData += btoa(array2) + ';';
    
                        }
                        PDFreader.readAsArrayBuffer(f);
                    }
                });
    
                let newsForm = document.getElementById("newsForm");
                newsForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    
                    window.ReactNativeWebView.postMessage('0'+document.getElementById("title").value);
                    window.ReactNativeWebView.postMessage('1'+document.getElementById("tags").value);
                    window.ReactNativeWebView.postMessage('2'+document.getElementById("example").value);
                    window.ReactNativeWebView.postMessage('3'+PDFsData);
                    window.ReactNativeWebView.postMessage('4'+ThumbnailFile);

                    window.ReactNativeWebView.postMessage('-');
                });
                
            </script>
        
        `;

    var EditData = [];
    const getHTML_Data = async (e) => {
            const eventValue = e.nativeEvent.data;
            if (
              eventValue == '-' &&
              PostData.length == 5 &&
              EditData[0].length > 0 &&
              EditData[2].length > 0
            ) {
              var isEdited = await EditNews(EditData);
              Alert.alert(
                isEdited ? 'Edited: ' + EditData[0] : "Can't edit this post",
                '',
                [
                  {
                    text: 'Ok',
                    onPress: () => {},
                  },
                ],
              );
              return;
            }
            const i = Number(eventValue[0]);
            const value = eventValue.slice(1);
            EditData[i] = value;
        }


    return (
      <View>
        <TitleBar />
        <ScrollView contentContainerStyle={adminNewsEditStyle.box}>
          <WebView
            source={{html: htmlEditor}}
            style={adminNewsEditStyle.webview}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={false}
            scrollEnabled={true}
            onMessage={getHTML_Data}
          />
        </ScrollView>
      </View>
    );
}

