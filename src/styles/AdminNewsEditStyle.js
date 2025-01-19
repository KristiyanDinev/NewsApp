import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminNewsEditStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'center',
        width: w,
        height: h,
    },

    webview: {
        backgroundColor: "rgb(137, 190, 255)",
        height: h,
        alignItems: 'center',
        resizeMode: 'contain',
        margin: 20,
    },
});
export default adminNewsEditStyle;