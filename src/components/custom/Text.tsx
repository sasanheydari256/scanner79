import React, { useEffect } from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { FONTSIZE } from '../../constants/Screen';
import { useTheme } from '../../theme/ThemeProvider';

interface CustomTextProps extends TextProps {
  fontSize?: number;
  fontFamilyType?: 'inter' | 'source-sans';
  style?: TextStyle | TextStyle[];
  children: React.ReactNode | String;
  color?: string;
}

const CText: React.FC<CustomTextProps> = ({
  fontSize,
  fontFamilyType = 'inter',
  style,
  children,
  color,
  ...props
}) => {
  const { theme } = useTheme();
  useEffect(() => {
  }, [theme]);
  const fontFamily =
    fontFamilyType === 'inter' ? 'inter' : 'source-sans';
  return (
    <Text style={[styles.defaultStyle,
    {
      fontSize: fontSize, fontFamily,
      color: color ?
        color
        :
        theme.dark ?
          theme.colors.text
          :
          theme.colors.ApplicationFontColor
    }
      , style]} {...props}>
      {children}

    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: FONTSIZE[1],
  },
});

export default CText;
