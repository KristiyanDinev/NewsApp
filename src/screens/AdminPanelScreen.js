import React, { useState } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, FlatList } from 'react-native';
import TitleBar from '../components/TitleBar';
import AdminPanelStyle from '../styles/AdminPanelStyle'
import { AddAdmin, EditAdmin, DeleteAdmin, Host, Admin, SearchNews, DeleteNews } from '../ServerManager';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import adminPanelStyle from '../styles/AdminPanelStyle';
import { useNavigation } from '@react-navigation/native';



const AdminPostEditor = () => {



    const htmlEditor = `
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
        <form id="newsForm">
			<lable>Title:</lable>
			<input name="Title" type="text" placeholder="Post Title" id="title">
			<hr>
			<lable>(' will be replaced by ") Tags:</lable>
			<input name="Tags" type="text" placeholder="post;bible study;news" id="tags">
			<hr>
			<lable>Body (Using SCEditor under MIT)</lable>
			<textarea name="HTML_body" id="example" rows="20" cols="50"></textarea>
			<hr>
			<lable>Select Thumbnail (no \\ or / in the file name)</lable>
			<input name="ThumbnailFile" type="file" accept="image/png,image/jpg,image/jpeg,image/svg,image/apng" id="thum">
			<hr>
			<lable>Select PDFs (no \\ or / in the file name)</lable>
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
                        ThumbnailFile += array1;

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
                        PDFsData += array2 + ';';

                    }
                    PDFreader.readAsArrayBuffer(f);
                }
            });

            let newsForm = document.getElementById("newsForm");
            newsForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                

                var formData  = new FormData();
                formData.append('AdminPass', '`+ Admin.password +`');
                formData.append('AdminUsername', '`+ Admin.username +`');
                formData.append('Title', document.getElementById("title").value);
                formData.append('Tags', document.getElementById("tags").value);
                formData.append('HTML_body', document.getElementById("example").value);
                formData.append('PDFs', PDFsData);
                formData.append('Thumbnail', ThumbnailFile);

                fetch("`+Host+`/news", {
                    method: "POST",
                    body: formData,
                    redirect: "follow"
                });

            });
            
        </script>
    
    `;

    return (
        <WebView
            source={{ html: htmlEditor }}
            style={AdminPanelStyle.post_webview}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={false}
            scrollEnabled={true}
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
            <Text>Every ' in the username will be replaced with "</Text>
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

    const submitHightDefault = 48;
    const filterHightDefault = 48;
    var maxH = 120;
    var filterMaxH = 80;
    const [heightSubmit, setHeightSubmit] = useState(submitHightDefault);
    const [heightFilter, setHeightFilter] = useState(filterHightDefault);

    const [SearchNewsText, setSearchNewsText] = useState('')
    const [FilterText, setFilterText] = useState('')

    const [newsData, setNewsData] = useState([])

    const submitSearchNews = async () => {
        if (SearchNewsText.length == 0 && FilterText.length == 0) {
            return;
        }
        var data = await SearchNews(SearchNewsText, FilterText);
        if (data.News == null) {
            return;
        }
        setNewsData(data.News);
    }


    var SearchCompA = () => {
        return ();
    }


    const ModifyNewsComp = ({ item, index }) => {
        // title, tags, htmL_body, thumbnail_path, pdF_path, posted_on_UTC_timezoned

        const submitDeletePost = async () => {
            Alert.alert('Delete: ' + item.title, 'Do you really want to delete this post?', [
                {
                    text: 'No',
                    onPress: () => { },
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        // TODO Send delete request
                        var isDeleted = await DeleteNews(item.id, item.pdF_path, item.thumbnail_path);
                        Alert.alert(isDeleted ? "Deleted!: " + item.title : "Couldn't delete: " + item.title, "", [{
                            text: "Ok",
                            onPress: () => { },
                        }]);
                    }
                },
            ]);
        }

        const submitEditPost = async () => {
            navigation.navigate('AdminEditNews', { news: item });
        }


        return (
            <View style={adminPanelStyle.news_view}>
                <Text style={adminPanelStyle.news_text}>Id: {item.id}</Text>
                <Text style={adminPanelStyle.news_text}>Title: {item.title}</Text>
                <Text style={adminPanelStyle.news_text}>Tags: {item.tags}</Text>
                <Text style={adminPanelStyle.news_text}>HTML Body: {item.htmL_body.length > 50 ?
                    item.htmL_body.slice(0, 50) + '...' : item.htmL_body}</Text>
                <Text style={adminPanelStyle.news_text}>Thumbnail: {item.thumbnail_path}</Text>
                <Text style={adminPanelStyle.news_text}>PDFs: {item.pdF_path}</Text>
                <Text style={adminPanelStyle.news_text}>Posted On: {new Date(item.posted_on_UTC_timezoned)
                    .toLocaleString()}</Text>
                <Text style={adminPanelStyle.news_text}>Posted by Admin: {item.posted_by_Admin_username}</Text>

                <TouchableOpacity style={adminPanelStyle.delete_post_view} onPress={submitDeletePost}>
                    <Text style={adminPanelStyle.submit_text}>❌</Text>
                </TouchableOpacity>

                <TouchableOpacity style={adminPanelStyle.edit_post_view} onPress={submitEditPost}>
                    <Text style={adminPanelStyle.submit_text}>✏️</Text>
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <SafeAreaView>
            <TitleBar />


            <FlatList style={{
                backgroundColor: "rgb(137, 190, 255)"
            }}
                data={newsData}
                renderItem={ModifyNewsComp}
                scrollEnabled={true}
                ListHeaderComponent={() => (
                    <View contentContainerStyle={AdminPanelStyle.box}>
                        <AddAdminComp />
                        <EditAdminComp />
                        <DeleteAdminComp />
                        <AdminPostEditor />
                        <SearchCompA />
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

