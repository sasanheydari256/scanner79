import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import CText from '../../custom/Text';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getInitials(firstName, lastName) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  return initials.toUpperCase();
}

function getRandomDarkColor() {
  const randomColor = Math.floor(Math.random() * 128).toString(16);
  const randomColor2 = Math.floor(Math.random() * 180).toString(16);
  const darkColor = `#${randomColor.padStart(2, '0')}${randomColor2.padStart(2, '0')}${randomColor2.padStart(2, '0')}`;
  return darkColor;
}

const OverlappingAvatars = ({ loginData = [] }) => {
  // Initialize state for colors
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Generate colors when loginData changes
    setColors(loginData.map(() => getRandomDarkColor()));
  }, [loginData]);

  return (
    <View style={styles.container}>
      {loginData.slice(0, 4).map((user, index) => (
        <View
          key={index}
          style={[
            styles.avatarContainer,
            {
              // left: index * -(SCREEN_WIDTH * 0.01),
              zIndex: loginData.length - 1 - index,
              backgroundColor: colors[index] || '#ccc', // Default color if not set
            },
          ]}
        >
          <CText color='#fff'>{getInitials(user.FirstName, user.LastName)}</CText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: SCREEN_WIDTH * 0.06,
    height: SCREEN_HEIGHT * 0.03,
    borderRadius: SCREEN_WIDTH * 0.03, // Half of the width for a circular shape
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OverlappingAvatars;
