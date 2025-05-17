import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // می‌توانید کتابخانه آیکون دیگری انتخاب کنید

const CustomButton = ({ onPress = () => { }, buttonText, iconName, iconSize = 24, iconColor = 'white', buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
    >
      <View style={styles.buttonContent}>
        <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>

        {iconName && (
          <Icon
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
    marginLeft: 8,

  },
});

export default CustomButton;