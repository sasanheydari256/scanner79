import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { BASE_URL_IMG } from '../../components/shared/services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Screen';

const windowWidth = Dimensions.get('window').width;

const CrossfadeImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const opacity = useSharedValue(1);
    const nextImageOpacity = useSharedValue(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // ظاهر شدن تصویر جدید
            nextImageOpacity.value = withTiming(1, {
                duration: 700,
                easing: Easing.out(Easing.ease),
            });

            setTimeout(() => {
                // محو شدن تصویر قبلی بعد از 1 ثانیه
                opacity.value = withTiming(0, {
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                });

                // به روز رسانی ایندکس و بازگردانی مقادیر برای انیمیشن بعدی
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                    opacity.value = 1;
                    nextImageOpacity.value = 0;
                }, 800);
            }, 800);
        }, 4000); // هر 3 ثانیه یکبار، انیمیشن تکرار می‌شود

        return () => clearInterval(interval);
    }, [images.length, opacity, nextImageOpacity]);

    const currentImageStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const nextImageStyle = useAnimatedStyle(() => {
        return {
            opacity: nextImageOpacity.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, currentImageStyle]}>
                <Image
                    source={{ uri: BASE_URL_IMG + images[currentIndex].ImageName }}
                    style={styles.image}
                    resizeMode="stretch"
                />
            </Animated.View>
            <Animated.View style={[styles.imageContainer, nextImageStyle]}>
                <Image
                    source={{ uri: BASE_URL_IMG + images[(currentIndex + 1) % images.length].ImageName }}
                    style={styles.image}
                    resizeMode="stretch"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.96,
        height: SCREEN_HEIGHT * 0.20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex:100,
        borderRadius: 10,

    },
    imageContainer: {
        position: 'absolute',
        width: windowWidth,
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});

export default CrossfadeImageCarousel;
