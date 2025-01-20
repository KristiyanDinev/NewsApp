import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const searchStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'center',
        width: w,
        height: h,
    },

    search_box: {
        borderColor: "rgb(51, 145, 253)",
        borderRadius: 20,
        flex: 1,
        height: 200,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: "rgb(234, 243, 253)",
        width: 170,
        maxWidth: 170,
        maxHeight: 200,
        marginTop: -290,
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

    filter_box: {
        padding: 7,
        alignItems: 'center',
        top: 50,
    },

    filter_text: {
        fontSize: 20,
        textAlign: 'center',
    },

    filter_input: {
        borderColor: "rgb(104, 131, 165)",
        borderRadius: 5,
        borderWidth: 3,
        borderStyle: 'solid',
        backgroundColor: "rgb(236, 236, 236)",
        width: 200,
        maxWidth: 200,
        marginTop: 15,
        maxHeight: 80,
        textAlign: 'left',
        fontSize: 15,
        flex: 1,
    },



});
export default searchStyle;