import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, FlatList , ScrollView} from 'react-native';
import TitleBar from '../components/TitleBar';
import AdminPanelStyle from '../styles/AdminPanelStyle'
import {
  AddAdmin,
  EditAdmin,
  DeleteAdmin,
  SearchNews,
  DeleteNews,
  PostNews,
} from '../ServerManager';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import adminPanelStyle from '../styles/AdminPanelStyle';
import { useNavigation } from '@react-navigation/native';
import searchStyle from '../styles/SearchStyle'


const AdminPostEditor = () => {
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
        <h1>Post</h1>
        <form id="newsForm">
			<lable>Title:</lable>
			<input type="text" placeholder="Post Title" id="title" required>
			<hr>
			<lable>Tags:</lable>
			<input type="text" placeholder="post;bible study;news" id="tags">
			<hr>
			<lable>Body (Using SCEditor under MIT)</lable>
			<textarea id="bbcode" rows="20" cols="40" placeholder="Body for the post..." required></textarea>
			<hr>
			<lable>Select Thumbnail (no \\ or / in the file name)</lable>
			<input type="file" accept="image/png,image/jpg,image/jpeg,image/svg,image/apng" id="thum">
			<hr>
			<lable>Select Attachments (no \\ or / in the file name)</lable>
			<input type="file" id="p" multiple>
			<hr>
			<input type="submit" value="Submit">

		</form></center>
        <script>
            var textarea = document.getElementById('bbcode');
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

            let newsForm = document.getElementById("newsForm");
            newsForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                
                window.ReactNativeWebView.postMessage('0'+document.getElementById("title").value);
                window.ReactNativeWebView.postMessage('1'+document.getElementById("tags").value);
                // sceditor.instance(textarea).val()
                // document.getElementById("bbcode").value
                window.ReactNativeWebView.postMessage('2'+sceditor.instance(textarea).val());
                window.ReactNativeWebView.postMessage('3'+PDFsData);
                window.ReactNativeWebView.postMessage('4'+ThumbnailFile);

                window.ReactNativeWebView.postMessage('-');

            });
            
        </script>
    
    `;

    var PostData = [];
    const getHTML_Data = async (e) => {
        const eventValue = e.nativeEvent.data;
        if (
          eventValue == '-' &&
          PostData.length == 5 &&
          PostData[0].length > 0 &&
          PostData[2].length > 0
        ) {
          Alert.alert('Post: '+PostData[0],
            'Do you want to post this?',
            [
              {
                text: 'Yes',
                onPress: async () => {
                    var isPosted = await PostNews(PostData);
                    Alert.alert(
                      isPosted ? 'Posted: ' + PostData[0] : "Can't post this post",
                      '',
                      [
                        {
                          text: 'Ok',
                          onPress: () => {},
                        },
                      ],
                    );
                },
              },
              {
                text: 'No',
                onPress: () => {},
              },
            ],
          );
          
          return;
        }
        const i = Number(eventValue[0]);
        const value = eventValue.slice(1);
        PostData[i] = value;
    }

    return (
      <WebView
        source={{html: htmlEditor}}
        style={AdminPanelStyle.post_webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
        scrollEnabled={true}
        onMessage={getHTML_Data}
      />
    );
}


const AddAdminComp = () => {
    const [AddAdminWarning, setAddAdminWarning] = useState('')
    const [SuccessfulAddedAdmin, setSuccessfulAddedAdmin] = useState('')
    const [Password, setPassword] = useState('')
    const [Username, setUsername] = useState('')

    const submitAddAdmin = async () => {
        Alert.alert('Add Admin: ' + Username, 'Do you really want to add this admin?', [
            {
                text: 'No',
                onPress: () => { },
            },
            {
                text: 'Yes',
                onPress: async () => {
                    var isAdded = await AddAdmin(Password, Username);
                    if (isAdded) {
                        setSuccessfulAddedAdmin("Successfuly Added Admin");
                        setAddAdminWarning("");

                    } else {
                        setSuccessfulAddedAdmin("");
                        setAddAdminWarning("Can't add this Admin");
                    }
                }
            }
        ]);
    }

    return (
        <View style={AdminPanelStyle.form_box}>
            <Text style={AdminPanelStyle.form_title}>Add Admin</Text>
            <Text style={AdminPanelStyle.warning}>{AddAdminWarning}</Text>
            <Text style={AdminPanelStyle.success}>{SuccessfulAddedAdmin}</Text>
            <TextInput style={AdminPanelStyle.input}
                onChangeText={(u) => {
                    setUsername(u)
                }}
                value={Username}
                placeholder="Username" />
            <TextInput style={AdminPanelStyle.input}
                onChangeText={(p) => {
                    setPassword(p)
                }}
                value={Password}
                placeholder="Password" />

            <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitAddAdmin}>
                <Text style={AdminPanelStyle.submit_text}>Add Admin</Text>
            </TouchableOpacity>
        </View>
    );
}


const EditAdminComp = () => {
    const [NewPassoword, setNewPassoword] = useState('');
    const [NewUsername, setNewUsername] = useState('');
    const [OldPassword, setOldPassword] = useState('');
    const [OldUsername, setOldUsername] = useState('');
    const [EditPasswordWarning, setEditPasswordWarning] = useState('')
    const [SuccessfulEditedPassword, setSuccessfulEditedPassword] = useState('')

    const submitEditAdmin = async () => {
        Alert.alert('Edit Admin: ' + OldUsername, 'Do you really want to edit this admin?', [
            {
                text: 'No',
                onPress: () => { },
            },
            {
                text: 'Yes',
                onPress: async () => {
                    var isEdited = await EditAdmin(OldPassword, OldUsername, NewPassoword, NewUsername);
                    if (isEdited) {
                        setSuccessfulEditedPassword("Successfuly Edited Admin");
                        setEditPasswordWarning("");

                    } else {
                        setSuccessfulEditedPassword("");
                        setEditPasswordWarning("Can't edit this Admin");
                    }
                }
            }
        ]);
    }


    return (
        <View style={AdminPanelStyle.form_box}>
            <Text style={AdminPanelStyle.form_title}>Edit Admin</Text>
            <Text style={AdminPanelStyle.warning}>{EditPasswordWarning}</Text>
            <Text style={AdminPanelStyle.success}>{SuccessfulEditedPassword}</Text>

            <TextInput style={AdminPanelStyle.input}
                onChangeText={(u) => {
                    setOldUsername(u)
                }}
                value={OldUsername}
                placeholder="Old Username" />

            <TextInput style={AdminPanelStyle.input}
                onChangeText={(p) => {
                    setOldPassword(p)
                }}
                value={OldPassword}
                placeholder="Old Password" />

            <View style={{marginTop: 20}}></View>

            <TextInput style={AdminPanelStyle.input}
                onChangeText={(u) => {
                    setNewUsername(u)
                }}
                value={NewUsername}
                placeholder="New Username" />

            <TextInput style={AdminPanelStyle.input}
                onChangeText={(p) => {
                    setNewPassoword(p)
                }}
                value={NewPassoword}
                placeholder="New Password" />

            <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitEditAdmin}>
                <Text style={AdminPanelStyle.submit_text}>Edit Admin</Text>
            </TouchableOpacity>
        </View>
    );
}


const DeleteAdminComp = () => {
    const [DeletePassword, setDeletePassword] = useState('');
    const [DeleteUsername, setDeleteUsername] = useState('');
    const [DeletedPasswordWarning, setDeletedPasswordWarning] = useState('')
    const [SuccessfulDeletedPassword, setSuccessfulDeletedPassword] = useState('')

    const submitDeleteAdmin = async () => {
        Alert.alert('Delete Admin: ' + DeleteUsername, 'Do you really want to delete this admin?', [
            {
                text: 'No',
                onPress: () => { },
            },
            {
                text: 'Yes',
                onPress: async () => {
                    var isDeleted = await DeleteAdmin(DeletePassword, DeleteUsername);
                    if (isDeleted) {
                        setSuccessfulDeletedPassword("Successfuly Deleted Admin");
                        setDeletedPasswordWarning("");

                    } else {
                        setSuccessfulDeletedPassword("");
                        setDeletedPasswordWarning("Can't delete this Admin");
                    }
                }
            },
        ]);
    }

    return (
        <View style={AdminPanelStyle.form_box}>
            <Text style={AdminPanelStyle.form_title}>Delete Admin</Text>
            <Text style={AdminPanelStyle.warning}>{DeletedPasswordWarning}</Text>
            <Text style={AdminPanelStyle.success}>{SuccessfulDeletedPassword}</Text>
            <TextInput style={AdminPanelStyle.input}
                onChangeText={(u) => {
                    setDeleteUsername(u)
                }}
                value={DeleteUsername}
                placeholder="Username" />

            <TextInput style={AdminPanelStyle.input}
                onChangeText={(p) => {
                    setDeletePassword(p)
                }}
                value={DeletePassword}
                placeholder="Password" />

            <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitDeleteAdmin}>
                <Text style={AdminPanelStyle.submit_text}>Delete Admin</Text>
            </TouchableOpacity>
        </View>
    );
}



export default function AdminPanelScreen() {
  /*
{newsData.map((value, index, array) => ModifyNewsComp({value, index}))}
<ScrollView contentContainerStyle={AdminPanelStyle.box} nestedScrollEnabled={true}>
                <AddAdminComp  />

                <EditAdminComp  />

                <DeleteAdminComp  />


                <AdminPostEditor />

                <SearchComp />

                <View style={AdminPanelStyle.scroll_view_fix}></View>
            </ScrollView>
            
        
            <FlatList style={{backgroundColor: "rgb(137, 190, 255)"
    }}
                data={newsData}
                renderItem={ModifyNewsComp}
                scrollEnabled={true}
                ListHeaderComponent={() => (
                    <View contentContainerStyle={AdminPanelStyle.box}>
                        <AddAdminComp  />

                        <EditAdminComp  />

                        <DeleteAdminComp  />


                        <AdminPostEditor />

                        <SearchCompA />
                    </View>
                    

                )}
                ListFooterComponent={() => (
                    <View style={AdminPanelStyle.scroll_view_fix}></View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />*/

  const navigation = useNavigation();

  const [newsData, setNewsData] = useState([]);

  const submitSearch = async (text, filterText, authorsText) => {
    if (text.length == 0 && filterText.length == 0 && authorsText.length == 0) {
      return;
    }
    var data = await SearchNews(text, filterText, authorsText, 1, 10);
    if (data.News == null) {
      return;
    }
    setNewsData(data.News);
  };

  const SeachC = () => {
    const [text, setText] = useState('');
    const [filterText, setFilterText] = useState('');
    const [authorsText, setAuthorsText] = useState('');

    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        
        <View style={{top: -330}}>
          <Text
          style={{
            color: 'rgb(255, 191, 0)',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Warning: When you click on the search button it refreshes the whole
          page and all inputs will be reset. When any of the posts are edited you won't see the new changes here 
          unless you search for the posts again.
        </Text>
        </View>
        
        <View style={searchStyle.search_box}>
          <TextInput
            style={searchStyle.search_text}
            value={text}
            multiline={true}
            onChangeText={setText}
            placeholder="Search anything..."
          />

          <TouchableOpacity
            style={searchStyle.submit}
            onPress={async () => {
              await submitSearch(text, filterText, authorsText);
            }}>
            <Text style={searchStyle.submit_text}>🔍</Text>
          </TouchableOpacity>
        </View>
        <View style={searchStyle.filter_box}>
          <Text style={searchStyle.filter_text}>
            Filter: Enter tags to filter your result. Spaces are allowed.
            Seperate them by ;
          </Text>
          <TextInput
            style={searchStyle.filter_input}
            value={filterText}
            multiline={true}
            onChangeText={setFilterText}
            placeholder="Ex: news;bible study;posts"
          />
        </View>
        <View style={searchStyle.filter_box}>
          <Text style={searchStyle.filter_text}>
            Enter usernames of authors to get only their posts. Spaces are
            allowed. Seperate them by ;
          </Text>
          <TextInput
            style={searchStyle.filter_input}
            value={authorsText}
            multiline={true}
            onChangeText={setAuthorsText}
            placeholder="Ex: Ema;Boby"
          />
        </View>
      </View>
    );
  };

  const ModifyNewsComp = ({item, index}) => {
    // title, tags, htmL_body, thumbnail_path, pdF_path, posted_on_UTC_timezoned

    const submitDeletePost = async () => {
      Alert.alert(
        'Delete: ' + item.title,
        'Do you really want to delete this post?',
        [
          {
            text: 'No',
            onPress: () => {},
          },
          {
            text: 'Yes',
            onPress: async () => {
              // TODO Send delete request
              var isDeleted = await DeleteNews(
                item.id,
                item.pdF_path,
                item.thumbnail_path,
              );
              Alert.alert(
                isDeleted
                  ? 'Deleted!: ' + item.title
                  : "Couldn't delete: " + item.title,
                '',
                [
                  {
                    text: 'Ok',
                    onPress: () => {},
                  },
                ],
              );
            },
          },
        ],
      );
    };

    const submitEditPost = async () => {
      navigation.navigate('AdminEditNews', {newsP: item});
    };

    return (
      <View style={adminPanelStyle.news_view}>
        <Text style={adminPanelStyle.news_text}>Id: {item.id}</Text>
        <Text style={adminPanelStyle.news_text}>Title: {item.title}</Text>
        <Text style={adminPanelStyle.news_text}>Tags: {item.tags}</Text>
        <Text style={adminPanelStyle.news_text}>
          Body:{' '}
          {item.bbCode_body.length > 150
            ? item.bbCode_body.slice(0, 150) + '...'
            : item.bbCode_body}
        </Text>
        <Text style={adminPanelStyle.news_text}>
          Thumbnail: {item.thumbnail_path}
        </Text>
        <Text style={adminPanelStyle.news_text}>
          Attachments: {item.attachments_path}
        </Text>
        <Text style={adminPanelStyle.news_text}>
          Posted On: {new Date(item.posted_on).toLocaleString()}
        </Text>
        <Text style={adminPanelStyle.news_text}>
          Posted by Admin: {item.posted_by_Admin_username}
        </Text>

        <TouchableOpacity
          style={adminPanelStyle.delete_post_view}
          onPress={submitDeletePost}>
          <Text style={adminPanelStyle.submit_text}>❌</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={adminPanelStyle.edit_post_view}
          onPress={submitEditPost}>
          <Text style={adminPanelStyle.submit_text}>✏️</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView>
      <TitleBar />

      <FlatList
        style={{backgroundColor: 'rgb(137, 190, 255)'}}
        data={newsData}
        renderItem={ModifyNewsComp}
        scrollEnabled={true}
        ListHeaderComponent={() => (
          <View contentContainerStyle={AdminPanelStyle.box}>
            <AddAdminComp />
            <EditAdminComp />
            <DeleteAdminComp />
            <AdminPostEditor />
            <View style={{height: 350}}></View>

            <SeachC />
            <View style={{height: 110}}></View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={AdminPanelStyle.scroll_view_fix}></View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

