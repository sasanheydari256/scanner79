import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FONTSIZE } from '../../../constants/Screen';
import CText from '../../custom/Text';
const formatNumber = (number) => number.toString().padStart(2, '0');

const CountdownTimer = ({ data }) => {
    // const sample = {"day": 38, "hour": 6, "minut": 12, "remine": true, "sec": 59}
    // console.log(data);
    
    const [timetrack, setTimetrack] = useState(data);



    useEffect(() => {
        const eventDate = new Date(data.day + 'T' + (data.hour || '00:00'));
        const now = new Date();
        if (eventDate <= now) {
            return;
        }
        const intervalM = setInterval(() => {
            setTimetrack((prev) => {
                if (prev.sec === 0 && prev.minut === 0 && prev.hour === 0 && prev.day === 0) {
                    clearInterval(intervalM);
                    return prev;
                }

                const newSec = prev.sec === 0 ? 59 : prev.sec - 1;
                const newMinut = prev.sec === 0 ? (prev.minut === 0 ? 59 : prev.minut - 1) : prev.minut;
                const newHour = prev.sec === 0 && prev.minut === 0 ? (prev.hour === 0 ? 0 : prev.hour - 1) : prev.hour;
                const newDay = prev.sec === 0 && prev.minut === 0 && prev.hour === 0 ? (prev.day === 0 ? 0 : prev.day - 1) : prev.day;

                if (newSec === 0 && newMinut === 0 && newHour === 0 && newDay === 0) {
                    clearInterval(intervalM);
                }
                return {
                    ...prev,
                    sec: newSec,
                    minut: newMinut,
                    hour: newHour,
                    day: newDay,
                };
            });
        }, 1000);

        return () => clearInterval(intervalM);
    }, []);

    return (
        <View style={styles.countdownWrapper}>
            {['Days  ', 'Hours ', 'Min ', 'Sec'].map((label, index) => (
                <View key={label} style={styles.countdownItem}>
                    <CText style={styles.countdownLabel}>{label}</CText>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <CText style={styles.countdownValuetop}>
                                {formatNumber(timetrack[['day', 'hour', 'minut', 'sec'][index]])}
                            </CText>
                        </View>
                        {index < 3 && (
                            <View style={{ left: '20%' }}>
                                <CText style={styles.countdownValue}>:</CText>
                            </View>
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    countdownWrapper: {
        flexDirection: 'row',
        
        bottom: '28%',
    },
    countdownItem: {
        alignItems: 'center',
        marginRight: '1%',
    },
    countdownLabel: {
        fontSize: 10,

    },
    countdownValuetop: {
        fontSize: FONTSIZE[1],
        fontWeight: '400',
    },
    countdownValue: {
        fontSize: FONTSIZE[1],
        fontWeight: '400',
    },
});

export default CountdownTimer;
