import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminPanelStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        width: w,
    },

    warning: {
        color: "rgb(196, 0, 0)",
        fontSize: 20,
    },

    success: {
        color: "rgb(0, 255, 51)",
        fontSize: 20,
    },

    form_title: {
        fontSize: 20,
    },

    scroll_view_fix: {
        height: 700,
    },

    input: {
        backgroundColor: "rgb(234, 243, 253)",
        borderColor: "rgb(133, 163, 200)",
        borderWidth: 3,
        width: 200,
        maxWidth: 200,
        padding: 7,
        marginTop: 7,
        marginBottom: 7,
        height: 50,
        fontSize: 17,
    },

    submit: {
        backgroundColor: "rgb(39, 108, 188)",
        borderRadius: 5,
        padding: 7,
    },

    submit_text: {
        fontSize: 20,
        textAlign: 'center',
    },

    form_box: {
        borderRadius: 10,
        backgroundColor: "rgb(73, 158, 255)",
        padding: 30,
        margin: 10,
        alignItems: 'center'
    },



    post_webview: {
        backgroundColor: "rgb(137, 190, 255)",
        height: 900,
        alignItems: 'center',
        resizeMode: 'contain',
        margin: 20,
    },



    delete_post_view: {
        backgroundColor: "rgb(255, 140, 140)",
        borderRadius: 20,
        padding: 10,
        margin: 5
    },

    edit_post_view: {
        backgroundColor: "rgb(44, 48, 255)",
        borderRadius: 20,
        padding: 10,
        margin: 5
    },

    news_view: {
        padding: 10,
        margin: 10,
        backgroundColor: "rgb(73, 158, 255)",
        borderRadius: 20,
    },

    news_text: {
        fontSize: 23,
        padding: 10,
    },
});
export default adminPanelStyle;