import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const FONTSIZE =
    SCREEN_WIDTH < 680 ? [9, 12, 14, 16, 18, 20, 22] : [9, 14, 16, 18, 20, 24, 26];
const ICONSIZE = SCREEN_WIDTH < 680 ? [14,20, 32, 30, 28, 26] : [14,20, 34, 32, 30, 28];
export { SCREEN_WIDTH, SCREEN_HEIGHT, FONTSIZE, ICONSIZE };
export const isTablet = SCREEN_WIDTH >= 768;
