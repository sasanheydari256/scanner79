import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/Screen";

export default styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_HEIGHT * 0.28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    flatList: {
        // marginTop: '1.5%', // پایین‌تر آوردن FlatList به میزان 2%
        zIndex: 1001,
    },
    imageContainer: {
        borderRadius: 15, // افزودن borderRadius به تصاویر
        overflow: 'hidden', // تنظیم overflow برای تصاویر گرد شده
        justifyContent:'flex-end'
    },
    image: {
        width: SCREEN_WIDTH * 0.95,
        height: '97%',
        resizeMode: 'stretch',
        borderRadius: 15, // افزودن borderRadius به خود تصویر
        
    },
    textOverlay: {
        backgroundColor: '#585df9',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        position: 'relative',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        paddingTop: '5%',
        paddingBottom: '3%',
        bottom: '3%'
    },
    title: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        width: '89%',
    },
    liveText: {
        fontSize: 12,
        // color: 'red',
        textAlign: 'center',
        color: '#fff',

    },
    indicatorContainer: {
        position: 'absolute',
        bottom: '34%',
        right: '38%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // backgroundColor:'red',
        zIndex: 1011
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});