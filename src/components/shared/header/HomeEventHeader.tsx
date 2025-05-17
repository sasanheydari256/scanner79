import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, StatusBar, ImageBackground, TouchableOpacity, Image, ColorValue } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import CustomText from '../../custom/Text';
import { BASE_URL_IMG } from '../services';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeProvider';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define types for the Header props
interface HeaderProps {
  leftComponent?: React.ReactNode | string;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  IndentationFlag?: boolean;
  backgroundImage?: string; // Optional prop for the background image URL
  onPressSearch?: any;
  bottomText?: any;
  hasSearch?: boolean;
  isDefault?: boolean;
  backgroundColor?: string | ColorValue;
  theme?: any;
  UsingImage?: any;
}

const MainEventHeader: React.FC<HeaderProps> = ({
  leftComponent,
  centerComponent,
  rightComponent,
  IndentationFlag,
  backgroundImage,
  bottomText,
  hasSearch,
  onPressSearch,
  isDefault,
  backgroundColor,
  UsingImage
}) => {
  const { theme } = useTheme();
  useEffect(() => {

  }, [theme]);

  return (
    <View style={[
      hasSearch ? styles.headerWrapperWithSearch
        :
        !isDefault ? [styles.headerWrapper,
        {
          height: Platform.OS === 'ios' ? height * 0.14 : '9.2%',
        }
        ] : styles.headerWrapperDefault
    ]}>
      <StatusBar barStyle={backgroundColor} backgroundColor={backgroundColor} />
      {Platform.OS === 'ios' &&
        <View style={{
          height: '25%',
          width: '100%',
          backgroundColor: backgroundColor,
        }} />
      }

      {
        UsingImage ? (
          <ImageBackground
            source={{ uri: BASE_URL_IMG + backgroundImage }}
            style={styles.headerContainerWithImage}
            imageStyle={{
              width: '120%',
              height: '220%',
              top: -80,
            }}
            resizeMode="cover"
          >
            {
              hasSearch ?
                <HeaderContentWithSearch
                  leftComponent={leftComponent}
                  centerComponent={centerComponent}
                  rightComponent={rightComponent}
                  IndentationFlag={IndentationFlag}
                  bottomText={bottomText}
                  hasSearch={hasSearch}
                  onPressSearch={onPressSearch}
                  theme={theme}
                />
                :
                <HeaderContent
                  leftComponent={leftComponent}
                  centerComponent={centerComponent}
                  rightComponent={rightComponent}
                  IndentationFlag={IndentationFlag}
                  bottomText={bottomText}
                  hasSearch={hasSearch}
                  theme={theme}
                />
            }
          </ImageBackground>
        ) : (
          <View style={[styles.headerContainer,
          { backgroundColor: backgroundColor ? backgroundColor : '#6200ee' }]}>

            {
              hasSearch ?
                <HeaderContentWithSearch
                  leftComponent={leftComponent}
                  centerComponent={centerComponent}
                  rightComponent={rightComponent}
                  IndentationFlag={IndentationFlag}
                  bottomText={bottomText}
                  hasSearch={hasSearch}
                  onPressSearch={onPressSearch}
                  theme={theme}
                />
                :
                <HeaderContent
                  leftComponent={leftComponent}
                  centerComponent={centerComponent}
                  rightComponent={rightComponent}
                  IndentationFlag={IndentationFlag}
                  bottomText={bottomText}
                  hasSearch={hasSearch}
                  theme={theme}
                />
            }
          </View>
        )
      }
    </View >
  );
};

