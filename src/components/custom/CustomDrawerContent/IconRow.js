import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/Screen';
import CText from '../Text';
import { useNavigation } from '@react-navigation/native';
// آیکون‌ها و عنوان‌ها را از طریق پراپس ارسال می‌کنیم
const IconButton = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.iconButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <CText color='#333' style={styles.title}>{title}</CText>
    </TouchableOpacity>
  );
};

const IconRow = (props) => {
  const profile = props.profile;
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      {/* <IconButton
        icon={require('../../../assets/img/agenda.png')}
        title="My Agenda"
        onPress={() => {
          navigation.navigate('MyAgenda', {});

        }}
      /> */}
      <IconButton
        icon={require('../../../assets/img/archivetick.png')}
        title="My Bookmarks"
        onPress={() => {
          navigation.navigate('Bookmark', {});
        }}
      />
      <IconButton
        icon={require('../../../assets/img/Notification4.png')}
        title="Notifications"
        onPress={() => {
          navigation.navigate('MyNotifications', {data: []});

        }}
      />
      <IconButton
        icon={require('../../../assets/img/myvCard.png')}
        title="My vCard"
        onPress={() => {
          navigation.navigate('MyContactCard', {data: profile});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '1%',
    marginTop: '2%',
    width: 'auto'
  },
  iconButton: {
    alignItems: 'center',
    paddingVertical: '0.1%',
    borderRadius: 15,
    // height: SCREEN_WIDTH * 0.15,

  },
  iconContainer: {
    // backgroundColor: '#588899',
    justifyContent: 'center',
    paddingVertical: '8%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    marginBottom: 5,
    height: SCREEN_WIDTH * 0.08,

  },
  icon: {
    width: SCREEN_WIDTH * 0.065,
    maxHeight: SCREEN_WIDTH * 0.065,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    // color: '#333',
  },
});

export default IconRow;
