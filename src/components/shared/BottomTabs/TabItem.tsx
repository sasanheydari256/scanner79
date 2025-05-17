import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getPathXCenterByIndex } from '../../../utils/Path';
import usePath from '../../../hooks/usePath';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import { BASE_URL_IMG } from '../services';
import CText from '../../custom/Text';
export type TabProps = {
  label: string;
  icon: string;
  index: number;
  activeIndex: number;
  onTabPress: () => void;
  ImageProps?: string; // اختیاری
  UseIcon?: boolean; // اختیاری
};
const ICON_SIZE = 33;
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const TabItem: FC<TabProps> = ({
  label,
  icon,
  index,
  activeIndex,
  onTabPress,
  ImageProps,
  UseIcon,
  countOfItem = 5,
  fontColorTab
}) => {
  // console.log(countOfItem);
  const LABEL_WIDTH = (SCREEN_WIDTH / countOfItem)  / 2;

  const { curvedPaths } = usePath(countOfItem);
  const animatedActiveIndex = useSharedValue(activeIndex); // مقدار انیمیشن اولیه
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value === index + 1 ? 0 : 7;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2.5 },
      ],
    };
  });

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value === index + 1 ? 36 : 100;
    return {
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: labelPosition - LABEL_WIDTH /  2 },
      ],
    };
  });

  const iconColor = useSharedValue(
    activeIndex !== index + 1 ? 'white' : 'rgba(128,128,128,0.8)',
  );

  // همگام‌سازی مقدار انیمیشن با activeIndex
  useEffect(() => {
    animatedActiveIndex.value = activeIndex; // مقدار زبانه فعال را بلافاصله همگام کنید
    iconColor.value = withTiming(
      activeIndex === index + 1 ? '#5265ff' : 'rgba(255,255,255,0.8)',
    );
  }, [activeIndex]);

  const handleTabPress = () => {
    // تأخیر در تغییر مقدار
    animatedActiveIndex.value = withTiming(index + 1, { duration: 300 });
    onTabPress();
  };

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value,
    alignSelf:'flex-start',
  }));

  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={handleTabPress}>
          {UseIcon ?
            (
              <AnimatedIcon
                name={icon}
                size={25}
                animatedProps={animatedIconProps}
              />
            )
            :
            (
              <Image
                source={{ uri: BASE_URL_IMG + ImageProps }}
                style={{
                  width: activeIndex !== index + 1 ? '85%' : '105%',
                  height: activeIndex !== index + 1 ? '94%' : '103%',
                  alignSelf: 'flex-start',
                  right: activeIndex !== index + 1 ? '0.01%' : '12%',
                  bottom: activeIndex !== index + 1 ? '2.4%' : '4%',
                  resizeMode: 'stretch',

                }} />
            )
          }
        
        </Pressable>
        {activeIndex !== index + 1 && (
            <View style={[styles.labelContainer,
            {
              width: LABEL_WIDTH * 1.8,
              // transform: [{ translateX: -LABEL_WIDTH  }]
            }]}>
              <CText 
              color={fontColorTab || '#fff'}              
              style={[styles.label,{
                right: '2%'
              }]}>{label}</CText>
            </View>
          )}
      </Animated.View>
      <Animated.View style={[labelContainerStyle, styles.labelContainer,
        {
          width: LABEL_WIDTH,
          // transform: [{ translateX: -LABEL_WIDTH / 2 }]
        }]} />
    </>
  );
};


export default TabItem;

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    top: '92%', // قرارگیری زیر آیکون
    alignItems: 'center', // قرارگیری متن در وسط
    justifyContent: 'center', // هم‌ترازی عمودی (اگر نیاز باشد)
    // backgroundColor:'red',
    alignSelf:'center'
  },
  label: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    

  },
});
