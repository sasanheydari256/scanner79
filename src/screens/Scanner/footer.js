import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Animated,
    Easing,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SCREEN_WIDTH } from '../../constants/Screen';
import CustomButton from './CustomButton'
const Footer = ({ status, connectionType }) => {
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
                    <InfoRow icon="cloud" label="Status" value={status} />
                    <InfoRow icon="wifi" label="Connection" value={connectionType} />
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
                <View style={{ width: '90%', alignSelf: 'center' ,paddingTop: '2%' }}>

                    <CustomButton iconName={'sync'} buttonText={'Sync Now'} />

                </View>
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
        paddingVertical: 6,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },

    iconWrapper: {
        width: 30,
        alignItems: 'center',
    },

    labelWrapper: {
        width: '30%', // یا '30%' برای تطبیق‌پذیری
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
