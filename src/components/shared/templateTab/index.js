import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONTSIZE, SCREEN_WIDTH } from '../../../constants/Screen';
import { ScrollView } from 'react-native-gesture-handler';

const TemplateTabComponent = (props) => {
    const [activeTab, setActiveTab] = useState(0); // ذخیره شماره تب فعال

    const tabs = ['Social Media', 'Google review', 'Help Center', 'Terms & Conditions'];

    const handleTabPress = (index) => {
        setActiveTab(index); // شماره تب را تنظیم می‌کنیم
        if (props.setSelectedTab) {
            props.setSelectedTab(index); // ارسال تب انتخاب‌شده به والد
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.tabRow}>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.tab,
                                activeTab === index && styles.activeTab,
                            ]}
                            onPress={() => handleTabPress(index)}
                        >
                            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                                {tab} {/* نمایش شماره تب */}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: '2%',
    },
    tabRow: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
    },
    tab: {
        paddingVertical: '2%',
        paddingHorizontal: '1%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#f1f1f1',
        marginHorizontal: '1%',
    },
    activeTab: {
        backgroundColor: '#fff',
    },
    tabText: {
        fontSize: FONTSIZE[1],
        color: '#666',
        textAlign: 'center',
    },
    activeTabText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default TemplateTabComponent;
