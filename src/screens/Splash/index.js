import React, { useState, useEffect } from 'react';
import {

  View,
  BackHandler,
  Platform,
  ActivityIndicator,

} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import { retrieveData } from '@app/screens/Login/index';

const Splash = props => {

  useEffect(() => {
    const checkToken = async () => {
      try {

        const token1 = await retrieveData('Token');
        const eventId1 = await retrieveData('EventId');
        const HallName1 = await retrieveData('HallName');
        const EventName1 = await retrieveData('EventName');
        const StartDate1 = await retrieveData('StartDate');
        const print1 = await retrieveData('Print');

        props.navigation.navigate('Scan', {
          item: {
            'hallName': HallName1, // ارسال HallName به عنوان پراپس
            'eventId': eventId1,
            'Print': print1,
            'Token': token1,
            'EventName': EventName1,
            'StartDate': StartDate1,

          }
        })
      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
      } finally {
      }
    };
    checkToken();
    console.log(props.navigation);


    // console.log(Platform.OS);
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          // Returning true disables the back button
          return true;
        },
      );

      // Clean up the event listener
      return () => backHandler.remove();
    }
  }, []);
  const handleExitApp = () => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      BackHandler.exitApp();

    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      {/* <Video
        source={require('../../assets/E-3.mp4')}
        style={{ width, height: height }}
        muted={true}
        repeat={true}
        resizeMode={'stretch'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      /> */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      <View style={{
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.82,
        height: SCREEN_HEIGHT, width: SCREEN_WIDTH,
        opacity: 0.8
      }}>
      </View>
    </View>

  );
};

export default Splash;
