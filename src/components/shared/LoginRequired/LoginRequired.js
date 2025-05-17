import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Keyboard } from 'react-native';
import GlowingButton from '../../custom/GlowingButton';
import BottomDrawer from '../bottomDrawer';
import LoginComponent from '../../../screens/Login/LoginComponent';
import ShakingError from '../../../screens/Login/ShakingError';
import { useTheme } from '../../../theme/ThemeProvider';
import { SCREEN_HEIGHT } from '../../../constants/Screen';
import { connect } from 'react-redux';
import ThemedLoadingSpinner from '../../custom/Cloading';
import { fetchEventData, navigateToTabs } from '../../../screens/Splash';
import { requestLogin } from '../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetApplicationSetting } from '../../../constants/api';

const LoginRequired = (props) => {

    const { theme } = useTheme();
    useEffect(() => {
        // console.log(props);

    }, [theme]);

    const [isDrawerVisible, setDrawerVisible] = useState(props.LoginRequiredDrawerVisible || false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [Email, setemail] = useState('');
    const [loading, setLoading] = useState(false);
    const [Erorre, setErorre] = useState(false);
    const [textError, setTextError] = useState('');
    const [restart, setRestart] = useState(false);

    const [RegisterId, setRegisterId] = useState('');
    const triggerError = () => {
        setErorre(true);
        setRestart(prev => prev + 1);
    };
    useEffect(() => {
        setDrawerVisible(props.LoginRequiredDrawerVisible || false); // همگام‌سازی مقدار با prop
    }, [props.LoginRequiredDrawerVisible]);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const handleLogin = () => {
        // عمل مورد نظر برای ورود
        console.log('Log in button pressed');
    };

    const Login = async () => {
        // setModalVisible(true)

        const EventId =
            props.EventId !== undefined
                ? props.EventId
                : await AsyncStorage.getItem('eventId');

        if (
            EventId !== undefined &&
            EventId !== null &&
            EventId !== 'undefined' &&
            EventId !== undefined &&
            EventId !== 'null'
        ) {
            requestLogin(
                'POST',
                { EventId: EventId, Email: Email, RegisterId },
                () => {
                    setLoading(true);
                },
                () => { },
                async response => {
                    // console.log(response, 'response');
                    if (response.Result == 'Success') {
                        // if (event?.Splash) {
                        //     await AsyncStorage.setItem('Splash', event?.Splash);
                        // }
                        await AsyncStorage.setItem('Type', response.Type); //Physical
                        await AsyncStorage.setItem('Token', response.Answer);

                        props.chengToken(Email);
                        if (typeof EventId == 'string') {
                            await AsyncStorage.setItem('eventId', EventId);
                        } else {
                            await AsyncStorage.setItem('eventId', JSON.stringify(EventId));
                        }
                        const AppSettings = await GetApplicationSetting();
                        if (AppSettings.Answer.LockEvent) {
                            await AsyncStorage.setItem('LockEvent', 'LoginRequired');
                        } else {
                            await AsyncStorage.setItem('LockEvent', 'NoLock');
                        }

                        props.chengeEventId(EventId)
                        props.chengeLockEvent('LoginRequired');
                        // props.chengeIsLive(event.IsLive)

                        const eventData = await fetchEventData(EventId, Email);
                        // console.log(eventData,'eventData');

                        setTimeout(() => navigateToTabs(props, eventData, AppSettings, EventId), 100);

                        setLoading(false);
                    } else {
                        setTextError(response.Answer);
                        setErorre(true);
                    }
                    setLoading(false);
                },
                err => {
                    // console.log(JSON.stringify(err));
                    setLoading(false);
                },
            );
        } else {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            {loading && <ThemedLoadingSpinner />}
            <Text style={styles.text}>
                See what's happening and plan where to go next.
            </Text>
            <View style={styles.buttonContainer}>
                {/* <Button title="Log in" onPress={handleLogin} color="#00000080" /> */}
                <GlowingButton onPress={() => {
                    // console.log('Button Pressed2!');
                    setDrawerVisible(true)
                    

                }} />
            </View>
            <BottomDrawer
                heightX={0.59}
                expandHeight={keyboardVisible}
                backgroundColor={'#585df9'}
                isVisible={isDrawerVisible}
                onClose={() => {
                    props.onCloseDrawerVisible && props.onCloseDrawerVisible(false)
                    setDrawerVisible(false)
                } }>
                <View style={{
                    justifyContent: 'flex-start',
                    height: SCREEN_HEIGHT * 0.7,
                    // backgroundColor: '#fff',
                    top: '3%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                    <LoginComponent
                        theme={theme}
                        loginType={1}
                        onClickLogin={() => {
                            // console.log(props.EventId);

                            setRestart(!restart)
                            // props.navigation.navigate('HomeScreenEvent', { event: [] });
                            if (Email.length > 4) {
                                Login()
                            } else {
                                triggerError()
                                setErorre(true)
                                setTextError('Please Enter Email')
                            }
                        }}
                        onCancel={() => {
                            setDrawerVisible(false)
                            props.onCloseDrawerVisible && props.onCloseDrawerVisible(false)
                        }}
                        setRegistration={(e) => {
                            setRegisterId(e);
                            setErorre(false);
                        }}
                        setEmail={(e) => {
                            setemail(e);
                            setErorre(false);
                        }}
                    />
                    {/* <View style={{ backgroundColor: '#fff', alignSelf: 'center', marginTop: '15%' }}>
                        <CText style={{ color: '#777' }}>
                            {Erorre && Erorre}
                        </CText>
                    </View> */}
                    <ShakingError
                        error={Erorre}
                        text={textError}
                        restart={restart}
                    // onEnd={() => { setErorre(false) }} // اینجا کنترل کنید که بعد از پایان لرزش چه اتفاقی بیفتد
                    />
                </View>
            </BottomDrawer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFFFFF', // رنگ زمینه سفید
        // paddingHorizontal: 20, // برای تنظیم فاصله متن از لبه‌ها
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20, // فاصله بین متن و دکمه
        color: '#000000', // رنگ متن
    },
    buttonContainer: {
        // width: 150, // عرض دکمه
        borderRadius: 5, // گرد کردن لبه‌های دکمه
        overflow: 'hidden', // برای اعمال گردی به دکمه
    },
});

const mapStateToProps = state => {
    return {
        AppSetting: state.Customer.AppSetting,
        LockEvent: state.Customer.LockEvent,
        Token: state.Customer.Token,
        EventId: state.Customer.EventId,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        chengToken: Token => {
            const action = {
                type: 'CHANGE_C_Token',
                Token,
            };
            dispatch(action);
        },
        chengsplashOrNot: splashOrNot => {
            const action = {
                type: 'CHANGE_C_splashOrNot',
                splashOrNot,
            };
            dispatch(action);
        },
        chengidevents: idevents => {
            const action = {
                type: 'CHANGE_C_idevents',
                idevents,
            };
            dispatch(action);
        },
        chengNotifications: Notifications => {
            const action = {
                type: 'CHANGE_C_Notifications',
                Notifications,
            };
            dispatch(action);
        },
        chengitemdata: itemdata => {
            const action = {
                type: 'CHANGE_C_itemdata',
                itemdata,
            };
            dispatch(action);
        },
        chengeEventId: EventId => {
            const action = {
                type: 'CHANGE_C_EventId',
                EventId,
            };
            dispatch(action);
        },
        chengeIsLive: IsLiveState => {
            const action = {
                type: 'CHANGE_C_IsLiveState',
                IsLiveState,
            };
            dispatch(action);
        },
        chengeFooterTab: FooterTab => {
            const action = {
                type: 'CHANGE_C_FooterTab',
                FooterTab,
            };
            dispatch(action);
        },
        chengeLockEvent: LockEvent => {
            const action = {
                type: 'CHANGE_C_LockEvent',
                LockEvent,
            };
            dispatch(action);
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginRequired);
