import { StyleSheet, Dimensions } from 'react-native';
import { ICONSIZE, FONTSIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';

export default StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDate: {
    color: '#555efeff',
    fontSize: FONTSIZE[2],
    marginRight: 4,
  },
  date: {
    marginLeft: '2%',
    fontSize: FONTSIZE[2],
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '2%',
    paddingLeft: 2
  },
  iconLocation: {
    color: '#555efeff',
    fontSize: FONTSIZE[1],
    marginRight: 4,
  },
  location: {
    marginLeft: '2%',
    width: '80%',
    fontSize: FONTSIZE[1],
  },
  windowiconview: {
    flexDirection: 'row-reverse',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
  },
  commitecar: {
    // backgroundColor: '#FFFF',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.45,
    // height: height * 0.15,
    margin: '2%',
  },
  imgcommite: {
    height: SCREEN_HEIGHT * 0.1,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  horizimgcommite: {
    height: '105%',
    width: '27%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  addeventstitle: {
    // flexDirection: 'row',
    // paddingTop: 10,
    paddingHorizontal: '2%',
    // backgroundColor: 'red',
    justifyContent: 'space-between'
  },
  addeventsdatearrow: {
    // flexDirection: 'column',
    backgroundColor: '#2F9FD5',
    position: 'absolute',
    right: 10,
    top: -20,
    // paddingHorizontal: 5,
    // paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowright: {
    // color: '#FFFF',
    fontSize: FONTSIZE[2],
  },
  bottomview: {
    paddingHorizontal: 10,
  },
  datetxt: {
    color: 'grey',
    fontSize: FONTSIZE[0],
    fontFamily: 'IRANSans',
  },
  titletxt: {
    fontSize: FONTSIZE[0],
    fontFamily: 'IRANSans',
  },
  readtxt: {
    color: '#1F1E60',
    fontSize: FONTSIZE[1],
    fontFamily: 'IRANSans-bold',
  },
  desctxt: {
    color: 'grey',
    fontSize: FONTSIZE[1],
    fontFamily: 'IRANSans',
    marginVertical: 2,
  },
  horiztouch: {
    width: SCREEN_WIDTH * 0.95,
    minHeight: SCREEN_HEIGHT * 0.1,
    // backgroundColor: '#FFFF',
    borderRadius: 4,
    paddingBottom: '1%',
    flexDirection: 'row',
    margin: '2%'
  },
  horiztopview: {
    flexDirection: 'row',
    // borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    marginBottom: 3,
    paddingBottom: 3,
  },
  horizbottomview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
    paddingHorizontal: 4,
  },
  forwadicon: {
    fontSize: ICONSIZE[5],
    marginLeft: 3,
  },
  horizrighticon: {
    flexDirection: 'row',
  },
  imgbottcareventssec: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
});
