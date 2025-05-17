import React, { FC, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import usePath from '../../../hooks/usePath';
import { getPathXCenterByIndex } from '../../../utils/Path';
import TabItem from './TabItem';
import AnimatedCircle from './AnimatedCircle';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BASE_URL_IMG } from '../services';
import { useTheme } from '../../../theme/ThemeProvider';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CustomBottomTab: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();
  const { containerPath, curvedPaths, tHeight } = usePath(state.routes.length);

  // Precompute X centers
  const xCenters = useMemo(() => {
    if (curvedPaths.length < 2) {
      console.warn('curvedPaths must contain at least two paths.');
      return [SCREEN_WIDTH / 2];
    }
    return curvedPaths.map((_, index) => getPathXCenterByIndex(curvedPaths, index));
  }, [curvedPaths]);

  const circleXCoordinate = useSharedValue(xCenters[state.index]);
  const progress = useSharedValue(state.index + 1);

  const selectIcon = useCallback((routeName: string) => {
    switch (routeName) {
      case 'HomeTab':
        return 'home';
      case 'Notifications':
        return 'notifications-outline';
      case 'Map':
        return 'map-outline';
      case 'Calendar':
        return 'calendar-outline';
      case 'ProfileTab':
        return 'person-outline';
      default:
        return 'home';
    }
  }, []);

  const animatedProps = useAnimatedProps(() => {
    if (curvedPaths.length < 2) {
      console.warn('curvedPaths must contain at least two paths for interpolation.');
      return {
        d: containerPath,
      };
    }

    const inputRange = curvedPaths.map((_, index) => index + 1);
    const currentPath = interpolatePath(progress.value, inputRange, curvedPaths);

    // circleXCoordinate.value = xCenters[progress.value - 1] || SCREEN_WIDTH / 2;
    circleXCoordinate.value = xCenters[progress.value - 1];

    return {
      d: `${containerPath} ${currentPath}`,
    };
  });

  const handleTabPress = (index: number, tab: string, file: string, label: string, allData: any) => {
    progress.value = withTiming(index + 1);
    navigation.navigate(tab, {
      PdfUrl: BASE_URL_IMG + file, label,
      item: allData,
    });
  };

  useEffect(() => {
    if (curvedPaths.length < 2) {
      console.warn('curvedPaths must contain at least two paths for proper updates.');
      return;
    }
    const newXCenters = curvedPaths.map((_, index) => getPathXCenterByIndex(curvedPaths, index));
    circleXCoordinate.value = newXCenters[state.index] || SCREEN_WIDTH / 2;
    progress.value = withTiming(state.index + 1);
  }, [state.routes.length, state.index, curvedPaths]);

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={SCREEN_WIDTH} height={tHeight} style={styles.shadowMd}>
        <AnimatedPath fill={theme.colors.tabColor || '#5265ff'} animatedProps={animatedProps} />
      </Svg>
      <AnimatedCircle circleX={circleXCoordinate} />
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: tHeight,
          },
        ]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ? options.tabBarLabel : route.name;
          const image = options.ImageProps ? options.ImageProps : route.name;
          const useIcon = options.useIcon ?? true;
          const file = options.file ?? '';
          const allData = options.allData ?? null;

          return (
            <TabItem
              key={route.key}
              label={label as string}
              icon={selectIcon(route.name)}
              activeIndex={state.index + 1}
              index={index}
              onTabPress={() => handleTabPress(index, route.name, file, label, allData)}
              ImageProps={image}
              UseIcon={useIcon}
              countOfItem={state.routes.length}
              fontColorTab={theme.colors.FooterFontColor}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  tabItemsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
  },
  shadowMd: {
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
    // shadowOffset: { width: 0, height: 3 },
  },
});
