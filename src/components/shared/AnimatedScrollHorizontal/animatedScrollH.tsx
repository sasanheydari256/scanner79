import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
    useDerivedValue,
    runOnJS,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import BanerCard from '../banerTop';
import { EventData } from '../../../types/interfaces';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width; // عرض اصلی کارت
const SPACING = 0; // محاسبه فاصله بین کارت‌ها

interface AnimatedScrollHorizontalProps {
    data: EventData[] | [];
    onSeeAllPress: () => void;
}

const AnimatedScrollHorizontal: React.FC<AnimatedScrollHorizontalProps> = React.memo((props) => {
    const { data } = props;

    const [focusedIndex, setFocusedIndex] = useState(0);
    const scrollX = useSharedValue(0);

    const derivedIndex = useDerivedValue(() => {
        const index = Math.round(scrollX.value / (ITEM_WIDTH));
        runOnJS(setFocusedIndex)(index); // محاسبه ایندکس و تنظیم آن در useState
        return index;
    });

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollX.value = event.contentOffset.x;
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                snapToInterval={ITEM_WIDTH + SPACING} // تنظیم اسکرول برای هر کارت
                decelerationRate="normal"
                contentContainerStyle={styles.scrollViewContainer}
            >
                {data.map((item, index) => {
                    const animatedStyle = useAnimatedStyle(() => {
                        const scale = interpolate(
                            scrollX.value,
                            [
                                (index - 1) * (ITEM_WIDTH),
                                index * (ITEM_WIDTH + SPACING),
                                (index + 1) * (ITEM_WIDTH),
                            ],
                            [0.87, 0.92, 0.87]
                        );
                        // const translateX = index === focusedIndex + 1
                        //     ? withDelay(
                        //         100,
                        //         withTiming(-(SCREEN_WIDTH * 27) / 100, { duration: 100 }) // انیمیشن به سمت چپ
                        //     )
                        //     : index === 0 || index === data.length - 1 ?
                        //         0
                        //         :
                        //         withDelay(
                        //             100,
                        //             withTiming((SCREEN_WIDTH * 27) / 100, { duration: 100 }) // انیمیشن به سمت چپ
                        //         )
                        const translateX = index === focusedIndex ?
                            withDelay(
                                100,
                                withTiming((SCREEN_WIDTH * 1) / 100, { duration: 100 }) // انیمیشن به سمت چپ
                            ) :
                            index === focusedIndex + 1 ?
                                withDelay(
                                    100,
                                    withTiming(-(SCREEN_WIDTH * 12) / 100, { duration: 100 }) // انیمیشن به سمت چپ
                                )
                                :
                                withDelay(
                                    100,
                                    withTiming((SCREEN_WIDTH * 12) / 100, { duration: 100 }) // انیمیشن به سمت چپ
                                )

                        return {
                            transform: [{ scale }, { translateX }],
                        };
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.card,
                                animatedStyle,
                            ]}
                        >
                            <BanerCard onPressCard={props.onSeeAllPress} data={item} />
                            {/* <Text>{index}</Text> */}
                        </Animated.View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    scrollViewContainer: {
        // paddingHorizontal: 10, // ایجاد فاصله برای مشاهده کارت‌های کناری
    },
    card: {
        width: ITEM_WIDTH, // عرض کارت‌ها
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
});

export default AnimatedScrollHorizontal;
