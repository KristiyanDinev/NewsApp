import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminLoginStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: w,
        height: h,
    },

    scroll_view_fix: {
        height: 400,
    },

    input: {
        backgroundColor: "rgb(234, 243, 253)",
        borderColor: "rgb(133, 163, 200)",
        borderWidth: 3,
        width: 200,
        maxWidth: 200,
        marginTop: 20,
        marginBottom: 20,
        padding: 7,
        height: 50,
        fontSize: 15,
    },

    submit: {
        backgroundColor: "rgb(39, 108, 188)",
        borderRadius: 10,
        padding: 15,
        paddingLeft: 23,
        paddingRight: 23,
        marginTop: 10,
    },

    submit_text: {
        fontSize: 20,
        textAlign: 'center',
    },

    stats: {
        color: "rgb(196, 0, 0)",
        fontSize: 15,
    }
});
export default adminLoginStyle;