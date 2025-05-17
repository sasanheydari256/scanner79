import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet, Image } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';

const Cloading: React.FC = () => {
    const rotation = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.parallel([
                Animated.timing(rotation, {
                    toValue: 360,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 0.1,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        rotateAnimation.start();

        return () => {
            rotation.stopAnimation();
            opacity.stopAnimation();
        };
    }, [rotation, opacity]);

    const animatedStyles = {
        transform: [
            {
                rotate: rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
        opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.spinner, animatedStyles]}>
                <Image
                    style={{ width: '40%', height: '40%', resizeMode:'stretch' }}
                    source={require('../../assets/img/loading.png')}
                    resizeMethod='resize'
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // top: SCREEN_HEIGHT / 2.2
        backgroundColor: '#f8f8f840',
        position: 'absolute',
        zIndex: 1000
    },
    spinner: {
        height: 200,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Cloading;
