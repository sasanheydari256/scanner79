import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, SafeAreaView, ActivityIndicator, Image, BackHandler, Animated, Pressable, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import { LoginAdminTrack } from '../../constants/api';
import WebView from 'react-native-webview';
import { BASE_URL_IMG } from '../../components/shared/services';
import { saveData } from '../Login';
import { useDispatch } from 'react-redux';
import { userLogin } from '@app/redux/actions';
import { UserDataType } from '../Home/types';

const LoginByQRCode = (props) => {
    const webViewRef = useRef(null);
    const pdfUrlRef = useRef("");
    const scanningRef = useRef(false);

    // const openAndPrintPDF = () => {
    //     if (webViewRef.current && pdfUrlRef.current) {
    //         webViewRef.current.injectJavaScript("window.location.href = '" + pdfUrlRef.current + "';"); // بارگذاری PDF
    //         setTimeout(() => {
    //             webViewRef.current.injectJavaScript("window.print();"); // اجرای پرینت
    //         }, 2000); // تاخیر برای اطمینان از بارگذاری PDF
    //     }
    // };
    const { hallName, eventId, Print, EventName, StartDate } = props.route.params.item || 'null';
    // console.log(hallName);


    const isTablet = Dimensions.get('window').width >= 768;
    const camera = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [registrationId, setRegistrationId] = useState('');
    const [data, setData] = useState([]);
    const [scanning, setScanning] = useState(false); // برای کنترل وضعیت اسکن
    const [loading, setLoading] = useState(true);
    const [isSucsessScan, setIsSucsessScan] = useState(false);
    const [printing, setPrinting] = useState(false);
    const [checkIn, setCheckIn] = useState(null);
    const [errorText, setErrorText] = useState('');

    // const devices = useCameraDevices();
    // const device = devices.back;
    const [cameraKey, setCameraKey] = useState(0);
    const [isFrontCamera, setIsFrontCamera] = useState(false); // حالت پیش‌فرض دوربین عقب

    const device = useCameraDevice(isFrontCamera ? 'front' : 'back');

    const [torchEnabled, setTorchEnabled] = useState(false);
    const translateY = useRef(new Animated.Value(0)).current; // مقدار اولیه پایین صفحه
  const dispatch = useDispatch();

    const onLoginPress = (data: UserDataType) => {
        dispatch(userLogin(data));
    };
    useEffect(() => {
        const requestCameraPermission = async () => {
            try {
                if (Platform.OS === 'android') {
                    // Request Camera Permission for Android
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'This app needs access to your camera to take pictures.',
                            buttonPositive: 'OK',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Camera permission granted for Android');
                        resetCamera()
                        setHasPermission(true);
                        // setTorchEnabled(false); // Enable torch after permission is granted
                        setIsCameraActive(true); // Enable torch after permission is granted
                    } else {
                        console.warn('Camera permission denied for Android');
                    }
                } else {
                    // Request Camera Permission for iOS
                    const permission = await request(PERMISSIONS.IOS.CAMERA);
                    if (permission === RESULTS.GRANTED) {
                        console.log('Camera permission granted for iOS');
                        resetCamera()
                        setHasPermission(true);
                        // setTorchEnabled(false); // 
                        setIsCameraActive(true); // Enable torch after permission is granted
                    } else {
                        console.warn('Camera permission denied for iOS');
                    }
                }
            } catch (error) {
                console.error('Error requesting camera permission:', error);
            }
        };

        const checkCameraPermission = async () => {
            try {
                if (Platform.OS === 'android') {
                    const granted = await PermissionsAndroid.check(
                        PermissionsAndroid.PERMISSIONS.CAMERA
                    );
                    if (granted) {
                        console.log('Camera permission already granted for Android');
                        // setTorchEnabled(false); // Enable torch if permission is already granted
                    } else {
                        await requestCameraPermission();
                    }
                } else {
                    const result = await check(PERMISSIONS.IOS.CAMERA);
                    if (result === RESULTS.GRANTED) {
                        console.log('Camera permission already granted for iOS');
                        setHasPermission(true);
                        // setTorchEnabled(false); // Enable torch if permission is already granted
                    } else {
                        await requestCameraPermission();
                    }
                }
            } catch (error) {
                console.error('Error checking camera permission:', error);
            }
        };

        checkCameraPermission();
    }, []);
    const removeDoubleQuotes = (value) => {
        if (typeof value === 'string') {
            return value.replace(/"/g, ''); // حذف همه دابل کوتیشن‌ها
        }
        return value; // اگر رشته نبود، مقدار اصلی را برگردان
    };
    const login = async (data) => {

        saveData('Token', data.Answer); // 
        saveData('EventId', data.EventId);
        saveData('EventName', data.EventName);
        saveData('StartDate', data.StartDate);
        saveData('HallName', data.Type);
        saveData('Print', data.Print);
           onLoginPress({
                    username: data.Answer
                })
        // props.navigation.navigate('Scan', {
        //     item: {
        //         'hallName': data.Type,
        //         'eventId': data.EventId,
        //         'Print': data.Print,
        //         'Token': data.Answer,
        //         'EventName': data.EventName,
        //         'StartDate': data.StartDate,

        //     }
        // });

    }
    const getDataApi = async (qrCode) => {
        if (!qrCode) {
            setTimeout(() => {
                setScanning(false)
                setIsSucsessScan(false)
            }, 1500);
            return;
        }
        setLoading(true);
        // console.log(RegId, EventId, HallName);

        try {
            const response = await LoginAdminTrack('', '', '', qrCode); //
            // console.log(response);
            // console.log(response);
            setLoading(false)
            if (response.Result === 'Success') {
                playAudio();
                setData(response)
                setCheckIn(true)
                setErrorText('')
                setTimeout(() => {
                    setIsSucsessScan(false)
                }, 1000);
                setTimeout(() => {
                    setScanning(false); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                }, 1500);
                setTimeout(() => {
                    login(response)
                    // فعال کردن دوباره اسکنر پس از 2 ثانیه
                }, 2000);
            } else {
                console.log('error not login');

                playAudioError()
                setTimeout(() => {
                    setScanning(false); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                }, 2500);
                setCheckIn(false)
                setErrorText(response.Answer)
                setIsSucsessScan(false)
            }



        } catch (err) {
            playAudioError()

            scanningRef.current = false;

            console.error('Request failed ', err);
            setLoading(false)
            setTimeout(() => {
                setScanning(true); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                setIsSucsessScan(false)
            }, 1500);
            // console.log('error');

        }
    }
    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
            if (!scanning && !isSucsessScan && !printing && scanningRef.current === false) {
                // اسکن را فقط در صورتی انجام بده که اسکن فعالی باشد
                // console.log(`Scanned ${codes.length} codes!`);
                // console.log(codes);
                if (codes[0].type === 'qr') {
                    
                    setScanning(true)
                    setIsSucsessScan(true)
                    setRegistrationId(codes[0].value)
                    getDataApi(codes[0].value)

                }
                // غیر فعال کردن اسکنر برای 2 ثانیه
                // setTimeout(() => {
                //     setScanning(false);
                // }, 1500);
            }
        }
    });

    const resetCamera = async () => {
        if (camera.current) {
            try {
                setCameraKey((prevKey) => prevKey + 1);
                console.log('Camera reset successfully.');
            } catch (error) {
                console.error('Error resetting camera:', error);
            }
        }
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                BackHandler.exitApp()
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);

    // const openPDF = () => {
    //     if (webViewRef.current && pdfUrlRef.current) {
    //         // بارگذاری PDF با استفاده از URL
    //         webViewRef.current.injectJavaScript(`window.location.href = '${pdfUrlRef.current}';`);
    //     }
    // };

    const [isLoadedPdf, setIsLoadedPdf] = useState(false);

   
   
    const webViewRefMusicError = useRef(null);

    const audioUrlError = 'https://admin.plusregistration.com/images/Erorr.mp3'
    const htmlError = `
    <html>
      <body>
        <audio id="audio">
          <source src="${audioUrlError}" type="audio/mp3">
        </audio>
        <script>
          window.playAudio = function() {
            document.getElementById('audio').play();
          };
          window.pauseAudio = function() {
            document.getElementById('audio').pause();
          };
        </script>
      </body>
    </html>
  `;

    const playAudioError = () => {
        webViewRefMusicError.current?.injectJavaScript(`window.playAudio();`);
    };

    const pauseAudioError = () => {
        webViewRefMusicError.current?.injectJavaScript(`window.pauseAudio();`);
    };

    const webViewRefMusic = useRef(null);

    const audioUrl = 'https://admin.plusregistration.com/images/Login.mp3'
    const html = `
    <html>
      <body>
        <audio id="audio">
          <source src="${audioUrl}" type="audio/mp3">
        </audio>
        <script>
          window.playAudio = function() {
            document.getElementById('audio').play();
          };
          window.pauseAudio = function() {
            document.getElementById('audio').pause();
          };
        </script>
      </body>
    </html>
  `;

    const playAudio = () => {
        webViewRefMusic.current?.injectJavaScript(`window.playAudio();`);
    };

  ;
    const conferenceDate = new Date(StartDate);
    // console.log(StartDate, 'conferenceDate');

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = conferenceDate.toLocaleDateString('en-GB', options);
    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#fff',
        }}>

            <View style={{
                alignSelf: 'center',
                backgroundColor: '#33333353',
                width: SCREEN_WIDTH * 0.98,
                height: SCREEN_HEIGHT * 0.10,
                top: SCREEN_HEIGHT * 0.008,
                position: 'absolute',
                zIndex: 102,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    alignSelf: 'center'
                }}>
                    <View style={{ top: '5%' }}>
                        <TouchableOpacity key={1} onPress={() => {
                            props.navigation.goBack();
                        }}>
                            <Image
                                style={{
                                    width: SCREEN_WIDTH * 0.15,
                                    height: SCREEN_WIDTH * 0.15,
                                    resizeMode: 'stretch'

                                }}
                                source={require('../../assets/img/back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ top: '2%' }}>

                    </View>
                    <View style={{ top: '5%' }}>
                        {
                            data.Banner ?
                                null
                                :
                                <TouchableOpacity key={1} onPress={() => {
                                    setIsFrontCamera(!isFrontCamera)
                                    // playAudio()
                                }}>
                                    <Image
                                        style={{
                                            width: SCREEN_WIDTH * 0.15,
                                            height: SCREEN_WIDTH * 0.15,
                                            resizeMode: 'stretch'

                                        }}
                                        source={require('../../assets/img/isFrontCamera.png')} />
                                </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
            <View style={{
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                position: 'absolute',
                zIndex: !printing ? 101 : 0,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {data.Banner ?
                    null
                    :
                    <Image
                        style={{
                            width: '50%',
                            height: '50%'
                        }}
                        source={isSucsessScan ? require('../../assets/img/check.gif') : require('../../assets/img/frameScaner.png')} />
                }

            </View>
            <View style={styles.container}>
                {/* QR Code Section */}
                <View style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: 'hidden',
                    height: isTablet ? SCREEN_HEIGHT * 0.65 : SCREEN_HEIGHT * 0.5,
                }}>
                    {
                        isCameraActive && device ?
                            data.Banner ?
                                <Image source={{ uri: BASE_URL_IMG + data.Banner }} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
                                :
                                <Camera
                                    key={cameraKey}
                                    ref={camera}
                                    style={StyleSheet.absoluteFill}
                                    device={device}
                                    isActive={true}
                                    photo={true}
                                    torch={torchEnabled ? 'on' : 'off'}
                                    codeScanner={codeScanner}

                                />
                            :
                            <Text style={{ fontSize: 18, marginBottom: 20 }}>
                                {hasPermission ? 'Camera is ready to use!' : 'Requesting Camera Permission...'}
                            </Text>
                    }
                </View>
                <Animated.View style={[{
                    backgroundColor: '#f8f8f8',
                    height: isTablet ? SCREEN_HEIGHT * 0.65 : SCREEN_HEIGHT * 0.5,
                    width: SCREEN_WIDTH,
                    position: 'absolute',
                    top: isTablet ? SCREEN_HEIGHT * 0.65 : SCREEN_HEIGHT * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }, { transform: [{ translateY }] }]}>

                    <Image
                        style={{
                            width: '98%',
                            height: '100%'
                        }}
                        source={require('../../assets/img/printing.gif')} />
                </Animated.View>
                <View style={[styles.qrSection, isTablet && styles.infoSectionTablet, { width: isTablet ? 'auto' : '100%' }]}>
                    {/* Info Section */}

                    <View style={[styles.infoSection]}>
                        <Text style={styles.headerText}>Email : </Text>
                        <Text style={styles.subHeaderText}>{data.Answer || ''}</Text>

                        <Text style={styles.instructionText}>
                            {data.Result || ' Hold your badge with the QR code facing the camera to check in.'}
                        </Text>

                    </View>
                    {/* Check-In Section */}
                    {
                        !loading ?
                            !errorText.length > 0
                                ?
                                <View style={[styles.checkInSection, {
                                    backgroundColor: isTablet ? '#5c40cc' : '#e0f7fa',
                                    width: isTablet ? 'auto' : '100%'
                                }]}>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        borderRadius: 25,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={[styles.checkInText, {
                                            color: checkIn ? '#15d46b' : '#e5223c'
                                        }]}>CHECK-IN</Text>

                                    </View>
                                    <Text style={[styles.nameText, { color: isTablet ? '#f4f4f4' : '#555' }]}>{'Email: ' + data.Answer || 'User Name'}</Text>
                                    <Text style={[styles.registrationId, { color: isTablet ? '#f4f4f4' : '#555' }]}>{'Code: ' + data.EventId || 'Scanning'}</Text>
                                    <Text style={[styles.dateTime, { color: isTablet ? '#f4f4f4' : '#555' }]}>{'EventName' + data.EventName || ''}</Text>
                                    <Text style={[styles.roleText, { color: isTablet ? '#f4f4f4' : '#555' }]}>Registration Type: {data.Type || ''}</Text>
                                    {
                                        // data.Result === 'Success' ?
                                        //     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                        //         <TouchableOpacity style={styles.loginButton}
                                        //             onPress={() => {
                                        //                 setCheckIn(false);
                                        //                 setLoading(true);
                                        //                 setErrorText('');
                                        //                 setData({});
                                        //                 setCameraKey(cameraKey + 1);
                                        //             }}
                                        //         >
                                        //             <Text style={styles.loginButtonText}>CANCEL</Text>
                                        //         </TouchableOpacity>
                                        //         <TouchableOpacity style={styles.loginButton} onPress={login}>
                                        //             <Text style={styles.loginButtonText}>LOGIN </Text>
                                        //         </TouchableOpacity>
                                        //     </View>
                                        //     :
                                        //     <View>

                                        //     </View>
                                    }

                                </View>
                                :

                                <View style={[styles.checkInSection, {
                                    backgroundColor: isTablet ? '#5c40cc' : '#e0f7fa',
                                    width: isTablet ? 'auto' : '100%'
                                }]}>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        borderRadius: 25,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={[styles.checkInText, {
                                            color: checkIn ? '#15d46b' : '#e5223c'
                                        }]}>CHECK-IN</Text>

                                    </View>
                                    <Text style={[styles.nameText, { color: isTablet ? '#f4f4f4' : '#555' }]}>
                                        {errorText}
                                    </Text>
                                </View>
                            :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '10%'
                            }}>
                                <Text>WATING</Text>
                                <ActivityIndicator />
                            </View>
                    }

                </View>

            </View>

            <WebView ref={webViewRef} originWhitelist={["*"]}
                source={{ uri: pdfUrlRef.current }} // مستقیماً URL را بارگذاری کنید
                onLoadEnd={() => {
                    console.log('WebView load ended');
                    setIsLoadedPdf(true);
                }}
            />
            <WebView
                ref={webViewRefMusic}
                originWhitelist={['*']}
                source={{ html }}
                style={{ height: 0, width: 0 }}
                mediaPlaybackRequiresUserAction={false}//
            />
            <WebView
                ref={webViewRefMusicError}
                originWhitelist={['*']}
                source={{ htmlError }}
                style={{ height: 0, width: 0 }}
                mediaPlaybackRequiresUserAction={false}//
            />
        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    loginButton: {
        marginTop: 32,
        width: '30%',
        height: 40,
        backgroundColor: '#377DFF', // Blue button color
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
    },
    container: {
        flexGrow: 1,
        padding: '1%',
        backgroundColor: '#f4f4f4',


    },
    qrSection: {
        alignItems: 'flex-start',
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 16,
        bottom: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%'
    },
    qrSectionTablet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    qrText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    qrSubText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    infoSection: {
        padding: 5,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        marginBottom: 6,
    },
    infoSectionTablet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    trackText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    instructionText: {
        fontSize: 11,
        color: '#555',
        marginBottom: 1,
    },
    statsContainer: {
        marginTop: 1,
    },
    statText: {
        fontSize: 14,
        color: '#333',
    },
    statValue: {
        fontWeight: 'bold',
    },
    checkInSection: {
        padding: 16,
        borderRadius: 8,
        alignSelf: 'center',
        width: 'auto',
        height: '100%'
    },
    checkInSectionTablet: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkInText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00796b',
        marginBottom: 8,
        alignSelf: 'center'
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    registrationId: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    dateTime: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    roleText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginByQRCode;
