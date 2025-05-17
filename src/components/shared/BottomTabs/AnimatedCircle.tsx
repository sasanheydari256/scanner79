import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';

type CircleProps = {
  circleX: Animated.SharedValue<number>;
};

const circleContainerSize = 50;

const AnimatedCircle: FC<CircleProps> = ({circleX}) => {
  // محاسبه مقدار انیمیشن با استفاده از با زمان‌بندی
  const animatedCircleX = useDerivedValue(() =>
    withTiming(circleX.value - circleContainerSize / 2, {duration: 250}),
  );

  // سبک انیمیشنی دایره
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedCircleX.value}],
    };
  });

  return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default memo(AnimatedCircle);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 4.9,
    width: circleContainerSize,
    height: circleContainerSize,
    borderRadius: circleContainerSize / 2,
    backgroundColor: '#dcdff4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
