import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const optionsStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: w,
        height: h,
    },

    button: {
        padding: 20,
        marginBottom: 100,
        borderBottomColor: "rgb(82, 109, 142)",
        borderWidth: 3,
        borderTopColor: "rgb(137, 190, 255)",
        borderRightColor: "rgb(82, 109, 142)",
        borderLeftColor: "rgb(137, 190, 255)",
        backgroundColor: "rgb(205, 205, 205)",
    },

    button_text: {
        fontSize: 27,
        fontFamily: 'Arial',

    }
});
export default optionsStyle;