import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { useTheme } from '../../../theme/ThemeProvider';

const { height } = Dimensions.get('window');

const BottomDrawer = ({
    isVisible,
    onClose,
    children,
    backgroundColor = '#fff',
    expandHeight = false,
    heightX = 0.52 // اندازه بدنه 
}) => {


    const translateY = useSharedValue(height);
    const opacity = useSharedValue(0);
    const containerHeight = useSharedValue(height); // Shared value for container height
    const [display, setDisplay] = useState(false);
    const { theme } = useTheme();
    useEffect(() => {

    }, [theme]);
    useEffect(() => {
        if (isVisible) {
            setDisplay(true);
            translateY.value = withSpring(0, { damping: 16 });
            opacity.value = withTiming(1, { duration: 500 });
        } else {
            translateY.value = withTiming(height, { duration: 300 }, (finished) => {
                if (finished) {
                    runOnJS(setDisplay)(false);
                }
            });
            opacity.value = withTiming(0, { duration: 200 });
        }
    }, [isVisible]);

    useEffect(() => {
        // Animate the height of the container
        containerHeight.value = withTiming(expandHeight ? height * 0.98 : height * heightX, { duration: 300 });
    }, [expandHeight]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
        height: containerHeight.value, // Apply animated height to the drawer
    }));

    const closeDrawer = () => {
        onClose();
    };

    return (
        <GestureHandlerRootView style={[styles.container, { display: display ? 'flex' : 'none' }]}>
            {isVisible && (
                <TouchableWithoutFeedback onPress={closeDrawer}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
            <Animated.View
                style={[
                    styles.drawer,
                    animatedStyle,
                    { backgroundColor: theme.dark ? '#2B2D42' : '#f8f8f8' },
                ]}
            >
                <View style={styles.panAreaContainer}>
                    <PanGestureHandler
                        hitSlop={{ top: 220, bottom: 100, left: 0, right: 0 }}
                        onGestureEvent={(e) => {
                            if (e.nativeEvent.translationY > 0) {
                                translateY.value = e.nativeEvent.translationY;
                            }
                        }}
                        onHandlerStateChange={(e) => {
                            if (e.nativeEvent.translationY > height / 6) {
                                closeDrawer();
                            } else {
                                translateY.value = withSpring(0);
                            }
                        }}
                    >
                        <View style={styles.panArea}>
                            <View
                                style={{
                                    backgroundColor: '#99999950',
                                    padding: '0.5%',
                                    width: SCREEN_WIDTH * 0.2,
                                    borderRadius: 50,
                                }}
                            />
                        </View>
                    </PanGestureHandler>
                </View>

                {children}
            </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    panAreaContainer: {
        height: 0, // Set the height of the draggable area container.
    },
    panArea: {
        height: '100%', // Fill the container
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginTop: '2%',
    },
    container: {
        height: height,
        justifyContent: 'flex-end',
        width: '100%',
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    drawer: {
        // height: height * 0.52, // Default height for the drawer
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default BottomDrawer;
