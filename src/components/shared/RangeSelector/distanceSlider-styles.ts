import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// import {  heightPxToDP, widthPxToDP } from 'common/utilities';
import { FONTSIZE } from '../../../constants/Screen';
// import { 2 } from './constants';

interface Styles {
    range: ViewStyle;
    rangeSlider: ViewStyle;
    rangeText: TextStyle;
    thumbContainer: ViewStyle;
    notch: ImageStyle;
    distanceText: TextStyle;
    sliderThumb: ViewStyle;
    rail: ViewStyle;
    railSelected: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
    range: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
    },
    rangeSlider: {
        marginRight: 0,
        marginLeft: 0,
    },
    rangeText: {
        fontSize: FONTSIZE[1],
    },
    thumbContainer: {
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#5669ff'
    },
    distanceText: {
        alignItems: 'center',
        color: 'black',
        fontSize: FONTSIZE[1],
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    notch: { height: 10 },
    sliderThumb: {
        backgroundColor: 'royalBlue',
        borderColor: 'white',
        borderRadius: 2,
        borderWidth: 1,
        height: 2 * 1.5,
        marginLeft: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.16,
        shadowRadius: 6,
        width: 2 * 1.5,
    },
    rail: {
        backgroundColor: 'concrete',
        borderRadius: 2,
        flex: 1,
        height: 100,
    },
    railSelected: {
        backgroundColor: '#5669ff',
        borderRadius: 2,
        height: 5,
    },
});
export default styles;