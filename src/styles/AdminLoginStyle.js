import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminLoginStyle = StyleSheet.create({
    box: {
        backgroundColor: "rgb(137, 190, 255)",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: w,
        height: h,
    },

    input: {

    },

    text: {

    }
});
export default adminLoginStyle;