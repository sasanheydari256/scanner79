
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

const { width } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RenderItem = React.memo(({ item, onImageLoad, onLoadStartP }) => (
    <View style={styles.imageContainer}>
        <FastImage
            style={{
                width: SCREEN_WIDTH * 0.95,
                height: 150,
                borderRadius: 15,
            }}
            source={{
                uri: `${BASE_URL_IMG}${item.ImageName}`,
                priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.stretch}
            onLoad={onImageLoad}
            onLoadStart={() => {
                onLoadStartP();
                console.log('start onLoad');

            }}
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
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLiveLocal, setIsLiveLocal] = useState(isLive || false);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const apiResponse = await LiveEventAndAccessUser(eventId, token);
                    setIsLiveLocal(apiResponse?.Answer?.IsLive || false);
                } catch {
                    setIsLiveLocal(false);
                }
            })();
        }
    }, [token, eventId]);

    const handleImageLoad = useCallback(() => setImagesLoaded(true), []);
    const handlePress = useCallback(async () => {
        const [Token, Type] = await Promise.all([
            AsyncStorage.getItem('Token'),
            AsyncStorage.getItem('Type'),
        ]);

        if (Token) {
            if (Type === 'Physical') {
                setModalVisible(true);
            } else {
                navigation.navigate('LiveSelection', { halls });
            }
        }
    }, [halls, navigation]);

    useEffect(() => {
        let timer;
        if (imagesLoaded) {
            timer = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                setCurrentIndex(nextIndex);
            }, 3500);
        }
        return () => clearInterval(timer);
    }, [imagesLoaded, currentIndex, images.length]);

    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.imageContainer}>
                <FastImage
                    style={styles.image}
                    source={{ uri: `${BASE_URL_IMG}${item.ImageName}`, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.stretch}
                    onLoadEnd={handleImageLoad}
                    onLoadStart={()=>{
                        // console.log('test on start load');
                        
                    }}
                    
                />
            </View>
        ),
        [handleImageLoad]
    );

    const indicators = useMemo(
        () =>
            images.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4, 1.1, 0.4],
                    extrapolate: 'clamp',
                });

                return <Animated.View key={i} style={[styles.indicator, { transform: [{ scale }] }]} />;
            }),
        [images, scrollX]
    );

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                style={{ zIndex: 1000 }}
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            />
            <View style={styles.indicatorContainer}>{indicators}</View>
            <View style={styles.textOverlay}>
                <Text style={styles.title}>{Description}</Text>
                {isLiveLocal ? (

                    <View style={{ marginRight: '3%' }}>

                        <Pressable onPress={handlePress} style={{
                            backgroundColor: '#ff0063',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 20,
                            justifyContent: 'center',
                        }}>
                            <Image source={require('../../../assets/img/radar-white.png')}
                                style={{
                                    width: SCREEN_WIDTH * 0.05,
                                    height: SCREEN_HEIGHT * 0.05,
                                    marginHorizontal: '2%',
                                }} />
                            <Text style={styles.liveText}>LIVE NOW</Text>
                        </Pressable>
                    </View>
                ) : null}
                <CustomModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    message="You are registered as physical, you cannot see the live session"
                />
            </View>
        </View>
    );
};

export default React.memo(Carousel);




// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Image, Animated, Dimensions, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
// import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
// import { BASE_URL_IMG } from '../services';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LiveEventAndAccessUser } from '../../../constants/api';
// import CustomModal from '../CustomModal';
// import styles from './styles';
// import FastImage from 'react-native-fast-image'

// const { width } = Dimensions.get('window');

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// const Carousel = ({ images,
//     halls = [],
//     isLive,
//     Description = '',
//     eventId = 0,
//     token = null,
//     LockEvent = 'noLock'
// }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const flatListRef = useRef(null);

//     const navigation = useNavigation();
//     const [isLiveLocal, setisLiveLocal] = useState(isLive);
//     const [modalVisible, setModalVisible] = useState(false);

//     const scrollX = useRef(new Animated.Value(0)).current;


//     useEffect(() => {
//         const fetchEventData = async () => {
//             try {
//                 const apiLiveEventAndAccessUser = await LiveEventAndAccessUser(eventId, token);

