import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const savedNewsStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'center',
        height: h,
        width: w,
        flexDirection: 'column',
    },

    news_list: {
        backgroundColor: 'rgb(137, 190, 255)',
        height: h,
        flex: 1,
    },

    saved_text: {
        fontSize: 20,
        padding: 10,
        margin: 10,
    },

});
export default savedNewsStyle;