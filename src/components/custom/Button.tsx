import React from 'react';
import {
    Text,
    TextProps,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    ViewStyle, StyleProp,
    View
} from 'react-native';
import { FONTSIZE, ICONSIZE } from '../../constants/Screen';
import { Icon } from 'native-base';

interface CustomTextProps extends TextProps {
    style?: StyleProp<ViewStyle>;
    fontSize?: number;
    fontFamilyType?: 'InterVariable' | 'source-sans';
    textStyle?: TextStyle;
    buttonStyle?: ViewStyle;
    text: string;
    icon?: string | undefined;
    isSelected?: boolean;
    typeIcon?: any | undefined;
    onPress?: () => void;
}

const areEqual = (prevProps: CustomTextProps, nextProps: CustomTextProps) => {
    return (
        prevProps.fontSize === nextProps.fontSize &&
        prevProps.fontFamilyType === nextProps.fontFamilyType &&
        JSON.stringify(prevProps.textStyle) === JSON.stringify(nextProps.textStyle) &&
        JSON.stringify(prevProps.buttonStyle) === JSON.stringify(nextProps.buttonStyle) &&
        prevProps.text === nextProps.text &&
        prevProps.icon === nextProps.icon &&
        prevProps.typeIcon === nextProps.typeIcon &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.onPress === nextProps.onPress
    );
};

const CButton: React.FC<CustomTextProps> = React.memo(({
    style,
    fontSize,
    fontFamilyType = 'InterVariable',
    textStyle,
    buttonStyle,
    text,
    icon,
    typeIcon,
    isSelected,
    onPress,
    ...props
}) => {
    const fontFamily = fontFamilyType === 'InterVariable' ? 'InterVariable' : 'source-sans';
    const buttonBackgroundColor = isSelected ? '#168fff' : '#fefefe';
    const textColor = isSelected ? '#fefefe' : '#000';

    return (
        <TouchableOpacity
            style={Array.isArray(style) ? style : [style, styles.defaultButtonStyle,
                buttonStyle,
                { backgroundColor: buttonBackgroundColor }]}

            onPress={onPress}
            {...props}
        >
            <View style={styles.buttonContent}>
                {typeIcon && <Icon
                    name={icon}
                    type={typeIcon}
                    style={{
                        fontSize: ICONSIZE[1], color: isSelected ? "#fff" : '#ff704390',
                        paddingRight: '1%'
                    }}
                />}
                <Text
                    style={[
                        { fontSize, fontFamily },
                        styles.defaultTextStyle,
                        textStyle,
                        { color: textColor }
                    ]}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}, areEqual);

const styles = StyleSheet.create({
    defaultButtonStyle: {
        padding: '3%',
        borderRadius: 14,
        flexDirection: 'row',
        elevation: 5
    },
    defaultTextStyle: {
        fontSize: FONTSIZE[1],
        color: '#fff',
        textAlign: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CButton;
