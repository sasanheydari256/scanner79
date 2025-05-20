import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Animated,
    Easing,
    Text,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SCREEN_WIDTH } from '../../constants/Screen';
import CustomButton from './CustomButton'
import { useSelector, useDispatch } from 'react-redux';
import { clearOfflineData } from '../../redux/reducers/offlineDataSlice';
import { SyncDataScan } from '../../constants/api';
import { userLogout } from '@app/redux/actions';

const Footer = ({ status, connectionType, mode, setMode }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const onLogoutPress = () => {
        dispatch(userLogout());
    };
    const offlineData = useSelector(
        (state) => state.offlineData.data ?? {},
    );
    const transformOfflineData = (dataArray) => {
        if (!Array.isArray(dataArray) || dataArray.length === 0) return null;

        const { eventId, hallName } = dataArray[0]; // فرض بر این است که eventId و hallName برای همه رکوردها یکی است

        const Users = dataArray.map((item) => ({
            RegId: item.regId,
            Data: item.savedAt.replace('T', ' ').replace('Z', ''),
        }));

        return {
            EventId: eventId,
            HallName: hallName,
            Users,
        };
    };

    const payload = transformOfflineData(offlineData);
    // console.log(payload);
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleFooter = () => {
        const toValue = expanded ? 0 : 1;
        Animated.timing(animation, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();

        setExpanded(!expanded);
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [80, SCREEN_WIDTH], // یا height مناسب مثل 300
    });

    const backgroundColorInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['#f8f8f8', '#444'],
    });
    const clearOffline = () => {
        dispatch(clearOfflineData());
    };
    const sendDataApi = async (data) => {
        setLoading(true)
        const api = await SyncDataScan(data.EventId, data.HallName, data.Users)
        // console.log(api);

        clearOffline()
        setLoading(false)
    }
    return (
        <Animated.View style={[styles.container, {
            height: heightInterpolate,
            backgroundColor: backgroundColorInterpolate,
        }]}>
            <Pressable style={styles.iconButton} onPress={toggleFooter}>
                <Icon name={expanded ? 'arrow-down' : 'arrow-up'} size={24} color={expanded ? '#fff' : '#333'} />
            </Pressable>

            {expanded && (
                <View style={styles.contentWrapper}>
                    <InfoRow icon="globe-outline" label="Status" value={status} />
                    <InfoRow icon="swap-vertical-outline" label="Connection" value={connectionType} />
                    <InfoRow
                        icon="bar-chart"
                        label="Signal"
                        value={
                            status === 'offline' ? 'You are offline' :
                                status === 'poor_signal' ? 'Signal is weak' :
                                    'Signal is good'
                        }
                    />
                </View>
            )}
            {expanded && (
                <ScrollView style={{ width: '90%', alignSelf: 'center', paddingTop: '2%' }}>

                    <CustomButton
                        loading={loading}
                        badgeCount={offlineData.length}
                        disabled={offlineData.length === 0}
                        onPress={() => {

                            sendDataApi(payload)
                        }}
                        iconName={'sync'} buttonText={'Sync Now'} />
                    <CustomButton
                        iconName={mode !== 'auto' ? 'change-circle' : 'mobiledata-off'}
                        onPress={() => setMode(prev => (prev === 'auto' ? 'manual' : 'auto'))}
                        buttonText={mode === 'auto' ? 'Switch to Manual' : 'Switch to Auto'} />
                    <CustomButton
                        onPress={() => {
                            clearOffline()

                            onLogoutPress()
                        }}
                        iconName={'logout'} buttonText={'Logout'} />

                </ScrollView>
            )}
        </Animated.View>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <View style={styles.iconWrapper}>
            <Icon name={icon} size={20} color="#fff" />
        </View>
        <View style={styles.labelWrapper}>
            <Text style={styles.label}>{label}:</Text>
        </View>
        <View style={styles.valueWrapper}>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        bottom: 0,
        zIndex: 1000,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    iconButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#99999950',
        padding: 8,
        borderRadius: 12,
        marginBottom: 12,
        width: 40,
        alignItems: 'center',
    },
    contentWrapper: {
        gap: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },

    iconWrapper: {
        width: 30,
        alignItems: 'center',
    },

    labelWrapper: {
        width: '30%', // 
        justifyContent: 'flex-start',
    },

    valueWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    value: {
        fontSize: 16,
        color: '#fff',
    },
});

export default Footer;
