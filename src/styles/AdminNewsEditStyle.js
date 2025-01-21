import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminNewsEditStyle = StyleSheet.create({
  box: {
    backgroundColor: 'rgb(137, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    width: w,
    height: 1000,
  },

  webview: {
    backgroundColor: 'rgb(137, 190, 255)',
    height: 700,
    width: w,
    alignItems: 'center',
    resizeMode: 'contain',
    margin: 20,
  },

  submit: {
    backgroundColor: 'rgb(39, 108, 188)',
    borderRadius: 5,
    padding: 7,
  },

  submit_text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
export default adminNewsEditStyle;