//                 if (apiLiveEventAndAccessUser.Result === 'Success') {
//                     setisLiveLocal(apiLiveEventAndAccessUser.Answer.IsLive);
//                 } else {
//                     setisLiveLocal(false);
//                 }
//             } catch (error) {
//                 setisLiveLocal(false);
//                 console.error('Error fetching events:', error);
//             }
//         };
//         if (token !== null) {
//             fetchEventData();
//         } else {
//             setisLiveLocal(false);
//         }
//     }, [isLive, eventId]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             flatListRef.current?.scrollToIndex({
//                 index: (currentIndex + 1) % images.length,
//                 animated: true,
//             });
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 2000);

//         return () => clearInterval(interval);
//     }, [images.length, currentIndex]);

//     const renderItem = ({ item }) => {
//         // console.log(item.ImageName);

//         return (
//             <View style={styles.imageContainer}>
//                 <FastImage
//                     style={{
//                         width: SCREEN_WIDTH * 0.95,
//                         height: SCREEN_HEIGHT * 0.20,
//                         borderRadius: 15,
//                     }}
//                     source={{
//                         uri: `${BASE_URL_IMG}${item.ImageName}`,
//                         priority: FastImage.priority.high,
//                     }}
//                     resizeMode={FastImage.resizeMode.stretch}
//                 />
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <AnimatedFlatList
//                 ref={flatListRef} // مرجع FlatList
//                 style={styles.flatList}
//                 data={images}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 pagingEnabled
//                 scrollEventThrottle={16}
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//                     { useNativeDriver: true }
//                 )}
//                 onScrollToIndexFailed={(info) => {
//                     // console.warn('Scroll to index failed:', info);
//                     setTimeout(() => {
//                         flatListRef.current?.scrollToIndex({ index: 0, animated: true });
//                     }, 500);
//                 }}
//             />

//             <View style={styles.indicatorContainer}>
//                 {images.map((_, i) => {
//                     const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
//                     const scale = scrollX.interpolate({
//                         inputRange,
//                         outputRange: [0.4, 1.1, 0.2],
//                         extrapolate: 'clamp',
//                     });
//                     const opacity = scrollX.interpolate({
//                         inputRange,
//                         outputRange: [0.9, 1, 0.9],
//                         extrapolate: 'clamp',
//                     });
//                     return (
//                         <Animated.View
//                             key={i}
//                             style={[
//                                 { borderColor: 'red', borderWidth: 0.3 },
//                                 styles.indicator,
//                                 { transform: [{ scale }], opacity },
//                             ]}
//                         />
//                     );
//                 })}
//             </View>

//             <View style={styles.textOverlay}>
//                 <Text style={[styles.title, { width: isLiveLocal ? '60%' : '95%' }]}>{Description}</Text>
//                 {isLiveLocal === null || isLive === undefined ? (
//                     <View style={{ paddingRight: '4%' }}>
//                         <ActivityIndicator size="large" color="#889" />
//                     </View>
//                 ) : isLiveLocal ? (
//                     <View style={{ marginRight: '3%' }}>
//                         <Pressable
//                             style={{
//                                 backgroundColor: '#ff0063',
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 borderRadius: 20,
//                                 justifyContent: 'center',
//                             }}
//                             onPress={async () => {
//                                 const [Token, Types] = await Promise.all([
//                                     AsyncStorage.getItem('Token'),
//                                     AsyncStorage.getItem('Type'),
//                                 ]);

//                                 if (Token !== null && Token !== undefined && Token !== '') {
//                                     if (Types == 'Physical') {
//                                         setModalVisible(true);
//                                     } else {
//                                         navigation.navigate('LiveSelection' as never, { halls: halls });
//                                     }
//                                 }
//                             }}
//                         >
//                             <Image
//                                 source={require('../../../assets/img/radar-white.png')}
//                                 style={{
//                                     width: SCREEN_WIDTH * 0.05,
//                                     height: SCREEN_HEIGHT * 0.05,
//                                     marginHorizontal: '2%',
//                                 }}
//                             />
//                             <Text style={styles.liveText}> LIVE NOW</Text>
//                         </Pressable>
//                     </View>
//                 ) : (
//                     <View />
//                 )}
//                 <CustomModal
//                     visible={modalVisible}
//                     onClose={() => setModalVisible(false)}
//                     message={'You are registered as physical, you can not see the live session'}
//                 />
//             </View>
//         </View>
//     );
// };

// export default Carousel;

