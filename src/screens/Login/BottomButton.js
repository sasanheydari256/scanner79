import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const BottomButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.text}>
          PLUS REGISTRATION | CHECKIN+ | EVENTPASS
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef3ff', // پس‌زمینه بیرونی
    padding: 16,
  },
  button: {
    backgroundColor: '#ffffff', // رنگ سفید دکمه
    borderRadius: 30, // گوشه‌های گرد
    paddingVertical: 12, // فضای عمودی داخل دکمه
    paddingHorizontal: 24, // فضای افقی داخل دکمه
    shadowColor: '#000', // رنگ سایه
    shadowOffset: { width: 0, height: 2 }, // فاصله سایه
    shadowOpacity: 0.1, // شفافیت سایه
    shadowRadius: 3, // شعاع سایه
    elevation: 2, // سایه برای اندروید
  },
  text: {
    color: '#5A5A5A', // رنگ متن
    fontSize: 12, // اندازه فونت
    textAlign: 'center', // متن وسط چین
    letterSpacing: 1, // فاصله بین حروف
  },
});

export default BottomButton;
