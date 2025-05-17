import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, SafeAreaView, ActivityIndicator, Image, BackHandler, Animated, Pressable, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import { AccessOrDeniedEvent, DownloadEBadge } from '../../constants/api';
import Footer from './footer';
import WebView from 'react-native-webview';
import { styles } from './styles';
import { userLogout } from '@app/redux/actions';
import { useDispatch } from 'react-redux';
import { checkInternetStatus } from './checkInternetStatus';
import NetInfo from '@react-native-community/netinfo';
import { addOfflineData, clearOfflineData } from '../../redux/reducers/offlineDataSlice';

const Scanner = (props) => {
    const webViewRef = useRef(null);
    const pdfUrlRef = useRef("");
    const scanningRef = useRef(false);

    const { hallName, eventId, Print, EventName, StartDate } = props.route.params.item || 'null';


    const isTablet = Dimensions.get('window').width >= 768;
    const camera = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [data, setData] = useState([]);
    const [scanning, setScanning] = useState(false); // برای کنترل وضعیت اسکن
    const [loading, setLoading] = useState(true);
    const [isSucsessScan, setIsSucsessScan] = useState(false);
    const [printing, setPrinting] = useState(false);
    const [checkIn, setCheckIn] = useState(null);
    const [errorText, setErrorText] = useState('');
    const [position, setPosition] = useState(null);

    // const devices = useCameraDevices();
    // const device = devices.back;
    const [cameraKey, setCameraKey] = useState(1);
    const [isFrontCamera, setIsFrontCamera] = useState(false); // حالت پیش‌فرض دوربین عقب

    const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
    const dispatch = useDispatch();

    const [torchEnabled, setTorchEnabled] = useState(false);
    const translateY = useRef(new Animated.Value(0)).current; // مقدار اولیه پایین صفحه
    const onLogoutPress = () => {
        dispatch(userLogout());
    };

    const showViewPrint = () => {
        Animated.timing(translateY, {
            toValue: isTablet ? -SCREEN_HEIGHT * 0.65 : -SCREEN_HEIGHT * 0.5, // نمایش در موقعیت اصلی
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const hideViewPrint = () => {
        Animated.timing(translateY, {
            toValue: 0, // نمایش در موقعیت اصلی
            duration: 500,
            useNativeDriver: true,
        }).start();
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
                        resetCamera()
                        setHasPermission(true);
                    } else {
                        await requestCameraPermission();
                    }
                } else {
                    const result = await check(PERMISSIONS.IOS.CAMERA);
                    if (result === RESULTS.GRANTED) {
                        console.log('Camera permission already granted for iOS');
                        setHasPermission(true);
                        resetCamera()
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

    const getDataApi = async (RegId, EventId, HallName) => {
        // console.log(regId, EventId, HallName);
        if (!RegId || !EventId || !HallName) {
            setTimeout(() => {
                setScanning(false)
                setIsSucsessScan(false)
            }, 1500);
            return;
        }
        setLoading(true);
        // console.log(RegId, EventId, HallName);
        try {
            const response = await AccessOrDeniedEvent(RegId, EventId, HallName); //
            if (Print) {
                scanningRef.current = true;

                const responseDownloadEBadge = await DownloadEBadge(EventId, RegId);
                setPrinting(true)
                showViewPrint()
                // console.log(responseDownloadEBadge, 'responseDownloadEBadge');

                if (responseDownloadEBadge.Result === 'Failed') {
                    playAudioError()
                    scanningRef.current = false;
                    setPrinting(false)
                    hideViewPrint()
                    setErrorText(responseDownloadEBadge.ErrorMessage)
                    setTimeout(() => {
                        setCheckIn(false)
                        setScanning(false); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                        setIsSucsessScan(false)
                    }, 1500);

                } else {
                    playAudio();
                    pdfUrlRef.current = responseDownloadEBadge.Url
                    openPDF()
                    // console.log();
                    setLoading(false)
                    setData(response.Answer)
                    setCheckIn(true)
                    setErrorText('')
                    setTimeout(() => {
                        setCheckIn(false)
                        setScanning(false); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                        setIsSucsessScan(false)
                    }, 1500);
                    setTimeout(() => {
                        // console.log('hide');
                        // setPrinting(false)
                        hideViewPrint();
                    }, 1500);
                }
            } else {
                // const response = await AccessOrDeniedEvent(RegId, EventId, HallName); //
                // console.log(response);
                setLoading(false)
                if (response.Result === 'Success') {
                    playAudio();
                    setData(response.Answer)
                    setCheckIn(true)
                    setErrorText('')
                    setTimeout(() => {
                        setIsSucsessScan(false)
                    }, 1000);
                    setTimeout(() => {
                        setScanning(false); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                    }, 1500);
                } else {
                    console.log('error not login');

                    playAudioError()
                    setTimeout(() => {
                        setScanning(false); // فعال کردن دوباره اسکنر پس از 2 ثانیه
                    }, 2500);
                    setCheckIn(false)
                    setErrorText(response.Error)
                    setIsSucsessScan(false)
                }
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
    const saveOfflineData = (regId, eventId, hallName) => {
        const dataToSave = {
            regId,
            eventId,
            hallName,
            savedAt: new Date().toISOString(), // می‌تونی زمان ذخیره رو هم ذخیره کنی
        };
        dispatch(addOfflineData(dataToSave));
        setTimeout(() => {
            setScanning(false);
        }, 2000);
    };
    const clearOffline = () => {
        dispatch(clearOfflineData());
    };
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            if (!scanning && !isSucsessScan && !printing && scanningRef.current === false) {
                // اسکن را فقط در صورتی انجام بده که اسکن فعالی باشد
                // console.log(`Scanned ${codes.length} codes!`);
                // console.log(codes);
                if (codes[0].type === 'qr') {
                    // console.log(codes[0]);
                    setPosition(codes[0])
                    const cleanedRegId = removeDoubleQuotes(codes[0].value);
                    const cleanedEventId = removeDoubleQuotes(eventId);
                    const cleanedHallName = removeDoubleQuotes(hallName);
                    setScanning(true)
                    setIsSucsessScan(true)
                    setRegistrationId(codes[0].value)
                    if (status === 'online') {
                        getDataApi(cleanedRegId, cleanedEventId, cleanedHallName)
                    } else {
                        saveOfflineData(cleanedRegId, cleanedEventId, cleanedHallName)

                    }
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
    const [isLoadedPdf, setIsLoadedPdf] = useState(false);

    const openPDF = async () => {
        if (webViewRef.current && pdfUrlRef.current) {
            console.log('Injecting JavaScript to load PDF...');
            webViewRef.current.injectJavaScript(`window.location.href = '${pdfUrlRef.current}';`);

            // منتظر بمانید تا isLoaded به true تغییر کند
            await new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (isLoadedPdf) {
                        console.log('PDF loaded successfully');
                        webViewRef.current.injectJavaScript("window.print();");
                        setTimeout(() => {
                            console.log('handleWebViewLoa Hide');
                            setPrinting(false)
                            scanningRef.current = false;
                            setScanning(true);
                        }, 4500);
                        clearInterval(interval);
                        resolve();
                    }
                }, 100); // هر 100 میلی‌ثانیه بررسی کنید
            });
        }
    };

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

    const pauseAudio = () => {
        webViewRefMusic.current?.injectJavaScript(`window.pauseAudio();`);
    };
    const conferenceDate = new Date(StartDate);
    // console.log(StartDate, 'conferenceDate');

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = conferenceDate.toLocaleDateString('en-GB', options);
    const [status, setStatus] = useState('offline'); // offline | online | poor_signal
    const [connectionType, setConnectionType] = useState(null); // wifi | cellular | none | unknown

    useEffect(() => {
        // دریافت اولیه وضعیت اینترنت
        const fetchStatus = async () => {
            const currentStatus = await checkInternetStatus();
            setStatus(currentStatus);

            const state = await NetInfo.fetch();
            setConnectionType(state.type);
        };

        fetchStatus();

        // شنود تغییرات اتصال
        const unsubscribe = NetInfo.addEventListener(async (state) => {
            setConnectionType(state.type);

            if (!state.isConnected || !state.isInternetReachable) {
                setStatus('offline');
                return;
            }

            if (state.type === 'cellular') {
                const strength = state.details?.strength;
                if (strength !== undefined && strength <= 1) {
                    setStatus('poor_signal');
                    return;
                }
            }

            setStatus('online');
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (hasPermission) {
            const interval = setInterval(async () => {
                if (device) {
                    console.log('Camera reset successfully.');
                    const devices = await Camera.getAvailableCameraDevices();
                    setCameraKey((prevKey) => prevKey + 1);
                    console.log(device);

                    clearInterval(interval);
                }
            }, 1100);
            return () => clearInterval(interval);
        }
    }, [hasPermission, device]);
    useEffect(() => {
        if (device) {
            console.log('Camera device ready:', device.name);
        } else {
            console.log('Camera device is null');
        }
    }, [device]);
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
                    </View>
                    <View style={{ top: '2%' }}>

                    </View>
                    <View style={{ top: '6%' }}>
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
                {
                    !isSucsessScan &&
                    <Image
                        style={{
                            width: position ? position.frame.width * 1.3 : '50%',
                            height: position ? position.frame.height * 1.3 : '50%',
                            position: 'absolute',
                            top: position ? (position.frame.y / 1.8) : '25%', // مقدار پیش‌فرض برای top
                            left: position ? (position.frame.x - (position.frame.width * 1.2)) : '25%'
                        }}
                        source={require('../../assets/img/frameScaner.png')} />
                }

                {
                    isSucsessScan &&
                    <Image
                        style={{
                            width: '50%',
                            height: '50%'
                        }}
                        source={require('../../assets/img/check.gif')} />
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
                        hasPermission && isCameraActive && device ? (
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
                        ) : (
                            <Text style={{ fontSize: 18, marginBottom: 20 }}>
                                {hasPermission
                                    ? 'Loading camera device...'
                                    : 'Requesting Camera Permission...'}
                            </Text>
                        )
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
                        <Text style={styles.headerText}>HALL SCANNING</Text>
                        <Text style={styles.subHeaderText}>{EventName || ''}</Text>
                        <Text style={styles.trackText}>{hallName || 'no Data'}</Text>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Text style={styles.instructionText}>
                            Hold your badge with the QR code facing the camera to check in.
                        </Text>
                        {isTablet &&
                            <View style={styles.statsContainer}>
                                <Text style={styles.statText}>Total Attendees: <Text style={styles.statValue}>{data.TotalAttendee}</Text></Text>
                                <Text style={styles.statText}>Total Check-In: <Text style={styles.statValue}>{data.Checkin}</Text></Text>
                                <Text style={styles.statText}>Pending: <Text style={styles.statValue}>{data.Pending}</Text></Text>
                            </View>
                        }
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
                                    <Text style={[styles.nameText, { color: isTablet ? '#f4f4f4' : '#555' }]}>{data.UserName || 'User Name'}</Text>
                                    <Text style={[styles.registrationId, { color: isTablet ? '#f4f4f4' : '#555' }]}>{data.RegId || 'Scanning'}</Text>
                                    <Text style={[styles.dateTime, { color: isTablet ? '#f4f4f4' : '#555' }]}>{data.LastUpdate || ''}</Text>
                                    <Text style={[styles.roleText, { color: isTablet ? '#f4f4f4' : '#555' }]}>Registration Type: {data.Role || ''}</Text>
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
            <Footer
                status={status}
                connectionType={connectionType}
                {...props} onPressLogout={() => {
                    // setHasPermission(false);
                    // setIsCameraActive(true);
                    // setRegistrationId('');
                    // setData([]);
                    // setScanning(false);
                    // setLoading(true);
                    // setIsSucsessScan(false);
                    // setPrinting(false);
                    // setCheckIn(null);
                    // setErrorText('');
                    // setPosition(null);
                    // setCameraKey(0);
                    // setIsFrontCamera(false);
                    // setTorchEnabled(false);
                    // onLogoutPress()

                }} />

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

export default Scanner;
