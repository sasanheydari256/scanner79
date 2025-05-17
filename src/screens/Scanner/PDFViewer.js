import React from 'react';
import WebView from 'react-native-webview';

export default function PDFViewer({ url, webViewRef }) {
  if (!url) return null;

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: url }}
      style={{ flex: 1 }}
      originWhitelist={['*']}
    />
  );
}
