
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, Image, Animated, Dimensions, ActivityIndicator, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import CustomModal from '../CustomModal';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import { BASE_URL_IMG } from '../services';
import { LiveEventAndAccessUser } from '../../../constants/api';
import styles from './styles';
import { preloadImagesAsync } from '../../../constants/Function';
import LocalImagesList from './LocalImagesList';

const { width } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RenderItem = React.memo(({ item, onImageLoad, onLoadStartP }) => (
    <View style={styles.imageContainer}>
        <FastImage
            style={{
                width: SCREEN_WIDTH * 0.95,
                height: SCREEN_HEIGHT * 0.20,
                borderRadius: 15,
            }}
            source={{
                uri: `file://${item}`,
                priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.stretch}
            onLoad={onImageLoad}
            onLoadStart={onLoadStartP}
        />
    </View>
));
const RenderItemUrl = React.memo(({ item, onImageLoad, onLoadStartP }) => (
    <View style={styles.imageContainer}>
        <FastImage
            style={{
                width: SCREEN_WIDTH * 0.95,
                height: SCREEN_HEIGHT * 0.20,
                borderRadius: 15,
            }}
            source={{
                uri: `${BASE_URL_IMG}${item.ImageName}`,
                priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.stretch}
            onLoad={onImageLoad}
            onLoadStart={onLoadStartP}
        />
    </View>
));
const Carousel = ({
    images,
    halls = [],
    isLive,
    Description = '',
    eventId = 0,
    token = null,
    LockEvent = 'noLock'
}) => {
    const [imagesLoaded, setImagesLoaded] = useState(false); // وضعیت لود شدن تصاویر
    const [localImage, setLocalImage] = useState([]); //  تصاویر لود شده

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [isLiveLocal, setIsLiveLocal] = useState(isLive);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        preloadImagesAsync(images)
            .then((e) => {
                console.log(e, 'eeee');
                setLocalImage(e)
                setImagesLoaded(true);
            })
            .catch((error) => {
                console.error('Error preloading images:', error);
                setImagesLoaded(false);
            });


        const fetchEventData = async () => {
            try {
                const apiResponse = await LiveEventAndAccessUser(eventId, token);
                setIsLiveLocal(apiResponse?.Answer?.IsLive || false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setIsLiveLocal(false);
            }
        };
        if (token) {
            fetchEventData();
        } else {
            setIsLiveLocal(false)
        }
    }, [isLive, eventId, token]);

    const handleImageLoad = useCallback(() => {
        console.log('loaded');




    }, []);
    const handleImageLoadstart = useCallback(() => {
        setImagesLoaded(false);
    }, []);
    useEffect(() => {
        if (!imagesLoaded) {
            return () => clearInterval(interval); // Clear interval if imagesLoaded is false
        }

        const interval = setInterval(() => {
            flatListRef.current?.scrollToIndex({
                index: (currentIndex + 1) % images.length,
                animated: true,
            });
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length, currentIndex, imagesLoaded]);

    const handlePress = useCallback(async () => {
        const [Token, Types] = await Promise.all([
            AsyncStorage.getItem('Token'),
            AsyncStorage.getItem('Type'),
        ]);

        if (Token) {
            if (Types === 'Physical') {
                setModalVisible(true);
            } else {
                navigation.navigate('LiveSelection', { halls });
            }
        }
    }, [halls, navigation]);

    const renderItem = useCallback(({ item }) => <RenderItem item={item}
        onImageLoad={handleImageLoad}
    // onLoadStartP={handleImageLoadstart}
    />, []);

    const indicators = useMemo(() => {
        return images.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1.1, 0.2],
                extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
            });

            return (
                <Animated.View
                    key={i}
                    style={[
                        { borderColor: 'red', borderWidth: 0.3 },
                        styles.indicator,
                        { transform: [{ scale }], opacity },
                    ]}
                />
            );
        });
    }, [images, scrollX]);

    return (
        <View style={styles.container}>
            {
                imagesLoaded ?
                    <AnimatedFlatList
                        style={{ zIndex: 100 }}
                        ref={flatListRef}
                        data={localImage}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        scrollEventThrottle={16}
                        removeClippedSubviews
                        initialNumToRender={2}
                        maxToRenderPerBatch={3}
                        windowSize={5}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        onScrollToIndexFailed={() => {
                            setTimeout(() => {
                                flatListRef.current?.scrollToIndex({ index: 0, animated: true });
                            }, 500);
                        }}
                    />
                    :
                    <View style={{ zIndex: 100 }}>
                        <RenderItemUrl item={images[0]}
                            onImageLoad={handleImageLoad}
                        // onLoadStartP={handleImageLoadstart}
                        />
                    </View>

            }







            <View style={styles.indicatorContainer}>{indicators}</View>

            <View style={styles.textOverlay}>
                <Text style={[styles.title, { width: !isLiveLocal ? '80%' : '95%' }]}>{Description}</Text>
                {isLiveLocal === null || isLive === undefined ? (
                    <ActivityIndicator size="large" color="#889" />
                ) : isLiveLocal ? (
                    <Pressable
                        style={{
                            backgroundColor: '#ff0063',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 20,
                            justifyContent: 'center',
                        }}
                        onPress={handlePress}
                    >
                        <Image
                            source={require('../../../assets/img/radar-white.png')}
                            style={{
                                width: SCREEN_WIDTH * 0.05,
                                height: SCREEN_HEIGHT * 0.05,
                                marginHorizontal: '2%',
                            }}
                        />
                        <Text style={styles.liveText}> LIVE NOW</Text>
                    </Pressable>
                ) : null}
                <CustomModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    message={'You are registered as physical, you can not see the live session'}
                />
            </View>
        </View>
    );
};

export default React.memo(Carousel);
