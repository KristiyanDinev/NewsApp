import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminPanelStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 200,
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
    }
});
export default adminPanelStyle;