import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { FONTSIZE } from '../../constants/Screen';
import CText from './Text';
import { useTheme } from '../../theme/ThemeProvider';

const { width } = Dimensions.get('window');
const tabWidth = width * 0.38; // Adjust the width of the tab as needed

const TabComponent: React.FC = ({ onPressTab }) => {
    const { theme } = useTheme();
    useEffect(() => {
  
    }, [theme]);
    const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handleTabPress = (tab: 'upcoming' | 'past') => {
        onPressTab(tab)
        setSelectedTab(tab);
        Animated.timing(animatedValue, {
            toValue: tab === 'upcoming' ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, tabWidth]
    });

    return (
        <View style={[styles.container,{backgroundColor: theme.colors.cardBackground}]}>
            <Animated.View style={[styles.tabBackground,
                 { transform: [{ translateX }] },
                 {backgroundColor: theme.colors.card,
                    borderColor: theme.colors.text,
                    borderWidth:0.1
                 }]} />
            <TouchableOpacity onPress={() => handleTabPress('upcoming')} style={[styles.tab]}>
                <CText style={[styles.tabText, ...(selectedTab === 'upcoming' ? [styles.activeTabText] : [])]}>
                    UPCOMING
                </CText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('past')} style={styles.tab}>
                <CText style={[styles.tabText, ...(selectedTab === 'past' ? [styles.activeTabText] : [])]}>
                    PAST EVENTS
                </CText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: '11%',
        marginVertical: '5%',
        // backgroundColor: '#f2f',
        position: 'relative',
        paddingVertical: '1%'
    },
    tabBackground: {
        position: 'absolute',
        left: '1%',
        width: tabWidth,
        height: '100%',
        // backgroundColor: '#f33',
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2%',
       
    },
    tabText: {
        fontSize: FONTSIZE[1],
    },
    activeTabText: {
        color: '#5669ff',
    },
});

export default TabComponent;
