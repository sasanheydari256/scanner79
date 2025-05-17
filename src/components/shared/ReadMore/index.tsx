import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import StarRating from '../StarRating'; // Adjust the path as needed
import { FONTSIZE } from '../../../constants/Screen';
import CText from '../../custom/Text';

const ReadMore = ({ event }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const eventDescription = event.Description

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{}}>
                    <CText fontSize={12} style={styles.headerText}>About this event</CText>
                </View>
                {/* starts */}
                <StarRating rating={5} />
            </View>
            <CText style={styles.description} numberOfLines={isExpanded ? 0 : 2}>
                {eventDescription}
            </CText>
            <TouchableOpacity onPress={handleToggle}>
                <CText style={styles.readMore}>{isExpanded ? 'Show less' : 'Read more'}</CText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '2%',
        paddingBottom: '2%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%',
    },
    headerText: {
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,

    },
    readMore: {
        color: '#007BFF',
        marginTop: 8,
        fontSize: 10
    },
});

export default ReadMore;
