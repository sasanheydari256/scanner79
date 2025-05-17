import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import QRCode from 'react-native-qrcode-svg';
import IconRow from './IconRow';
// import { BASE_URL_IMG } from '../../shared/services';
import { useTheme } from '../../../theme/ThemeProvider';
import { BASE_URL_IMG, CheckUpdate, removeAllStorage } from '../../shared/services';
import { GetAllEvenet, GetApplicationSetting, GetProfileAttendee } from '../../../constants/api';
import { connect } from 'react-redux';
import CText from '../Text';
import { handlePageClick } from '../../../screens/HomeScreenEvent/handlePageNavigation';
import { fetchEventData, handleLoginFlow, navigateToTabs } from '../../../screens/Splash';

const SidebarComponent = (props) => {
  const MenuApplication = props.appsetting.MenuApplication
  const Logo = props.appsetting.Logo || '';
  const appName = props.EventName === '' ? props.appsetting.Answer.Name : props.EventName;
  const menuColor = props.appsetting.Answer.HambergerMenu ?? '#5265ff';
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(
    {
      "Email": "Please Wait",
      "EventAvailability": "Not available",
      "FirstName": "Guest",
      "Image": "https://example.com/default-avatar.png",
      "LastName": "",
      "MemberShipId": "Not provided",
      "ProfitionalImage": "https://example.com/default-avatar.png",
      "RegistrationDate": "Not registered",
      "RegistrationID": "Not provided",
      "Title": "Guest"
    }
  );
  const [expandedItems, setExpandedItems] = useState([]);
  const { isDarkMode, toggleTheme, theme } = useTheme();
  // console.log(theme.colors.menuColor, 'menu color');

  useEffect(() => {
    if (props.Token) {
      getProfileData();
    }
  }, [theme])
  const getProfileData = async () => {
    const profileData = await GetProfileAttendee(props.EventId, props.Token)
    // console.log(props.EventId,'props.EventId');
    // console.log(props.Token,'props.Token');
    console.log(profileData,'profileData');
    
    setProfile(profileData.Answer)
    // console.log(profileData);
    // console.log(profileData.Answer);
  }
  const toggleSubMenu = (index) => {
    setExpandedItems((prevExpandedItems) => {
      // بررسی می‌کنیم که آیا ایندکس در آرایه وجود دارد یا نه
      if (prevExpandedItems.includes(index)) {
        // اگر وجود دارد، آن را حذف می‌کنیم
        return prevExpandedItems.filter(item => item !== index);
      } else {
        // اگر وجود ندارد، آن را اضافه می‌کنیم
        return [...prevExpandedItems, index];
      }
    });
  };
  const logout = async () => {
    setLoading(true)
    const [AppSettings] = await Promise.all([
      GetApplicationSetting(),
    ]);
    await removeAllStorage();

    // token is null 
    await handleLoginFlow(AppSettings, props, null, () => { })

    // const [AllEvent, AppSettings] = await Promise.all([
    //   GetAllEvenet(),
    //   GetApplicationSetting(),
    // ]);
    // let needUpdate = CheckUpdate(AppSettings)
    // props.chengToken('')
    // if (props.LockEvent === 'NoLock') {
    //   props.navigation.replace('Tabs', {
    //     initialRouteName: 'Home',
    //     item: AllEvent,
    //     needUpdate: needUpdate,
    //     AppSettings: AppSettings
    //   });
    // } else {
    //   const eventSelect = AllEvent.Answer.find(
    //     event => event.Id === AppSettings.Answer.LockEventId
    //   );
    //   if (props.LockEvent === 'LockEvent') {

    //   } else {
    //     if (AppSettings.Answer.LoginRequired) {
    //       props.navigation.replace('Login', {
    //         event: eventSelect,
    //         LockEvent: true,
    //         initialRouteName: '',
    //         needUpdate,
    //         AppSettings,
    //       });
    //     }
    //   }


    setLoading(false)
    // }
  }
  return (
    <View style={{ flex: 1 }}>

      <View style={styles.container}>

        <View style={{
          width: '14%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: menuColor || '##05cdff',
          paddingVertical: 2,
          flex: 1.8
        }}>
          {Platform.OS === 'ios' &&
            <View style={{ height: SCREEN_HEIGHT * 0.04 }} />
          }

          {/* Logo orgenizer */}

          <View style={{
            width: '100%',
            height: '8%',
            justifyContent: 'center',
          }}>
            <Image source={{ uri: BASE_URL_IMG + Logo }} style={{
              height: SCREEN_HEIGHT * 0.05,
              width: SCREEN_WIDTH * 0.1,
              alignSelf: 'center',
              borderRadius: 30,

            }} />
          </View>

          <View style={styles.borderRow}>

          </View>
          <View style={{
            height: '25%'
          }}>
            {/* <View style={{
              borderRadius: 5,
              margin: SCREEN_WIDTH * 0.02,
              alignItems: 'center'
            }}>
              <Image
                source={require('../../../assets/img/Frame49.png')}
                style={{
                  height: SCREEN_HEIGHT * 0.04,
                  width: SCREEN_WIDTH * 0.09,
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{
              backgroundColor: '#99999950',
              borderRadius: 5,
              margin: SCREEN_WIDTH * 0.02,
              padding: '10%'

            }}>
              <Image
                source={require('../../../assets/img/apps.png')}
                style={{
                  height: SCREEN_HEIGHT * 0.04,
                  width: SCREEN_WIDTH * 0.06,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{
              borderRadius: 5,
              margin: SCREEN_WIDTH * 0.02
            }}>
              <Image
                source={require('../../../assets/img/article_shortcut.png')}
                style={{
                  height: SCREEN_HEIGHT * 0.04,
                  width: SCREEN_WIDTH * 0.06,
                  alignSelf: 'center'

                }}
                resizeMode="contain"
              />
            </View>
            <View style={{
              borderRadius: 5,
              margin: SCREEN_WIDTH * 0.02

            }}>
              <Image
                source={require('../../../assets/img/auto_awesome_mosaic.png')}
                style={{
                  height: SCREEN_HEIGHT * 0.04,
                  width: SCREEN_WIDTH * 0.06,
                  alignSelf: 'center'

                }}
                resizeMode="contain"
              />
            </View> */}
          </View>
          <View
            style={{
              height: '53%',
              // backgroundColor:'red'
            }}
          >
            <View style={{
              alignItems: 'flex-start',
              width: SCREEN_HEIGHT * 0.6,
              top: '22%',
              // flexDirection: 'row-reverse',
              // overflow: 'hidden',
              // left: 0,
              transform: [{ rotate: '270deg' }],
            }}>
              <CText numberOfLines={1} style={{
                marginLeft: 5,
                // transform: [{rotateX: '-180deg'}],
                fontSize: 14,
                color: '#8C8EBD',
              }}>{appName}</CText>
              {/* <View style={Styles.verticalline} /> */}
            </View>
          </View>

          {/* setting */}
          <View style={{
            height: '10%',
            // backgroundColor: 'red',
            alignSelf: 'center',
            justifyContent: 'flex-end'
          }}>
            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Settings', {});
              }}
              style={{
                borderRadius: 5,
                margin: SCREEN_WIDTH * 0.02,
                alignItems: 'center'
              }}>
              <Image
                source={require('../../../assets/img/test/10.png')}
                style={{
                  height: SCREEN_HEIGHT * 0.04,
                  width: SCREEN_WIDTH * 0.06,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                toggleTheme()
                // console.log('ss');
              }}
              style={{
                backgroundColor: '#99999950',
                borderRadius: 5,
                margin: SCREEN_WIDTH * 0.02,
                padding: '10%'

              }}>
              <Image
                source={
                  isDarkMode ?
                    require('../../../assets/img/test/11.png')
                    :
                    require('../../../assets/img/test/12.png')
                }
                style={{
                  height: SCREEN_HEIGHT * 0.04,
                  width: SCREEN_WIDTH * 0.06,
                  alignSelf: 'center'

                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {Platform.OS === 'ios' &&
            <View style={{ height: SCREEN_HEIGHT * 0.04 }} />
          }
        </View>
        {/* //right  */}
        <View style={{
          flex: 8
        }}>
          {Platform.OS === 'ios' &&
            <View style={{ height: SCREEN_HEIGHT * 0.04 }} />
          }
          {/* Profile Section */}
          <TouchableOpacity
            onPress={() => {
              // console.log(profile);

              if (props.LockEvent === 'LockEvent') {
                props.navigation.navigate('MyProfile', { data: profile });

                // console.log(props.LockEvent);
              } else {
                props.navigation.navigate('MyProfile', { data: profile });
              }
            }}
            style={styles.profileSection}>
            <View style={styles.avatarPlaceholder} >
              <Image
                source={{ uri: BASE_URL_IMG + profile.ProfitionalImage }}
                style={{
                  height: '100%',
                  width: '100%',
                  alignSelf: 'center'

                }} />
            </View>
            <View>
              <CText color='#333' style={styles.nameText}>
                {profile ? profile.FirstName || '' : ''}
              </CText>
              <CText color='#333' style={styles.profileText}>My Profile</CText>
              {/* <CText style={styles.checkInText}>Check-in: 10:16 | Check-out: 18:20</CText> */}
            </View>
          </TouchableOpacity>
          {/* bookmark my agena notification My vCArd */}
          <View>
            <IconRow profile={profile} />
          </View>
          <View style={styles.borderRow} />

          {/* Menu Items */}
          <ScrollView style={{
            height: SCREEN_HEIGHT * 0.57
          }}>
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#f5f9ff' }]} onPress={() => { }}>
              <View style={styles.iconPlaceholder}>
                {/* نمایش آیکون */}
                <Image source={require('../../../assets/img/homeIcon.png')}
                  style={{ width: '80%', height: '80%' }} />
              </View>
              <CText color='#333' style={styles.menuItemText}>Dashboard</CText>
            </TouchableOpacity>
            {MenuApplication.length > 0 && MenuApplication.map((item, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.menuItem} onPress={() => {
                  //  console.log(item);
                  if (item.SubMenu === null) {
                    // console.log(item);

                    handlePageClick(item, props.navigation)
                  } else {
                    toggleSubMenu(index)
                  }
                }}>
                  <View style={styles.iconPlaceholder}>
                    {/* نمایش آیکون */}
                    <Image source={{ uri: BASE_URL_IMG + item.Icon }}
                      style={{ width: '80%', height: '80%' }} />
                  </View>
                  <CText color='#333' style={{}}>{item.Title}</CText>
                </TouchableOpacity>

                {/* Submenu Items */}
                {expandedItems.includes(index) && item.SubMenu.length > 0 && (
                  <View style={styles.subMenu}>
                    {item.SubMenu.map((subItem, subIndex) => (
                      <TouchableOpacity
                        onPress={() => {
                          // if (item.SubMenu.length === 0) {
                          // console.log(props);

                          handlePageClick(subItem, props.navigation)
                          // } else {
                          //   toggleSubMenu(index)
                          // }
                        }}
                        key={subIndex}
                        style={[styles.subMenuItem, { flexDirection: 'row' }]}>
                        <View style={[styles.iconPlaceholder]}>
                          {/* نمایش آیکون */}
                          <Image source={{ uri: BASE_URL_IMG + subItem.Image }}
                            style={{ width: '80%', height: '80%' }} />
                        </View>
                        <CText
                          style={styles.subMenuItemText}>
                          {subItem.PageName}
                        </CText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>

          {/* QR Code and Logout Section */}
          <View style={styles.qrSection}>
            {/* <View style={styles.qrPlaceholder} /> */}
            <QRCode
              value={profile.RegistrationID ? profile.RegistrationID : ''}
            />
            <View style={{ paddingTop: '5%', alignItems: 'center' }}>
              <Text style={styles.registrationId}>Registration ID: {profile.RegistrationID ? profile.RegistrationID : ''}</Text>
              {loading ?

                (
                  <>
                    <ActivityIndicator size="small" color="#585df9" />
                    <TouchableOpacity
                      onPress={() => {
                        logout()
                      }}
                      style={styles.logoutButton}>
                      {
                        props.LockEvent !== 'LockEvent' &&
                        <Text style={styles.logoutText}>Logout</Text>
                      }
                      {
                        props.LockEvent == 'NoLock' &&
                        <Text style={styles.switchText}>Switch event</Text>
                      }
                    </TouchableOpacity>

                  </>
                )

                :
                (
                  props.LockEvent !== 'LockEvent' || props.LockEvent === 'NoLock') && (
                  <TouchableOpacity
                    onPress={() => {
                      logout();
                    }}
                    style={styles.logoutButton}>
                    {props.LockEvent !== 'LockEvent' && (
                      <Text style={styles.logoutText}>Logout</Text>
                    )}
                    {props.LockEvent === 'NoLock' && (
                      <Text style={styles.switchText}>Switch event</Text>
                    )}
                  </TouchableOpacity>

                )
              }

            </View>
            {Platform.OS === 'ios' &&
              <View style={{ height: SCREEN_HEIGHT * 0.04 }} />
            }
          </View>
        </View>

      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  borderRow: {
    backgroundColor: '#E0E0E0',
    width: '92%',
    height: '0.1%',
    alignSelf: 'center',
    marginVertical: '4%'
  },
  container: {
    flex: 1,
    // backgroundColor: '#F8F8F8',
    flexDirection: 'row'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5%',
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#D8D8D8',
    marginRight: 5,
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  checkInText: {
    fontSize: 10,
    color: '#9E9E9E',
  },
  menuSection: {
    // flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
    borderRadius: 15,
    marginHorizontal: '5%',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    // backgroundColor: '#D8D8D8',
    marginRight: '3%',
  },
  menuItemText: {
    fontSize: 14,
    // color: '#333333',
    flex: 1,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  subMenu: {
    paddingLeft: 48, // Indentation for sub-menu
    // backgroundColor: '#EFEFEF',
  },
  subMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 1,
  },
  subMenuItemText: {
    fontSize: 12,
    // color: '#333333',
  },
  qrSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  qrPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#D8D8D8',
    marginBottom: 16,
  },
  registrationId: {
    fontSize: 12,
    color: '#7D7D7D',
    marginBottom: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  logoutText: {
    fontSize: 14,
    color: '#FF5252',
    marginRight: 8,
  },
  switchText: {
    fontSize: 12,
    color: '#7D7D7D',
  },
});

const mapStateToProps = state => {
  return {
    // AppSetting: state.Customer.AppSetting,
    EventId: state.Customer.EventId,
    Token: state.Customer.Token,
    LockEvent: state.Customer.LockEvent,
    EventName: state.Customer.EventName,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    chengToken: Token => {
      const action = {
        type: 'CHANGE_C_Token',
        Token,
      };
      dispatch(action);
    },
    chengEventName: EventName => {
      const action = {
        type: 'CHANGE_C_EventName',
        EventName,
      };
      dispatch(action);
    },
    chengeAppSetting: AppSetting => {
      const action = {
        type: 'CHANGE_C_AppSetting',
        AppSetting,
      };
      dispatch(action);
    },
    chengeEventId: EventId => {
      const action = {
        type: 'CHANGE_C_EventId',
        EventId,
      };
      dispatch(action);
    },
    chengeFooterTab: FooterTab => {
      const action = {
        type: 'CHANGE_C_FooterTab',
        FooterTab,
      };
      dispatch(action);
    },
    chengeModules: Modules => {
      const action = {
        type: 'CHANGE_C_Modules',
        Modules,
      };
      dispatch(action);
    },
    chengeLockEvent: LockEvent => {
      const action = {
        type: 'CHANGE_C_LockEvent',
        LockEvent,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
