import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import AdminPanelStyle from '../styles/AdminPanelStyle'
import { AddAdmin, EditAdmin, DeleteAdmin, Host, AdminPassword, SearchNews } from '../ServerManager';
import searchBarStyle from '../styles/SearchBarStyle';
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
        <form id="newsForm">
			<lable>Title:</lable>
			<input name="Title" type="text" placeholder="Post Title" id="title">
			<hr>
			<lable>Tags:</lable>
			<input name="Tags" type="text" placeholder="post;bible study;news" id="tags">
			<hr>
			<lable>Body (Thanks to SCEditor under MIT)</lable>
			<textarea name="HTML_body" id="example" rows="20" cols="50"></textarea>
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
            newsForm.addEventListener("submit", (e) => {
                e.preventDefault();
                

                var formData  = new FormData();
                formData.append('AdminPass', '`+ AdminPassword +`');
                formData.append('Title', document.getElementById("title").value);
                formData.append('Tags', document.getElementById("tags").value);
                formData.append('HTML_body', document.getElementById("example").value);
                formData.append('PDFs', PDFsData);
                formData.append('Thumbnail', ThumbnailFile);

                fetch("`+Host+`/news", {
                    method: "POST",
                    body: formData,
                    redirect: "follow"
                })
                    .then((response) => alert(response.status))
                    .catch((e) => alert("err: "+e));
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


const AddAdminComp = () => {
    const [AddAdminWarning, setAddAdminWarning] = useState('')
    const [SuccessfulAddedAdmin, setSuccessfulAddedAdmin] = useState('')
    const [Password, setPassword] = useState('')

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

    return (
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
    );
}


const EditAdminComp = () => {
    const [EditedPassword, setEditedPassword] = useState('');
    const [OldPassword, setOldPassword] = useState('');
    const [EditPasswordWarning, setEditPasswordWarning] = useState('')
    const [SuccessfulEditedPassword, setSuccessfulEditedPassword] = useState('')

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


    return (
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
    );
}


const DeleteAdminComp = () => {
    const [DeletePassword, setDeletePassword] = useState('');
    const [DeletedPasswordWarning, setDeletedPasswordWarning] = useState('')
    const [SuccessfulDeletedPassword, setSuccessfulDeletedPassword] = useState('')

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

    return (
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
    );
}


const SearchComp = () => {
    const submitHightDefault = 48;
    const filterHightDefault = 48;
    var maxH = 120;
    var filterMaxH =  80;
    const [heightSubmit, setHeightSubmit] = useState(submitHightDefault);
    const [heightFilter, setHeightFilter] = useState(filterHightDefault);

    const [SearchNewsText, setSearchNewsText] = useState('')
    const [FilterText, setFilterText] = useState('')

    const submitSearchNews = async () => {
        if (SearchNewsText.length == 0) {
            return;
        }
        var data = await SearchNews(SearchNewsText, FilterText);

    }

    return (
        <View style={{
            backgroundColor: "rgb(137, 190, 255)",
            padding: 20,
            alignItems: 'center',
        }}>
            <View style={{

                height: Math.max(submitHightDefault, heightSubmit),
                borderColor: "rgb(51, 145, 253)",
                borderRadius: 20,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderWidth: 3,
                borderStyle: 'solid',
                backgroundColor: "rgb(234, 243, 253)",
                width: 170,
                maxWidth: 170,

            }}>
                <TextInput style={searchBarStyle.search_text}
                    value={SearchNewsText}
                    multiline={true}
                    onChangeText={setSearchNewsText}
                    placeholder="Search anything..."
                    onContentSizeChange={(event) => {
                        var newH = event.nativeEvent.contentSize.height;
                        if (newH >= maxH) {
                            setHeightSubmit(maxH);
                            return;
                        }
                        setHeightSubmit(newH);
                    }}
                />

                <TouchableOpacity style={searchBarStyle.submit} onPress={submitSearchNews}>
                    <Text style={searchBarStyle.submit_text}>🔍</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                alignItems: 'center',
                marginTop: heightSubmit
            }}>
                <Text style={searchBarStyle.filter_text}>
                    Filter: Enter tags to filter your result. Spaces are allowed. Seperate them by ;
                </Text>
                <TextInput style={{
                    height: Math.max(filterHightDefault, heightFilter),
                    borderColor: "rgb(104, 131, 165)",
                    borderRadius: 5,
                    borderWidth: 3,
                    borderStyle: 'solid',
                    backgroundColor: "rgb(236, 236, 236)",
                    width: 200,
                    maxWidth: 200,
                    marginTop: 15,
                    maxHeight: filterMaxH,
                    textAlign: 'left',
                    fontSize: 15,
                }}
                    value={FilterText}
                    multiline={true}
                    onChangeText={setFilterText}
                    placeholder="Ex: news;bible study;posts"
                    onContentSizeChange={(event) => {
                        var newH = event.nativeEvent.contentSize.height;
                        if (newH >= filterMaxH) {
                            setHeightFilter(filterMaxH);
                            return;
                        }
                        setHeightFilter(newH);
                    }}
                />
            </View>

        </View >
    );
}


export default function AdminPanelScreen() {
    return (
        <SafeAreaView>
            <TitleBar />
            <ScrollView contentContainerStyle={AdminPanelStyle.box}>
                <AddAdminComp  />

                <EditAdminComp  />

                <DeleteAdminComp  />


                <AdminPostEditor />
                <SearchComp />
                

                <View style={AdminPanelStyle.scroll_view_fix}></View>
            </ScrollView>

        </SafeAreaView>
    );
}

