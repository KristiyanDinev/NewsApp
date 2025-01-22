import React, {useState} from 'react';
import {
  ScrollView,
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

export default function AdminNewsEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {newsP} = route.params;

  const [news, setNews] = useState({
    id: newsP.id,
    title: newsP.title,
    tags: newsP.tags,
    bbCode_body: newsP.bbCode_body,
    thumbnail_path: '',
    attachments_path: '',
  });

  const [attachments, setAttachments] = useState(newsP.attachments_path.split(';').push(newsP.thumbnail_path));

  var EditValue = {
    Id: news.id,

    DeleteThumbnail: false,
    NewThumbnail: '', // the thumbnail value

    NewAttachments: '', // the attachment values
    DeleteAttachments: '', // the attachment paths

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
        <h1>Editing Post</h1>
        <form id="newsForm" onsubmit="await subm(e);">
			<lable>Title:</lable>
			<input type="text" placeholder="Post Title" id="title" value="` +
    news.title +
    `">
			<hr>
			<lable>Tags:</lable>
			<input type="text" placeholder="post;bible study;news" id="tags" value="` +
    news.tags +
    `">
			<hr>
			<lable>Body (Using SCEditor under MIT)</lable>
			<textarea id="example" rows="20" cols="50">` +
    news.bbCode_body +
    `</textarea>
			<hr>
			<lable>Select Thumbnail (no \\ or / in the file name)</lable>
			<input type="file" accept="image/png,image/jpg,image/jpeg,image/svg,image/apng" id="thum" value="`+news.thumbnail_path+`">
			<hr>
			<lable>Select Attachments (no \\ or / in the file name)</lable>
			<input type="file" id="p" value="`+news.attachments_path+`" multiple>
      <hr>
			<input type="submit" value="Submit">

		</form>

    </center>
        <script>
            var textarea = document.getElementById('example');
            sceditor.create(textarea, {
              format: 'bbcode',
              icons: 'monocons',
              toolbar: 'bold,italic,underline,strike,subscript,superscript,left,center,right|justify,font,size,color,code,cut,copy,paste|horizontalrule,image,link,unlink,youtube,date,time,maximize,source',
              style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/default.min.css'
            });

            let titleEle = document.getElementById("title");
            titleEle.addEventListener('input', function(e) {
              window.ReactNativeWebView.postMessage('title_change:'+titleEle.value);
            });

            let tagsEle = document.getElementById("tags");
            tagsEle.addEventListener('input', function(e) {
              window.ReactNativeWebView.postMessage('tags_change:'+tagsEle.value);
            });

            textarea.addEventListener('input', function(e) {
              window.ReactNativeWebView.postMessage('body_change:'+textarea.value);
            });


            var ThumbnailFile = "";
            let fileSelection = document.getElementById("thum");
            fileSelection.addEventListener('change', async function(e) {
                let targetFile = e.target.files[0];
                window.ReactNativeWebView.postMessage('thum_change:'+fileSelection.value);
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
                alert('sub');
                window.ReactNativeWebView.postMessage('0'+document.getElementById("title").value);
                window.ReactNativeWebView.postMessage('1'+document.getElementById("tags").value);
                window.ReactNativeWebView.postMessage('2'+document.getElementById("example").value);
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
      const v = eventValue.slice(13);
      copyNews.title = v;
      setNews(copyNews);
    }

    if (eventValue.startsWith('tags_change:')) {
      const v = eventValue.slice(12);
      copyNews.tags = v;
      setNews(copyNews);
    }

    if (eventValue.startsWith('body_change:')) {
      const v = eventValue.slice(12);
      copyNews.bbCode_body = v;
      setNews(copyNews);
    }

    if (eventValue.startsWith('thum_change:')) {
      const v = eventValue.slice(12);
      copyNews.thumbnail_path = v;
      setNews(copyNews);
    }

    if (eventValue.startsWith('attc_change:')) {
      const v = eventValue.slice(12);
      copyNews.attachments_path = v;
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

  /// EditValue.DeleteAttachments += rmAtt + ';';  | news.attachments_path.replace(rmAtt + ';', '');
  // news.attachments_path.split(';')
  // EditValue.DeleteThumbnail = true;


  const AttComp = ({item, index}) => {
    // .attachments_path.split(';')
    console.log(item);
    if (item.length == 0) {
      return;
    }

    const delComp = () => {
      var att = attachments;
      if (item.startsWith('\\thumbnail\\')) {
        EditValue.DeleteThumbnail = true;
        att[att.length - 1] = "";

      } else {
        EditValue.DeleteAttachments += item + ';';
        att.forEach((item2, index2) => {
            if (item2 === item && index2 !== att.length -1) {
                att = att.splice(index2);
            }
        });
      }
      setAttachments(att);
    }

    return (
      <View style={adminNewsEditStyle.att_cop}>
        <Text style={adminNewsEditStyle.att_path}>{item}</Text>
        <TouchableOpacity
          style={adminNewsEditStyle.att_button}
          onPress={delComp}>
          <Text style={{fontSize: 20}}>❌</Text>
        </TouchableOpacity>
      </View>
    );
  }




  return (
    <View>
      <TitleBar />

      <FlatList
        style={{ backgroundColor: 'rgb(137, 190, 255)'}}
        data={attachments}
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
               textAlign: 'center'}}>Current Thumbnail</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{height: 500}}></View>
        )}
      />
    </View>
  );
}

