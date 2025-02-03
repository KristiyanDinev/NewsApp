import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const contactUsStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        width: w,
        height: h,
    },

    title: {
        fontSize: 23,
        padding: 10,
        margin: 10,
    },

    text: {
        fontSize: 20,
        padding: 10,
        margin: 5,
    }
});
export default contactUsStyle;