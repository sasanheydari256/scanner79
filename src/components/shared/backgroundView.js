import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackgroundImageComponent = ({ imageSource, children }) => {
    // const isUrl = typeof imageSource === 'string' && (imageSource.startsWith('http') || imageSource.startsWith('https'));
    const bgHeader = require('../../assets/img/bg-header25.png')

    return (
        <ImageBackground
            source={bgHeader}
            style={styles.background}
        >
            <View style={styles.content}>
                { children }
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover', // 
        justifyContent: 'center',
        backgroundColor: '#6200ee', //
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackgroundImageComponent;
