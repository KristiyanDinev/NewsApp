import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import TitleBar from '../components/TitleBar';
import AdminPanelStyle from '../styles/AdminPanelStyle'
import { AddAdmin, EditAdmin, DeleteAdmin } from '../ServerManager';
import { SearchBarSimple } from '../components/SearchBar';

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

    /*
    <View style={AdminPanelStyle.form_box}>
                    <Text style={AdminPanelStyle.form_title}>Modify Posts</Text>
                    <TextInput style={AdminPanelStyle.input}
                        onChangeText={(p) => {
                            setSearchNews(p)
                        }}
                        value={SearchNews}
                        placeholder="Search anything..." />

                    <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitSearchNews}>
                        <Text style={AdminPanelStyle.submit_text}>Delete Admin</Text>
                    </TouchableOpacity>
                </View>
    */

    return (
        <View>
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

                <View style={AdminPanelStyle.form_box}>
                    <Text style={AdminPanelStyle.form_title}>Modify Posts</Text>
                    <TextInput style={AdminPanelStyle.input}
                        onChangeText={(p) => {
                            setSearchNews(p)
                        }}
                        value={SearchNews}
                        placeholder="Search anything..." />

                    <TouchableOpacity style={AdminPanelStyle.submit} onPress={submitSearchNews}>
                        <Text style={AdminPanelStyle.submit_text}>Delete Admin</Text>
                    </TouchableOpacity>
                </View>

                <SearchBarSimple submitSearch={submitSearchNews} text={SearchNews} onText={setSearchNews} 
                    filterText={FilterText} onFilter={setFilterText}/>

                <View style={AdminPanelStyle.scroll_view_fix}></View>
            </ScrollView>
        </View>
    );
}

