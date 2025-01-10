import { StyleSheet } from 'react-native';

const sizeOfTitleBar = 27;
const sizeOfFont = 20;

const titleBarStyle = StyleSheet.create({

    box: {
        flexDirection: "row",
        backgroundColor: "rgb(82, 159, 252)",
        padding: sizeOfTitleBar,
        justifyContent: 'space-evenly'
    },

    title: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Ariel',
        fontSize: sizeOfFont
    },

    menu: {
        alignItems: 'center',
        backgroundColor: 'rgb(7, 114, 245)',
        padding: sizeOfTitleBar,
        right: 0,
        position: "absolute"
    },

    menu_text: {
        fontSize: sizeOfFont
    }

});

export default titleBarStyle;