const HeaderContent: React.FC<HeaderProps> = ({

  leftComponent, centerComponent, rightComponent,
  IndentationFlag, theme
}) => {
  const navigation = useNavigation();

  return (
    <>

      <View style={styles.startContainer}>

        {typeof leftComponent === 'string' ? (
          <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.goBack()}>
            {/* <Icon
              name="keyboard-arrow-left"
              type='MaterialIcons'
              style={{ color: theme.colors.text }}
            /> */}
          </TouchableOpacity>
        ) : (
          leftComponent
        )}
      </View>
      <View style={styles.centerContainer}>
        {centerComponent && centerComponent}
      </View>
      <View style={styles.endContainer}>{rightComponent}</View>

      {
        IndentationFlag && (
          <View style={[styles.indentation, { backgroundColor: theme.colors.background }]} />
        )
      }
    </>


  )
};
const HeaderContentWithSearch: React.FC<HeaderProps> = ({
  bottomText,
  onPressSearch,
  leftComponent, centerComponent, rightComponent,
  IndentationFlag, theme
}) => (
  <View style={{ justifyContent: 'space-between', height: '100%' }}>

    <View style={{ flexDirection: 'row', paddingTop: '2%' }}>
      <View style={styles.startContainer}>
        {typeof leftComponent === 'string' ? (
          <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.goBack()}>
            {/* <Icon
              name='arrow-left'
              type='MaterialCommunityIcons'
              style={{ color: '#000' }}
            /> */}
          </TouchableOpacity>
        ) : (
          leftComponent
        )}
      </View>
      <View style={styles.centerContainer}>
        {centerComponent && centerComponent}
      </View>
      <View style={styles.endContainer}>{rightComponent}</View>
      {IndentationFlag && (
        <View style={styles.indentation} />
      )}
    </View>


    <View style={styles.topHeader}>
      <View style={[styles.searchBar, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity style={styles.buttonSearch}
          onPress={() => onPressSearch()}>
          <CustomText fontSize={14} style={styles.searchText}>Search your events</CustomText>
          <Image
            style={styles.iconRightHeader}
            source={require('../../../assets/img/filter2.png')} />

        </TouchableOpacity>

      </View>
      <View style={styles.eventCount}>
        <Image
          style={styles.iconBottonHeader}
          source={require('../../../assets/img/Event-icon.png')} />

        <CustomText color='#fff' style={styles.eventCountText}>{bottomText}</CustomText>

      </View>
    </View>



  </View>
);
const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  eventCount: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    padding: '1%'
  },
  eventCountText: {
    color: '#fff',
    fontSize: 12
  },
  iconRightHeader: {
    width: (SCREEN_WIDTH * 5) / 100,
    height: (SCREEN_WIDTH * 5) / 100,
  },
  iconBottonHeader: {
    width: (SCREEN_WIDTH * 3) / 100,
    height: (SCREEN_WIDTH * 4) / 100,
    marginRight: '2%'
  },
  buttonSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '3%',
    paddingVertical: 2
  },
  searchBar: {
    marginTop: '1%',
    marginHorizontal: '4%',
    padding: '1%',
    // backgroundColor: '#fff',
    borderRadius: (SCREEN_WIDTH * 5) / 100,
    justifyContent: 'center',
  },
  searchText: {
    // color: '#9e9e9e',
    paddingLeft: '3%'
  },
  topHeader: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  headerWrapper: {
    width: '100%',
    // height: Platform.OS === 'ios' ? width * 0.11 : '11%',
  },
  headerWrapperDefault: {
    width: '100%',
    height: Platform.OS === 'ios' ? height * 0.12 : height * 0.08,
  },
  headerWrapperWithSearch: {
    width: '100%',
    height: Platform.OS === 'ios' ? height * 0.14 : height * 0.18,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: 'hidden'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? '4%' : '2%',

  },
  headerContainerWithImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? '1%' : '2%',

  },
  defaultBackground: {
    backgroundColor: '#6200ee', // Fallback color if no image is provided
  },
  startContainer: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    // paddingVertical: width * 0.04,
    height: '100%',
    alignItems: 'flex-start'
  },
  endContainer: {
    flex: 2,
    alignItems: 'flex-end',
    paddingHorizontal: width * 0.03,
    height: '100%',
  },
  centerContainer: {
    flex: 7,
    height: '100%',
    // paddingVertical: '2%'
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  indentation: {
    // backgroundColor: '#F8F8F8',
    height: '25%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
});

export default MainEventHeader;
