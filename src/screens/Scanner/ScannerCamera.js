import React from 'react';
import { Camera } from 'react-native-vision-camera';

export default function ScannerCamera({ cameraRef, isCameraActive, codeScanner, device }) {
  if (!device) return null;

  return (
    <Camera
      key={device.id}
      ref={cameraRef}
      style={{ flex: 1 }}
      device={device}
      isActive={isCameraActive}
      codeScanner={codeScanner}
    />
  );
}
