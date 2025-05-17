import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    interpolate,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import BanerCard from '../banerTop';
import { EventData } from '../../../types/interfaces';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width; // عرض اصلی کارت
const SPACING = 0; // فاصله بین کارت‌ها

interface AnimatedScrollHorizontalProps {
    data: EventData[] | [];
    onSeeAllPress?: () => void;
    onClickEvent?: (event: EventData) => void; // Define onClick prop for navigation

}

const AnimatedScrollHorizontal: React.FC<AnimatedScrollHorizontalProps> = React.memo((props) => {
    const { data } = props;

    const scrollX = useSharedValue(0);

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
                snapToInterval={ITEM_WIDTH + SPACING}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollViewContainer}
            >
                {data.map((item, index) => {
                    const animatedStyle = useAnimatedStyle(() => {
                        const scale = interpolate(
                            scrollX.value,
                            [
                                (index - 1) * ITEM_WIDTH,
                                index * ITEM_WIDTH,
                                (index + 1) * ITEM_WIDTH,
                            ],
                            [0.86, 0.93, 0.86]
                        );

                        const translateX = interpolate(
                            scrollX.value,
                            [
                                (index - 1) * ITEM_WIDTH,
                                index * ITEM_WIDTH,
                                (index + 1) * ITEM_WIDTH,
                            ],
                            [-(SCREEN_WIDTH * 12) / 100, 0, +(SCREEN_WIDTH * 12) / 100]
                        );
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
                            <BanerCard onPressCard={props.onClickEvent} data={item} />
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
        // paddingHorizontal: 10,
    },
    card: {
        width: ITEM_WIDTH, // عرض کارت‌ها
        // borderRadius: 15,
        overflow: 'hidden',
        // backgroundColor: '#f0f0f0',
        
    },
});

export default AnimatedScrollHorizontal;
