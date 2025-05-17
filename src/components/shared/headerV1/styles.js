import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../../constants/Screen";

export default  styles = StyleSheet.create({
    imageContainer: {
        width: SCREEN_WIDTH * 0.95,
        height: '26%',
        borderRadius: 15, // 
        overflow: 'hidden', // 
    },
    image: {
        width: SCREEN_WIDTH * 0.95,
        height: '100%',
        resizeMode: 'stretch',
        borderRadius: 15, //
    },
    iconRightHeader: {
        width: (SCREEN_WIDTH * 7) / 100,
        height: (SCREEN_WIDTH * 7) / 100,
      },
});