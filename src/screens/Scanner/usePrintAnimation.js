import { useRef } from 'react';
import { Animated } from 'react-native';
import { SCREEN_HEIGHT } from '../../constants/Screen';

export function usePrintAnimation(isTablet) {
  const translateY = useRef(new Animated.Value(0)).current;

  const show = () => {
    Animated.timing(translateY, {
      toValue: isTablet ? -SCREEN_HEIGHT * 0.65 : -SCREEN_HEIGHT * 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hide = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  
  return { translateY, show, hide };
}
