import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const homeStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
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
});
export default homeStyle;