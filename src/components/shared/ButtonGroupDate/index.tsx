import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonLabel } from '../../../types/type';
import { useTheme } from '../../../theme/ThemeProvider';
import CText from '../../custom/Text';

interface ButtonGroupDateProps {
  onClick: (buttonText: string, index: number) => void;
  selectedIndexProps: number
}

const ButtonGroupDate: React.FC<ButtonGroupDateProps> = ({ onClick, selectedIndexProps }) => {

  const [selectedIndex, setSelectedIndex] = useState<number>(selectedIndexProps || 0); // ابتدا دکمه اول انتخاب شده است


  const buttons: ButtonLabel[] = ['All Day', 'Today', 'Next Week', 'Next Month'];
  const { theme } = useTheme();
  useEffect(() => {
    setSelectedIndex(selectedIndexProps); 

  }, [theme, selectedIndexProps]);
  return (
    <View style={styles.container}>
      {buttons.map((buttonText, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setSelectedIndex(index);
            onClick(buttonText, index);
          }}
          style={[
            styles.button,
            selectedIndex === index && styles.selectedButton,
            
          ]}
        >
          <CText
            style={[
              styles.buttonText,
              {color: selectedIndex === index ? theme.colors.textSelected : theme.colors.text},
            ]}
          >
            {buttonText}
          </CText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: '2%',
    paddingHorizontal: '8%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: '2%',
  },
  selectedButton: {
    backgroundColor: '#5069f8',
  },
  buttonText: {
    // color: '#000',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default ButtonGroupDate;
