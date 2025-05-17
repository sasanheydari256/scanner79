import React, { useState, useEffect } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';

const ShakingError = ({ error, text, restart }) => {
  const [shakeAnim, setShakeAnim] = useState(new Animated.Value(0));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [show, setShow] = useState(false);

  useEffect(() => {
    const triggerAnimation = async () => {
      if (error) {
        setShow(true);

        // Reset animations
        setShakeAnim(new Animated.Value(0));
        setFadeAnim(new Animated.Value(1));

        // Wait for 1 second before starting the shake animation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();

        // Wait for 15 seconds before starting the fade-out animation
        await new Promise((resolve) => setTimeout(resolve, 15000));

        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => setShow(false));
      } else {
        setShow(false);
        setFadeAnim(new Animated.Value(1)); // Reset the fade animation
      }
    };

    triggerAnimation();
  }, [error, restart]); // Depend on both `error` and `restart`

  return (
    show && (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: shakeAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.errorText}>{text}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fddfdd50',
    alignSelf: 'center',
    marginTop: '10%',
    padding: 10,
    borderRadius: 50,
  },
  errorText: {
    color: '#f44336',
  },
});

export default ShakingError;
