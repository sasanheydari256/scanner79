import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomButton = ({
  onPress = () => {},
  buttonText,
  iconName,
  iconSize = 24,
  iconColor = 'white',
  buttonStyle,
  textStyle,
  disabled = false,
  badgeCount,
  loading = false, // ✅ new prop
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        buttonStyle,
        isDisabled && styles.disabledButton,
      ]}
    >
      <View style={styles.buttonContent}>
        <Text style={[styles.buttonText, textStyle]}>
          {buttonText}
        </Text>

        <View style={styles.iconWrapper}>
          {loading ? (
            <ActivityIndicator size="small" color={iconColor} />
          ) : iconName ? (
            <>
              <Icon
                name={iconName}
                size={iconSize}
                color={iconColor}
                style={styles.icon}
              />
              {badgeCount != null && badgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
              )}
            </>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  iconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  icon: {
    marginRight: 0,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CustomButton;
