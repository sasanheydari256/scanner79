import React, { useCallback, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Pressable } from 'react-native';
import { isIOS } from '../../../constants/Platform';
import { FONTSIZE, ICONSIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import { Icon } from 'native-base';
import {
    getReminTime,
    getTime,
    getDay,
    convertToISOString,
    BASE_URL_IMG,
    formatDateDayMonth,
    formatDate
} from '../services';
import OverlappingAvatars from '../OverlappingAvatars';
import CountdownTimer from '../CountdownTimer';
import CText from '../../custom/Text';
import { useTheme } from '../../../theme/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent, removeEventById } from '../../../redux/actions';
const BanerCard = ({ data, onPressCard }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.events);
    const eventExistsInBookmark = events.some(event => event.Id === data.Id);
    const { theme } = useTheme();

    useEffect(() => {
        
    }, [theme]);

    const initialTime = data.TypeTime === 'Current' || data.TypeTime === 'Future'
        ? getReminTime(
            getTime(convertToISOString(data.Day)) || data.Hour,
            getDay(convertToISOString(data.Day)),
        )
        : getReminTime(
            getTime(convertToISOString('0000-00-00')) || '00:00',
            getDay(convertToISOString('0000-00-00')),
        );

    // const [timetrack, setTimetrack] = useState(initialTime);


    const CImage = ({ imageName }) => {
        return (
            <Image
                source={{ uri: BASE_URL_IMG + imageName }}
                style={styles.image}
                resizeMode='stretch'
            />
        );
    };
    const handlePressCard = useCallback(() => {
        // You can add any additional logic here if needed
        onPressCard(data);
    }, [onPressCard]);
    // گرفتن روز از تاریخ
    const formattedDate = formatDateDayMonth(data.Day);

    const formattedDayDate = formattedDate.day;
    const formattedMonthDate = formattedDate.month;
    return (
        <Pressable
            onPress={handlePressCard}
            style={styles.eventCard}>
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <View style={styles.topSection}>
                    <CImage
                        imageName={data.Image}
                    />
                    <View style={styles.overlay}>
                        <View style={styles.topDate}>
                            <CText style={styles.dateText}>{formattedDayDate}</CText>
                            <CText style={styles.dateText}>{formattedMonthDate}</CText>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (eventExistsInBookmark) {
                                    // console.log(data.Id, 'add in baner');
                                    dispatch(removeEventById(data.Id));

                                } else {
                                    dispatch(addEvent(data));

                                }

                                // dispatch(saveEvents(events));
                                // dispatch(addEvent(event))                 
                            }}
                            style={styles.bookmarkButton}>
                            {
                                eventExistsInBookmark ?
                                    <Image
                                        style={{ width: SCREEN_WIDTH * 0.04, height: SCREEN_WIDTH * 0.05 }}
                                        source={require('../../../assets/img/archived.png')} />
                                    :
                                    <Image
                                        style={{ width: SCREEN_WIDTH * 0.04, height: SCREEN_WIDTH * 0.05 }}
                                        source={require('../../../assets/img/archive.png')} />
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <CText style={styles.title}>
                        {data.Name}
                    </CText>
                    <View style={styles.speakersIcon}>
                        <View style={{ flexDirection: 'row', width: '73%',alignItems:'center' }}>
                            <OverlappingAvatars loginData={data.Parts.Login} />
                            <CText style={{ color: '#585df9', fontSize: 12 }}>
                                + {data.Parts?.LoginNumber} Going
                            </CText>
                        </View>

                        <View style={styles.dateContainer}>
                            {/* <Icon name='calendar-o' type='FontAwesome' style={styles.iconDate} /> */}
                            <Image
                                style={{
                                    width: SCREEN_WIDTH * 0.03,
                                    height: SCREEN_WIDTH * 0.03,
                                    marginRight: '4%'
                                }}
                                source={require('../../../assets/img/calendar.png')} />
                            <CText style={styles.date}>{formatDate(data.Day)}</CText>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <View style={styles.locationWrapper}>
                            <Icon name='map-marker-alt' type='FontAwesome5' style={styles.iconLocation} />
                            <CText style={styles.location}>{data.Location}</CText>
                        </View>
                        <CountdownTimer data={initialTime} />
                    </View>
                </View>
            </View>
        </Pressable>

    );
};

const styles = StyleSheet.create({
    eventCard: {
        // backgroundColor: '#fff',
        marginHorizontal: '1%',
        marginVertical: '1%',
        paddingBottom:'2%'


    },
    card: {
        borderRadius: 15,
        // backgroundColor: '#fff',
        ...isIOS ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
        } : {
            elevation: 6,
            shadowColor: '#000',
            shadowOpacity: 0.55,
            shadowRadius: 50,
        },
    },
    topSection: {
        position: 'relative',
        borderRadius: 15,

    },
    image: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: (SCREEN_HEIGHT * 17) / 100,
        resizeMode: 'stretch',
    },
    overlay: {
        position: 'absolute',
        top: '5%',
        left: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: '2%',
    },
    topDate: {
        backgroundColor: '#efefef',
        width: '10%',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: '1%'
    },
    dateText: {
        color: '#555efeff',
        fontSize: FONTSIZE[1],
    },
    bookmarkButton: {
        borderRadius: 20,
        padding: '2%',
        backgroundColor: '#fff',
        marginRight: '2%'
    },
    iconBannerBookmark: {
        fontSize: ICONSIZE[2],
        color: 'orange',
    },
    bottomSection: {
        paddingTop: '2%',
        paddingLeft: '2%'
    },
    title: {
        fontSize: FONTSIZE[2],
        fontWeight: 'bold',
        marginBottom: '1%',
    },
    speakersIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goingText: {
        alignSelf: 'center',
        color: '#F39C12',
        marginLeft: '1%',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: '35%',
    },

    date: {
        fontSize: FONTSIZE[1],
    },
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2%',
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        bottom: '10%'
    },
    iconLocation: {
        color: '#555',
        fontSize: FONTSIZE[2],
        marginRight: '2%',
    },
    location: {
        fontSize: 10,
    },
    countdownWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: '28%'
    },
    countdownItem: {
        alignItems: 'center',
        marginRight: 8,
    },
    countdownLabel: {
        fontSize: FONTSIZE[0],
    },
    countdownValue: {
        fontSize: FONTSIZE[3],
        fontWeight: '400',
    },
});

export default BanerCard;
