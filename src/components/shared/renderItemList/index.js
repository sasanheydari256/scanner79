import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CText from '../../custom/Text';
import { BASE_URL_IMG } from '../services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import FastImage from 'react-native-fast-image';

export const renderItemList = (item, index, lastIndex, theme, onPress) => {
    // console.log(item.Name);

    const isLast = index === lastIndex;
    return (
        <TouchableOpacity
            key={index}
            onPress={() => {
                onPress()
            }}
            style={{ alignItems: 'center' }}>
            <View style={[styles.itemContainer, { backgroundColor: theme.colors.primarybg }]}>
                <FastImage
                    source={{ uri: BASE_URL_IMG + item.Image,priority: FastImage.priority.high }} style={styles.avatar}
                />
                {/* <Image source={{ uri: BASE_URL_IMG + item.Image }} style={styles.avatar} /> */}

                <View style={styles.textContainer}>
                    <CText style={styles.name}>{item.UserPreFix}{item.Name || item.Title}</CText>
                    <CText numberOfLines={1} style={styles.title}>{item.Biography}</CText>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        onPress()
                    }}
                    style={styles.messageButton}>
                    <Image
                        source={require('../../../assets/img/message.png')} // آیکون پیام
                        style={styles.messageIcon}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export const Separator = () => (
    <View
        style={{
            alignSelf: 'center',
            height: SCREEN_HEIGHT * 0.0007,
            width: SCREEN_WIDTH * 0.89,
            backgroundColor: '#88888850',
        }}
    />
);

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 14,
        marginTop: 5,
    },
    messageButton: {
        padding: 10,
    },
    messageIcon: {
        width: 20,
        height: 20,
    },
});
