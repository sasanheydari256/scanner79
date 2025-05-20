// NoCameraDeviceError.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { openSettings } from 'react-native-permissions';

const NoCameraDeviceError = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📷🚫</Text>
      <Text style={styles.title}>No Camera Detected</Text>
      <Text style={styles.message}>
        We couldn’t find a camera on this device. This might happen if:
      </Text>
      <Text style={styles.bullet}>• The device doesn't have a camera</Text>
      <Text style={styles.bullet}>• Camera is restricted or hardware issue</Text>

      <View style={styles.buttons}>
        <Button title="Open Settings" onPress={openSettings} />
        {onRetry && <Button title="Retry" onPress={onRetry} />}
      </View>
    </View>
  );
};

export default NoCameraDeviceError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  buttons: {
    marginTop: 20,
    gap: 12,
  },
});
