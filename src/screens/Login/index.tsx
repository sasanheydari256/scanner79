import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform, Keyboard, Animated, PermissionsAndroid } from 'react-native';
import ThemedLoadingSpinner from '../../components/custom/Cloading';
import { LoginAdminTrack } from '../../constants/api';
import CustomModal from '../../components/shared/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';
import { UserDataType } from '../Home/types';
import { userLogin } from '@app/redux/actions';

export const saveData = async (key, value) => {
    try {
        let valueToStore = value;
        if (typeof value !== 'string') {
            valueToStore = JSON.stringify(value);
        }
        await AsyncStorage.setItem(key, valueToStore);
        console.log(`Data saved successfully for key: ${key}`);
    } catch (error) {
        console.error('Failed to save data:', error);
    }
};
export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            try {
                // سعی می‌کند مقدار را از JSON به نوع اصلی تبدیل کند
                return JSON.parse(value);
            } catch (e) {
                // اگر تبدیل JSON ناموفق بود، مقدار را به صورت رشته برمی‌گرداند
                return value;
            }
        }
        return null;
    } catch (error) {
        console.error('Failed to retrieve data:', error);
        return null;
    }
};
const LoginScreen = (props) => {

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
                    } else {
                        console.warn('Camera permission denied for Android');
                    }
                } else {
                    // Request Camera Permission for iOS
                    const permission = await request(PERMISSIONS.IOS.CAMERA);
                    if (permission === RESULTS.GRANTED) {
                        console.log('Camera permission granted for iOS');
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
                    } else {
                        await requestCameraPermission();
                    }
                } else {
                    const result = await check(PERMISSIONS.IOS.CAMERA);
                    if (result === RESULTS.GRANTED) {
                        console.log('Camera permission already granted for iOS');
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
    useEffect(() => {
        const timeout = setTimeout(() => {
            // Safe to call native modules here
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);
    const isTablet = Dimensions.get('window').width >= 768;

    const EventId = 104;
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState(0);
    const [modalvisable, setModelvisable] = useState(false);
    const [messageState, setMessageState] = useState('Please fill in both email and password.');

    const loginByScan = async () => {
        props.navigation.navigate('LoginByQRCode', {
            item: {}
        });
    }
    const dispatch = useDispatch();

    const onLoginPress = (data: UserDataType) => {
        dispatch(userLogin(data));
    };
    const login = async () => {
        if (!email || !password) {

            setMessageState('Please fill in both email and password.')
            setModelvisable(true)
            // alert("Please fill in both email and password");
            return;
        }
        setLoading(true);
        try {

            const response = await LoginAdminTrack(code, email, password); //
            console.log("Login successful:", response);
            if (response === null || response.Result === 'Failed') {
                setMessageState(response.Answer || 'Login failed. Please try again.')
                setModelvisable(true)
            } else {
                // console.log(response);

                saveData('Token', response.Answer); // 
                saveData('EventId', response.EventId);
                saveData('EventName', response.EventName);
                saveData('StartDate', response.StartDate);
                saveData('HallName', response.Type);
                saveData('Print', response.Print);
                onLoginPress({
                    username: response.Answer
                })
                // props.navigation.navigate('Scan', {
                //     item: {
                //         'hallName': response.Type,
                //         'eventId': response.EventId,
                //         'Print': response.Print,
                //         'Token': response.Answer,
                //         'EventName': response.EventName,
                //         'StartDate': response.StartDate,

                //     }
                // });
            }

        } catch (error) {
            console.error("Login failed:", error);
            setMessageState('Login failed. Please try again.')
            setModelvisable(true)
            // alert("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            const height = e.endCoordinates.height;
            setKeyboardHeight(height);

            Animated.timing(translateY, {
                toValue: -height + 50, // صفحه را به اندازه ارتفاع کیبورد بالا ببرد
                duration: 300,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    y: e.endCoordinates.height + 50, // اضافه کردن ۵۰ پیکسل بیشتر
                    animated: true,
                });
            }, 100); // تأخیر کوچک برای هماهنگ شدن اسکرول
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);

            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#E8F0FF', // Background color similar to light blue
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CustomModal
                        visible={modalvisable}
                        message={messageState}
                        onClose={() => { setModelvisable(false) }}
                        onPressLogin={() => {
                            setModelvisable(false);
                        }} />
                    {loading && <ThemedLoadingSpinner />}

                    <Image style={{
                        height: SCREEN_HEIGHT * 0.3,
                        width: SCREEN_WIDTH * 0.6,
                        resizeMode: 'contain',
                    }} source={require('../../assets/img/Scan-qr-code.png')} />

                    <View style={[styles.container, { width: isTablet ? '50%' : '80%' }]}>
                        <Text style={styles.title}>
                            WELCOME TO <Text style={styles.highlight}>CHECKIN+</Text>
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>EMAIL OR USERNAME</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#AAB2C0"
                                value={email}
                                onChangeText={setEmail} // 
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>PASSWORD</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#AAB2C0"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword} // 
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Pin</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Pin"
                                placeholderTextColor="#AAB2C0"
                                value={code}
                                onChangeText={setCode} // 
                            />
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={login}>
                            <Text style={styles.loginButtonText}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={loginByScan}>
                            <Text style={styles.loginButtonText}>LOGIN By QR Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

    );
};
const styles = StyleSheet.create({
    container: {
        // height:'80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#394867',
        marginBottom: 32,
    },
    highlight: {
        color: '#6C63FF', // Highlight color (purple)
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#394867',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#F5F7FB', // Light background for inputs
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6C63FF', // Border color
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#394867',
    },
    loginButton: {
        marginTop: 32,
        width: '100%',
        height: 50,
        backgroundColor: '#377DFF', // Blue button color
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
