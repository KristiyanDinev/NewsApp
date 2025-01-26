import React, { useState } from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import TitleBar from '../components/TitleBar';
import adminNewsEditStyle from '../styles/AdminNewsEditStyle'
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import {EditNews} from '../ServerManager';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminNewsEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {newsP} = route.params;


  var attachPath = []
  if (newsP.attachments_path !== undefined && newsP.thumbnail_path !== undefined) {
     attachPath = newsP.attachments_path.split(';');
     attachPath.push(newsP.thumbnail_path);
  } else {
    attachPath = newsP.allAttchments;
  }

  const [news, setNews] = useState({
    id: newsP.id,
    title: newsP.title,
    tags: newsP.tags,
    bbCode_body: newsP.bbCode_body,
    allAttchments: attachPath,
  });

  var EditValue = {
    Id: newsP.id,

    DeleteThumbnail: newsP.DeleteThumbnail !== undefined ? newsP.DeleteThumbnail : false,
    NewThumbnail: newsP.NewThumbnail !== undefined ? newsP.NewThumbnail : '', // the thumbnail value

    NewAttachments: newsP.NewAttachments !== undefined ? newsP.NewAttachments : '', // the attachment values
    DeleteAttachments: newsP.DeleteAttachments !== undefined ? newsP.DeleteAttachments : '', // the attachment paths

    Title: '',
    Tags: '',
    Body: '',
  };


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
                font-size: 20px;
                color: black;
                margin-top: 15px;
                padding: 20px;
                border-color: rgb(137, 190, 255);
                }

            #save {
              background-color:rgb(91, 235, 108);
                border-radius: 10px;
                font-size: 20px;
                color: black;
                margin-top: 15px;
                padding: 20px;
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
                margin-right: 20px;
            }


        </style>
