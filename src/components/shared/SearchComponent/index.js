import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { Icon } from "native-base";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
const rowIcon = require('../../../assets/img/row1.png');
const colIcon = require('../../../assets/img/column1.png');
const SearchComponent = ({ data, onSearchResult, typeOfView, onPressType }) => {
    const [query, setQuery] = useState("");
    const [typeOfViewstate, setTypeOfViewstate] = useState(typeOfView);

    const handleTypeOfView = (e) => {
        setTypeOfViewstate(e);
        onPressType(e)
    }
    // تابع فیلتر کردن داده‌ها
    const handleSearch = (text) => {
        setQuery(text);

        const filteredData = data.filter((item) => {
            // بررسی اگر Name مقدار معتبر دارد
            if (item?.Name) {
                return item.Name.toLowerCase().includes(text.toLowerCase());
            }
            return false; // اگر Name وجود ندارد، این آیتم را فیلتر نکن
        });
        onSearchResult(filteredData); // ارسال نتایج فیلترشده
    };


    return (
        <View style={[styles.container]}>
            <View style={[styles.searchBox, { width: typeOfView ? '80%' : '100%' }]}>
                <Icon
                    name="search1"
                    type='AntDesign'
                    style={{ color: '#888' }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    placeholderTextColor={'#222'}
                    value={query}
                    onChangeText={handleSearch}
                />
                <View style={{ width: SCREEN_HEIGHT * 0.03, height: SCREEN_WIDTH * 0.06 }}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="stretch"
                        style={{ width: '100%', height: '100%' }}
                        source={require('../../../assets/img/filter2.png')} />
                </View>

            </View>
            {typeOfView &&
                <View>
                    <View style={{
                        flexDirection: 'row',
                        height: SCREEN_HEIGHT * 0.05,

                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                handleTypeOfView('grid')
                            }}>
                            <Image
                                resizeMode="stretch"
                                style={{
                                    width: (SCREEN_WIDTH * 8) / 100,
                                    height: '100%',
                                }}
                                source={colIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleTypeOfView('nogrid')
                            }}>
                            <Image
                                resizeMode="stretch"
                                style={{
                                    marginLeft: '4%',
                                    width: (SCREEN_WIDTH * 8) / 100,
                                    height: '100%',
                                }}
                                source={rowIcon}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            }

        </View>
    );
};

export default SearchComponent;

// استایل‌ها
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '1.5%',
        flexDirection: 'row',
        // paddingTop: '2%',
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 10,
        height: SCREEN_HEIGHT * 0.05,
    },
    input: {
        flex: 1,
        fontSize: 12,
        paddingHorizontal: 10,
        color: "#333",
        paddingTop: '1%',
        top: '1%'
    },
    squareLeft: {
        width: 20,
        height: 20,
        backgroundColor: "#D1D1E9",
        borderRadius: 3,
    },
    squareRight: {
        width: 20,
        height: 20,
        backgroundColor: "#D1D1E9",
        borderRadius: 3,
    },
});

