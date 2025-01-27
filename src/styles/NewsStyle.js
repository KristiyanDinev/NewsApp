import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const newsStyle = StyleSheet.create({
    box: {
        backgroundColor: 'rgb(47, 188, 212)',
        flex: 1,
    },

    webview: {
        backgroundColor: 'rgb(47, 188, 212)',
        resizeMode: 'contain',
        maxWidth: w - 40,
        height: h,
        margin: 20,
    },

    tags: {
        margin: 10,
        fontSize: 18,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(108, 204, 255)',
    },

    attachments_view: {
        alignItems: 'flex-start',
        margin: 10,
        marginLeft: 20,
    },

    attachments_text: {
        alignItems: 'center',
        fontSize: 20,
    },

    attach_view: {
        backgroundColor: 'rgb(108, 204, 255)',
        borderRadius: 20,
        padding: 10,
        fontSize: 18,
        color: 'rgb(1, 1, 1)',
        padding: 7,
        margin: 10,
        alignItems: 'center',
    },

    attach_text: {
        fontSize: 20,
        margin: 10,
    },

    attach_download_text: {
        fontSize: 20,
        margin: 10,
        color: 'rgb(50, 255, 71)',
    },
    
});
export default newsStyle;