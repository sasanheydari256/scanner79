import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import BanerCard from '../banerTop';
import { EventData } from '../../../types/interfaces';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = ITEM_WIDTH * 0.1;
const SPACING = 1;

interface AnimatedScrollHorizontalProps {
  data: EventData[] | [];
  onSeeAllPress: () => void;
}

const AnimatedScrollHorizontal: React.FC<AnimatedScrollHorizontalProps> = React.memo((props) => {

  const { data } = props;

  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  let contentWidth = 0;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
    contentWidth = event.contentSize.width;
  });

  const scrollToEnd = useCallback(() => {
    if (scrollViewRef.current) {
      const finalPosition = contentWidth - width;
      scrollViewRef.current.scrollTo({ x: finalPosition, animated: true });
    }
  }, [contentWidth]);

  const scrollToThirdItem = useCallback(() => {
    if (scrollViewRef.current) {
      const targetPosition = 2 * (ITEM_WIDTH + SPACING);
      scrollViewRef.current.scrollTo({ x: targetPosition, animated: true });
    }
  }, []);

  const scrollToTwoItem = useCallback(() => {
    if (scrollViewRef.current) {
      const targetPosition = 1 * (ITEM_WIDTH + SPACING);
      scrollViewRef.current.scrollTo({ x: targetPosition, animated: true });
    }
  }, []);


  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={5}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollViewContainer,
          { paddingHorizontal: (width - ITEM_WIDTH) / 2 + SPACING / 2 },
        ]}>
        {data.map(
          (item, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              const scale = interpolate(
                scrollX.value,
                [
                  (index - 1) * (ITEM_WIDTH + SPACING),
                  index * (ITEM_WIDTH + SPACING),
                  (index + 1) * (ITEM_WIDTH + SPACING),
                ],
                [0.4, 1, 0.4],
              );

              const borderRadius = interpolate(
                scrollX.value,
                [
                  (index - 1) * (ITEM_WIDTH + SPACING),
                  index * (ITEM_WIDTH + SPACING),
                  (index + 1) * (ITEM_WIDTH + SPACING),
                ],
                [20, 40, 20],
              );

              return {
                transform: [{ scale }],
                borderRadius,
              };
            });
            return (
              <Animated.View
                key={index}
                style={[styles.item, animatedStyle]}>
                <BanerCard onPressCard={props.onSeeAllPress}  data={item} />
              </Animated.View>
            );
          },
        )}
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    height: (height * 31) / 100,
  },
  item: {
    width: ITEM_WIDTH,
  },
});

export default AnimatedScrollHorizontal;
