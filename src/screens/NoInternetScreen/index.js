import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GetApplicationSetting } from '../../constants/api';

const NoInternetScreen = ({ onRetry, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleRetry = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const AppSettings = await GetApplicationSetting();

      // Set Background Color if available
      if (AppSettings?.Answer?.AppBackgroundColor) {
        navigation.replace('Splash', { AppSettings });
      }

      setIsLoading(false);
      onRetry && onRetry();
    }, 1000);
  };

  React.useEffect(() => {
    startFadeIn();
  }, []);

  return (
    <LinearGradient
      colors={['#3a1c71', '#d76d77', '#ffaf7b']}
      style={styles.container}
    >
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
    
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>
          Your internet connection seems to be offline.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRetry}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.retryButtonText}>Try Again</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default NoInternetScreen;
