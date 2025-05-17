import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FONTSIZE, SCREEN_HEIGHT } from '../../../constants/Screen';
import { useNavigation } from '@react-navigation/native';

const CHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer,
      {
        marginTop: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.04 : 0
      }
    ]}>
      <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.goBack()}>
        {/* <Icon
          name='arrow-left'
          type='MaterialCommunityIcons'
          style={{ color: '#000' }}
        /> */}
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {/* You can add more content here if needed */}
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: (SCREEN_HEIGHT * 7) / 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 3,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: FONTSIZE[3],
    fontWeight: 'bold',
  },
});

export default CHeader;
