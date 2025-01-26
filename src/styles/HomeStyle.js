import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const homeStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'center',
        height: h,
        width: w,
        flexDirection: 'column',
    },

    text: {
        fontSize: 20,
    },
    

    button: {
        backgroundColor: "rgb(58, 147, 255)",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 50,
        width: 250,
        padding: 10,
        marginTop: 20,
    },

    search_box: {
        borderColor: "rgb(51, 145, 253)",
        borderRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: "rgb(234, 243, 253)",
        width: 170,
        maxWidth: 170,
        marginRight: 50,
        height: 48,
        marginTop: 15,
    },

    search_text: {
        fontSize: 15,
        textAlign: 'left',
    },

    submit: {
        backgroundColor: "rgb(73, 157, 252)",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 7,
        bottom: -3, // `bottom` and `top` have to be equal
        top: -3,
        width: 45, // `width` and `right` have to be equal
        position: 'absolute',
        right: -45,
    },

    submit_text: {
        fontSize: 23
    },

    page_view: {
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
    },

    page_text: {
        color: "rgb(22, 127, 255)",
        fontSize: 20,
    },

    cur_page_text: {
        fontSize: 23,
    },

    news_view1: {
        backgroundColor: 'rgb(80, 228, 254)',
        borderRadius: 40,
        margin: 20,
        marginTop: 160,
        alignItems: 'center',
        width: w - 40,
        flex: 1,
    },

    news_text: {
        margin: 10,
        fontSize: 23,
    },

    news_author: {
        margin: 10,
        textAlign: 'left',
        fontSize: 23,
    },

    news_tags: {
        margin: 10,
        fontSize: 18,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(65, 157, 255)',
    },

    news_list: {
        backgroundColor: 'rgb(137, 190, 255)',
        height: h,
        flex: 1,
    },

});
export default homeStyle;