import NetInfo from '@react-native-community/netinfo';

export const checkInternetStatus = async () => {
  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected || !state.isInternetReachable) {
      // اینترنت قطع است
      return 'offline';
    }

    if (state.type === 'cellular') {
      // اتصال موبایل است، قدرت سیگنال را بررسی می‌کنیم (فقط اندروید)
      const strength = state.details?.strength; // عدد بین 0 تا 4 یا 5
      if (strength !== undefined && strength <= 1) {
        return 'poor_signal';
      }
    }

    // اتصال اینترنت خوب است
    return 'online';

  } catch (error) {
    console.error('Error checking internet status:', error);
    return 'offline';
  }
};
