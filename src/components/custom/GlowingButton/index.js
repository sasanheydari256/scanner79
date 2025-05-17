import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const GlowingButton = ({onPress}) => {
  const handlePress = () => {
    onPress()
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // پس‌زمینه نیمه شفاف
  },
  button: {
    backgroundColor: '#001F5490', // رنگ آبی تیره دکمه
    borderRadius: 8, // گوشه‌های گرد
    paddingVertical: 10, // ارتفاع دکمه
    paddingHorizontal: 20, // عرض دکمه
    elevation: 10, // ایجاد سایه برای عمق
    shadowColor: '#00A6FF', // رنگ سایه (هاله آبی)
    shadowOffset: { width: 1, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15, // شعاع هاله
  },
  buttonText: {
    color: '#FFFFFF', // رنگ متن سفید
    fontSize: 18, // سایز فونت
    fontWeight: 'bold', // ضخیم‌تر کردن متن
    textAlign: 'center',
  },
});

export default GlowingButton;
