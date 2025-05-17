import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTSIZE } from '../../../constants/Screen'; // Assuming FONTSIZE is relevant
import { Icon } from 'native-base';
import CustomText from '../../custom/Text';

// Import formatDate if needed (consider inlining for simplicity)
// import { formatDate } from '../services';

interface DateProps {
  text: string; // Assuming day is a string (modify if needed)
  iconColor?: string;
  iconName?: string;
  textColor?: string | undefined;
}

const IconTextContainer: React.FC<DateProps> = ({ textColor,iconName, iconColor, text, ...rest }) => {
  // Consider inlining formatDate if it's a simple formatting function:
  // const formattedDay = formatDate(day); // Assuming formatDate returns a string

  return (
    <View style={styles.dateContainer}>
      <Icon name={iconName ? iconName : "calendar-o"} type="FontAwesome" style={[styles.iconDate,
      { color: iconColor ? iconColor : '#555' }]} {...rest} />
      <CustomText style={[styles.date, { color: textColor ? textColor : '#555' }]}>{text}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDate: {
    fontSize: FONTSIZE[2],
    marginRight: 6,
  },
  date: {
    marginLeft: '2%',
    fontSize: FONTSIZE[1],
  },
});

export default IconTextContainer;