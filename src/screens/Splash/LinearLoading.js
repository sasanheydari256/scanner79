import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';
import { SCREEN_HEIGHT } from '../../constants/Screen';

const LinearLoading = ({ progress }) => {
  const [loadingProgress, setLoadingProgress] = useState(new Animated.Value(0));

  // Trigger the animation on progress change
  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  // Interpolate width of the loading bar based on progress
  const widthInterpolated = loadingProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={[styles.loadingBar, { width: widthInterpolated }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '4%',
    alignItems: 'center',
  },
  background: {
    width: '90%',
    height: SCREEN_HEIGHT * 0.015,
    borderRadius: 10,
    backgroundColor: '#D0D0D0', // Background color
    overflow: 'hidden',
    borderColor: '#fff',
    borderWidth: 1,
  },
  loadingBar: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 25, 50, 0.4)', // Bright color for the loading bar
    shadowColor: 'rgba(0, 255, 255, 0.8)', // Shiny effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default LinearLoading;
