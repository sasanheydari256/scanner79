import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { StoreRootState } from '@app/redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import {
  HomeTabAStackParamList,
  HomeTabBStackParamList,
  HomeTabParamList,
  LoginStackParamList,
  NotificationsStackParamList,
  RootDrawerParamList,
} from './types';

import Login, { retrieveData } from '@app/screens/Login/index';
import LoginByQRCode from '@app/screens/LoginByQRCode';
import Scanner from '@app/screens/Scanner';


// Shared components and props
const DrawerButton = (): React.JSX.Element => {
  const { toggleDrawer } =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Pressable onPress={toggleDrawer}>
      <Icon name="menu" size={20} />
    </Pressable>
  );
};

const drawerScreenOptions = (): Partial<NativeStackNavigationOptions> => ({
  headerLeft: () => <DrawerButton />,
});

const RenderTabBarIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}): React.JSX.Element => {
  const iconMap: Record<string, [string, string]> = {
    'Tab A': ['home-circle-outline', 'home-circle'],
    'Tab B': ['account-circle-outline', 'account-circle'],
  };

  const [defaultIcon, focusedIcon] = iconMap['Tab A'] || ['', ''];
  const iconName = focused ? focusedIcon : defaultIcon;

  return <Icon name={iconName} size={size} color={color} />;
};

// Login Stack
const LoginStack = (): React.JSX.Element => {
  const { Navigator, Screen } = createNativeStackNavigator<LoginStackParamList>();
  return (
    <Navigator initialRouteName="Login">
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen name="LoginByQRCode" component={LoginByQRCode} options={{ headerShown: false }} />
    </Navigator>
  );
};




// Current Navigator
const CurrentNavigator = (): React.JSX.Element => {
  const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();
  const [isLoading, setIsLoading] = useState(true);
  const [hallName, setHallName] = useState(null);
  const [EventName, setEventName] = useState(null);
  const [StartDate, setStartDate] = useState(null);
  const [EventId, setEventId] = useState(null);
  const [Print, setPrint] = useState(null);
  const [Token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {

        const token1 = await retrieveData('Token');
        const eventId1 = await retrieveData('EventId');
        const HallName1 = await retrieveData('HallName');
        const EventName1 = await retrieveData('EventName');
        const StartDate1 = await retrieveData('StartDate');
        const print1 = await retrieveData('Print');
        setHallName(HallName1);
        setEventId(eventId1);
        setEventName(EventName1);
        setPrint(print1);
        setToken(token1)
        setStartDate(StartDate1)


      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);
  const loggedin = useSelector(
    (state: StoreRootState) => state?.user?.loggedin ?? false,
  );

  if (!loggedin) {
    return <LoginStack />;
  }
  if (isLoading) {
    // نمایش یک indicator بارگذاری
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <Navigator
      initialRouteName="Scan"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        swipeEdgeWidth: 0,

      }}>
      <Screen name="Scan" component={Scanner}
        initialParams={{
          item: {
            'hallName': hallName, // ارسال HallName به عنوان پراپس
            'eventId': EventId,
            'Print': Print,
            'Token': Token,
            'EventName': EventName,
            'StartDate': StartDate,

          }    // ارسال EventId به عنوان پراپس
        }}
      />
    </Navigator>
  );
};

// Main App Entry
export default (): React.JSX.Element => {
  const currentTheme = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={currentTheme}>
      <CurrentNavigator />
    </NavigationContainer>
  );
};
