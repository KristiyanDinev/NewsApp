import { StyleSheet, Dimensions } from 'react-native';

const sizeOfSearchBar = 20;

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const searchBorderWidth = 3;

const isLeft = (w - h) >= 200;
// sizeOfSearchBar * 4 + 1
//console.log("h: "+h);
//console.log("w: " + w);
const searchBarStyle = StyleSheet.create({

    box: {
        padding: sizeOfSearchBar,
        marginTop: isLeft ? 81 : null,
        justifyContent: 'space-between',
        backgroundColor: "rgb(137, 190, 255)",
        left: 0,
        minWidth: isLeft ? 260 : null,
        height: isLeft ? h : 300,
        minHeight: isLeft ? h : 260,
        position: isLeft ? 'absolute' : null,
        alignItems: isLeft ? null : 'center',
        maxHeight: isLeft ? null : 300
    },

    search_box: {
        borderColor: "rgb(51, 145, 253)",
        borderRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: searchBorderWidth,
        borderStyle: 'solid',
        backgroundColor: "rgb(234, 243, 253)",
        width: 170,
        maxWidth: 170,
        marginBottom: 600,
        maxHeight: isLeft ? 205 : 120,
        marginTop: isLeft ? 0 : -10
    },

    // marginTop: h >= 700 && isLeft ? -60 : isLeft ? 0 : -10,
    search_text: {
        textAlign: 'left',
        fontFamily: 'Arial',
        fontSize: 15,
    },

    submit: {
        backgroundColor: "rgb(73, 157, 252)",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 7,
        bottom: -searchBorderWidth, // `bottom` and `top` have to be equal
        top: -searchBorderWidth,
        width: 45, // `width` and `right` have to be equal
        position: 'absolute',
        right: -45,
    },

    submit_text: {
        fontSize: 23
    },

    filter_box: {
        padding: isLeft ? null : 7,
        paddingTop: isLeft ? 15 : null,
        paddingRight: isLeft ? 0 : null,
        position: 'absolute',
        alignItems: 'center',
        top: isLeft ? 90 : 80,
        marginLeft: isLeft ? 35 : null,
    },

    //filter_box marginTop: isLeft ? 60 : -26,

    filter_text: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Arial',
    },

    filter_input: {
        borderColor: "rgb(104, 131, 165)",
        borderRadius: 5,
        borderWidth: searchBorderWidth,
        borderStyle: 'solid',
        backgroundColor: "rgb(236, 236, 236)",
        width: 200,
        maxWidth: 200,
        marginTop: 15,
        maxHeight: isLeft ? 96 : 80,
        textAlign: 'left',
        fontSize: 15,
        fontFamily: 'Arial',
    }

});


export default searchBarStyle;