<center>
        <h1>Editing Post</h1>
        </center>
        <form id="newsForm" onsubmit="await subm(e);">
			<lable>Title:</lable>
			<input type="text" placeholder="Post Title" id="title" value="` +
    news.title +
    `" required>
			<hr>
			<lable>Tags:</lable>
			<input type="text" placeholder="post;bible study;news" id="tags" value="` +
    news.tags +
    `">
			<hr>
			<lable>Body (Using SCEditor under MIT)</lable>
			<textarea id="bbcode" rows="20" cols="45" placeholder="Body for the post..." required>`+news.bbCode_body+`</textarea>
      
			<hr>
      <center>
			<lable>Select Thumbnail (no \\ or / in the file name)</lable>
			<input type="file" accept="image/png,image/jpg,image/jpeg,image/gif" id="thum">
      </center>
			<hr>
      <center>
			<lable>Select Attachments (no \\ or / in the file name)</lable>
			<input type="file" id="p" multiple>
      </center>
      <hr>
      <center>
			<input type="submit" value="Submit"></center>

		</form>
<center>
    <button id="save">Press to save (not in database) Title, Tags and Body. Before removing any files listed bellow.</button>
</center>
    
        <script>
            var textarea = document.getElementById('bbcode');
            sceditor.create(textarea, {
              format: 'bbcode',
              icons: 'monocons',
              plugins: 'autosave,autoyoutube',
              autosave: {
                  storageKey: '1'
              },
              toolbar: 'bold,italic,underline,strike,subscript,superscript,left,center,right|justify,font,size,color,code,cut,copy,paste|horizontalrule,image,link,unlink,youtube,date,time,maximize,source',
              style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/default.min.css'
            });



            document.getElementById("save").addEventListener('click', function() {
              window.ReactNativeWebView.postMessage('title_change:'+document.getElementById("title").value);
              window.ReactNativeWebView.postMessage('tags_change:'+document.getElementById("tags").value);
              window.ReactNativeWebView.postMessage('body_change:'+sceditor.instance(textarea).val());
            });


            var ThumbnailFile = "";
            let fileSelection = document.getElementById("thum");
            fileSelection.addEventListener('change', async function(e) {
                let targetFile = e.target.files[0];
                ThumbnailFile = "";
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
                PDFsData = "";
                for (let i = 0; i < targetFiles.length; i++) {
                    let f = targetFiles[i];
                    PDFsData += f.name + '//';

                    var PDFreader = new FileReader();
                    PDFreader.onload = function() {

                        let array2 = new Uint8Array(PDFreader.result);
                        PDFsData += btoa(array2) + ';';

                    }
                    PDFreader.readAsArrayBuffer(f);
                }
            });

            var subm = async (e) => {
              e.preventDefault();

                window.ReactNativeWebView.postMessage('0'+document.getElementById("title").value);
                window.ReactNativeWebView.postMessage('1'+document.getElementById("tags").value);
                window.ReactNativeWebView.postMessage('2'+document.getElementById("bbcode").value);
                window.ReactNativeWebView.postMessage('3'+PDFsData);
                window.ReactNativeWebView.postMessage('4'+ThumbnailFile);

                window.ReactNativeWebView.postMessage('-');
            }
            let newsForm = document.getElementById("newsForm");
            newsForm.addEventListener("submit", subm);
            
        </script>
    
    `;


  const getHTML_Data = async e => {
    const eventValue = e.nativeEvent.data;
    if (
      eventValue == '-' &&
      EditValue.Title.length > 0 &&
      EditValue.Body.length > 0
    ) {
      var isEdited = await EditNews(EditValue);
      Alert.alert(
        isEdited ? 'Edited: ' + EditValue.Title : "Can't edit this post",
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

    var copyNews = news;
    if (eventValue.startsWith('title_change:')) {
      copyNews.title = eventValue.slice(13);
      setNews(copyNews);
    }

    if (eventValue.startsWith('tags_change:')) {
      copyNews.tags = eventValue.slice(12);
      setNews(copyNews);
    }
    if (eventValue.startsWith('body_change:')) {
      copyNews.bbCode_body = eventValue.slice(12);
      setNews(copyNews);
    }

    const i = Number(eventValue[0]);
    const value = eventValue.slice(1);
    if (i == 0) {
      EditValue.Title = value;

    } else if (i == 1) {
      EditValue.Tags = value;

    } else if (i == 2) {
      EditValue.Body = value;

    } else if (i == 3) {
      EditValue.NewAttachments = value;

    } else if (i == 4) {
      EditValue.NewThumbnail = value;

    }
  };



  const AttComp = ({item, index}) => {
    const isThumbnail = index == news.allAttchments.length -1;
    if (item.length == 0 && !isThumbnail) {
      return;
    }

    const delComp = () => {
      Alert.alert("Do you want to delete this file?",
        item,
        [
          {
            text: 'Yes',
            onPress: () => {
              var newNews = {
                 id: newsP.id,
                  title: news.title,
                  tags: news.tags,
                  bbCode_body: news.bbCode_body,
                  allAttchments: news.allAttchments,
                  DeleteThumbnail: '',
                  DeleteAttachments: '',
              };
              if (isThumbnail) {
                EditValue.DeleteThumbnail = true;
                newNews.allAttchments[index] = "";

              } else {
                EditValue.DeleteAttachments += item + ';';
                
                for (let i in newNews.allAttchments) {
                  if (i === newNews.allAttchments.length -1){
                    break;
                  }
                  if (newNews.allAttchments[i] === item) {
                      newNews.allAttchments[i] = "";
                  }
                }
              }
              newNews.DeleteThumbnail = EditValue.DeleteThumbnail;
              newNews.DeleteAttachments = EditValue.DeleteAttachments;

              navigation.navigate('AdminEditNews', {newsP: newNews});

            },
          },
          {
            text: 'No',
            onPress: () => {},
          },
        ]);
      
    }

    const comp = (
    <View style={adminNewsEditStyle.att_cop}>
        <Text style={adminNewsEditStyle.att_path}>{item}</Text>
        <TouchableOpacity
          style={adminNewsEditStyle.att_button}
          onPress={delComp}>
          <Text style={{fontSize: 20}}>❌</Text>
        </TouchableOpacity>
      </View>);

    return isThumbnail ? 
    
    (
      <View>
        <Text style={{fontSize: 25, 
              padding: 10, margin: 10,
               textAlign: 'center'}}>Current Thumbnail</Text>
    
        {item.length == 0 ? (<View></View>) : comp}
      </View>
    ) : comp;
  }


  return (
    <SafeAreaView>
      <TitleBar />

      <FlatList
        style={{ backgroundColor: 'rgb(137, 190, 255)'}}
        data={news.allAttchments}
        renderItem={AttComp}
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <View contentContainerStyle={adminNewsEditStyle.box}>
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
            <Text style={{fontSize: 25, 
              padding: 10, margin: 10,
               textAlign: 'center'}}>Current Attachments</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{height: 300}}></View>
        )}
      />
    </SafeAreaView>
  );
}

