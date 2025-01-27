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
        margin: 20,
        flex: 1,
    },

    tags: {
        margin: 10,
        fontSize: 18,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(65, 157, 255)',
    },

    attachments_view: {
        alignItems: 'flex-start',
        backgroundColor: 'rgb(47, 188, 212)',
        height: 500,
        margin: 10,
    },

    attachments_text: {
        alignItems: 'center',
        fontSize: 20,
    },
    
});
export default newsStyle;