import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import AdminPanelStyle from '../styles/AdminPanelStyle'
import { AddAdmin, EditAdmin, DeleteAdmin, Host } from '../ServerManager';
import { SearchBarSimple } from '../components/SearchBar';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';



const AdminPostEditor = () => {
    const handleWebViewNavigationStateChange = (newNavState) => {
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        const { url } = newNavState;
        if (!url) return;
    };


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
        <form action="" id="newsForm">
			<lable>Title:</lable>
			<input name="Title" type="text" placeholder="Post Title" id="title">
			<hr>
			<lable>Tags:</lable>
			<input name="Tags" type="text" placeholder="post;bible study;news" id="tags">
			<hr>
			<lable>Body (Thanks to SCEditor under MIT)</lable>
			<textarea name="HTML_body" id="example" rows="20" cols="50" id="body"></textarea>
			<hr>
			<lable>Select Thumbnail</lable>
			<input name="Files" type="file" accept="image/png,image/jpg,image/jpeg,image/svg,image/apng" id="thum">
			<hr>
			<lable>Select PDFs</lable>
			<input name="Files" type="file" accept="application/pdf" id="thum" multiple>
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



            let newsForm = document.getElementById("newsForm");
            newsForm.addEventListener("submit", (e) => {
                e.preventDefault();
                var formData  = new FormData();
                formData.append('Title', document.getElementById("title").value);
                formData.append('Tags', document.getElementById("tags").value);
                formData.append('HTML_body', document.getElementById("body").value);
                formData.append('Files', document.getElementById("thum").value);

                /*
                Title="+document.getElementById("title").value+
                        "&Tags="+document.getElementById("tags").value+
                        "&HTML_body="+document.getElementById("body").value+
                        "&Files="+document.getElementById("thum").value
                */

                // headers: { "Content-type": "multipart/form-data" }
                fetch("`+Host+`/news", {
                    method: "POST",
                    body: formData
                })
                    .then((response) => alert(response.status))
                    .catch((e) => alert("err: "+e));
                // handle submit
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
            onNavigationStateChange={handleWebViewNavigationStateChange}
        />
    );
}



export default function AdminPanelScreen() {
    const [AddAdminWarning, setAddAdminWarning] = useState('')
    const [SuccessfulAddedAdmin, setSuccessfulAddedAdmin] = useState('')
    const [ Password, setPassword ] = useState('')

    const [ EditedPassword, setEditedPassword ] = useState('');
    const [ OldPassword, setOldPassword ] = useState('');
    const [EditPasswordWarning, setEditPasswordWarning] = useState('')
    const [SuccessfulEditedPassword, setSuccessfulEditedPassword] = useState('')

    const [ DeletePassword, setDeletePassword ] = useState('');
    const [DeletedPasswordWarning, setDeletedPasswordWarning] = useState('')
    const [SuccessfulDeletedPassword, setSuccessfulDeletedPassword] = useState('')

    const [SearchNews, setSearchNews] = useState('')
    const [FilterText, setFilterText] = useState('')

    const submitAddAdmin = async () => {
        if (Password.includes("&") || Password.includes("=") || Password.includes("\\")) {
            setSuccessfulAddedAdmin("");
            setAddAdminWarning("Invalid Characters.");
            return;
        }

        var isAdded = await AddAdmin(Password);
        if (isAdded) {
            setSuccessfulAddedAdmin("Successfuly Added Admin");
            setAddAdminWarning("");

        } else {
            setSuccessfulAddedAdmin("");
            setAddAdminWarning("Can't add this Admin");
        }
    }

    const submitEditAdmin = async () => {
        if (EditedPassword.includes("&") || EditedPassword.includes("=") || EditedPassword.includes("\\")) {
            setSuccessfulEditedPassword("");
            setEditPasswordWarning("Invalid Characters.");
            return;
        }

        var isEdited = await EditAdmin(OldPassword, EditedPassword);
        if (isEdited) {
            setSuccessfulEditedPassword("Successfuly Edited Admin");
            setEditPasswordWarning("");

        } else {
            setSuccessfulEditedPassword("");
            setEditPasswordWarning("Can't edit this Admin");
        }
    }

    const submitDeleteAdmin = async () => {
        if (DeletePassword.includes("&") || DeletePassword.includes("=") || DeletePassword.includes("\\")) {
            setSuccessfulDeletedPassword("");
            setDeletedPasswordWarning("Invalid Characters.");
            return;
        }

        var isDeleted = await DeleteAdmin(DeletePassword);
        if (isDeleted) {
            setSuccessfulDeletedPassword("Successfuly Deleted Admin");
            setDeletedPasswordWarning("");

        } else {
            setSuccessfulDeletedPassword("");
            setDeletedPasswordWarning("Can't delete this Admin");
        }
    }


    const submitSearchNews = async () => {


    }

    return (
        <SafeAreaView>
            <TitleBar />
            <ScrollView contentContainerStyle={AdminPanelStyle.box}>
                <View style={AdminPanelStyle.form_box}>
                    <Text style={AdminPanelStyle.form_title}>Add Admin</Text>
                    <Text style={AdminPanelStyle.warning}>{AddAdminWarning}</Text>
                    <Text style={AdminPanelStyle.success}>{SuccessfulAddedAdmin}</Text>
                    <TextInput style={AdminPanelStyle.input}
                        onChangeText={(p) => {
                            if (p.includes("&") || p.includes("=") || p.includes("\\")) {
                                setSuccessfulAddedAdmin("");
                                setWarning("No `& = \\` in password ");
                                return;
                            }

                            setPassword(p.replace("&", "")
                                .replace("=", "").replace("\\", ""))
                        }}
                        value={Password}
                        placeholder="Add Password" />

                    <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitAddAdmin}>
                        <Text style={AdminPanelStyle.submit_text}>Add Admin</Text>
                    </TouchableOpacity>
                </View>

                <View style={AdminPanelStyle.form_box}>
                    <Text style={AdminPanelStyle.form_title}>Edit Admin</Text>
                    <Text style={AdminPanelStyle.warning}>{EditPasswordWarning}</Text>
                    <Text style={AdminPanelStyle.success}>{SuccessfulEditedPassword}</Text>
                    <TextInput style={AdminPanelStyle.input}
                        onChangeText={(p) => {
                            if (p.includes("&") || p.includes("=") || p.includes("\\")) {
                                setSuccessfulEditedPassword("");
                                setEditPasswordWarning("No `& = \\` in password ");
                                return;
                            }

                            setOldPassword(p.replace("&", "")
                                .replace("=", "").replace("\\", ""))
                        }}
                        value={OldPassword}
                        placeholder="Old Password" />

                    <TextInput style={AdminPanelStyle.input}
                        onChangeText={(p) => {
                            if (p.includes("&") || p.includes("=") || p.includes("\\")) {
                                setEditPasswordWarning("No `& = \\` in password ");
                                return;
                            }

                            setEditedPassword(p.replace("&", "")
                                .replace("=", "").replace("\\", ""))
                        }}
                        value={EditedPassword}
                        placeholder="New Password" />

                    <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitEditAdmin}>
                        <Text style={AdminPanelStyle.submit_text}>Edit Admin</Text>
                    </TouchableOpacity>
                </View>

                <View style={AdminPanelStyle.form_box}>
                    <Text style={AdminPanelStyle.form_title}>Delete Admin</Text>
                    <Text style={AdminPanelStyle.warning}>{DeletedPasswordWarning}</Text>
                    <Text style={AdminPanelStyle.success}>{SuccessfulDeletedPassword}</Text>
                    <TextInput style={AdminPanelStyle.input}
                        onChangeText={(p) => {
                            if (p.includes("&") || p.includes("=") || p.includes("\\")) {
                                setSuccessfulDeletedPassword("");
                                setDeletedPasswordWarning("No `& = \\` in password ");
                                return;
                            }

                            setDeletePassword(p.replace("&", "")
                                .replace("=", "").replace("\\", ""))
                        }}
                        value={DeletePassword}
                        placeholder="Delete Password" />

                    <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitDeleteAdmin}>
                        <Text style={AdminPanelStyle.submit_text}>Delete Admin</Text>
                    </TouchableOpacity>
                </View>


                <AdminPostEditor />

                <SearchBarSimple submitSearch={submitSearchNews} text={SearchNews} onText={setSearchNews}
                    filterText={FilterText} onFilter={setFilterText} />

                <View style={AdminPanelStyle.scroll_view_fix}></View>
            </ScrollView>

        </SafeAreaView>
    );
}

