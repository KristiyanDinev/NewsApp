import { StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const adminNewsEditStyle = StyleSheet.create({
  box: {
    backgroundColor: 'rgb(137, 190, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    width: w,
  },

  webview: {
    backgroundColor: 'rgb(137, 190, 255)',
    height: 1100,
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

  att_cop: {
      backgroundColor: 'rgb(60, 151, 255)',
              borderRadius: 20,
              padding: 10,
              fontSize: 15,
              color: 'rgb(1, 1, 1)',
              padding: 7,
              margin: 10,
              alignItems: 'center',
  },

   att_path: {
              fontSize: 20,
              margin: 10,
            },

  att_button: {
              backgroundColor: 'rgb(255, 140, 140)',
              borderRadius: 3,
              padding: 10,
              fontSize: 15,
               margin: 10,
              color: 'rgb(1, 1, 1)',
              alignItems: 'center',
  },
});
export default adminNewsEditStyle;