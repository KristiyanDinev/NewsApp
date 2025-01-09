import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const sizeOfSearchBar = 27;

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const isLeft = (w - h) >= 200;

const searchBarStyle = StyleSheet.create({

    box: {
        padding: sizeOfSearchBar,
        marginTop: isLeft ? sizeOfSearchBar * 3 : null,
        justifyContent: 'space-evenly',
        backgroundColor: "rgb(137, 190, 255)",
        left: 0,
        minWidth: isLeft ? 260 : null,
        height: isLeft ? h : 260,
        minHeight: isLeft ? h : 260,
        position: isLeft ? 'absolute' : null,
        alignItems: isLeft ? null : 'center'
    },

    search_box: {
        borderColor: "rgb(51, 145, 253)",
        borderRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 5,
        borderStyle: 'solid',
        backgroundColor: "rgb(234, 243, 253)",
        maxHeight: 400,
        width: 170,
        maxWidth: 170,
        marginBottom: 600,
        maxHeight: isLeft ? 200 : 120,
    },

    search_text: {
        textAlign: 'left',
        fontFamily: 'HelveticaNeue',
        fontSize: 15,
    },

    submit: {
        backgroundColor: "rgb(73, 157, 252)",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 7,
        bottom: -5,
        top: -5,
        width: 45, // `width` and `right` have to be equal
        position: 'absolute',
        right: -45,
    },
    submit_text: {
        fontSize: 23
    }

});


export default searchBarStyle;