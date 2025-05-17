import React from 'react';
import { View, Pressable, TouchableOpacity, Image } from 'react-native';


import styles from './styles'; //
import { FONTSIZE, SCREEN_HEIGHT } from '../../../constants/Screen';
import MainEventHeader from '../header/HomeEventHeader';
import CText from '../../custom/Text';
import { Icon } from 'native-base';

const MainHeader = ({ navigation, backgroundColor, title, goBack, rightComponent, IndentationFlag = false }) => {
    return (
        <MainEventHeader
            backgroundColor={backgroundColor}
            leftComponent={
                <View style={{ flexDirection: 'row' }}>
                    <Pressable
                        style={{ paddingTop: SCREEN_HEIGHT * 0.01 }}
                        hitSlop={{ top: 20, bottom: 20, left: 40, right: 2 }}

                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    >
                        <Icon
                            name={'align-left'}
                            type={'Foundation'}
                            style={{ color: '#fff' }}
                        />
                    </Pressable>
                    {
                        goBack && <Pressable
                            style={{ paddingTop: SCREEN_HEIGHT * 0.01, paddingLeft: '22%' }}
                            hitSlop={{ top: 20, bottom: 20, left: 2, right: 20 }}
                            onPress={() => {
                                goBack()
                            }}
                        >
                            <Icon
                                name={'arrowleft'}
                                type={'AntDesign'}
                                style={{ color: '#fff' }}
                            />
                        </Pressable>
                    }

                </View>

            }
            centerComponent={
                <View style={{
                    paddingTop: SCREEN_HEIGHT * 0.017,
                    alignItems: 'center',
                    left: '6%'
                }}>
                    <CText fontSize={FONTSIZE[2]} color={'#fff'}>
                        {title}
                    </CText>
                </View>
            }
            rightComponent={
                rightComponent === undefined ?
                    (
                        <View style={{ flexDirection: 'row', paddingTop: SCREEN_HEIGHT * 0.01 }}>
                            <Icon
                                name={'bell-o'}
                                type={'FontAwesome'}
                                style={{ color: '#fff' }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.push('AboutUs');
                                }}
                                style={{ paddingLeft: 10 }}
                            >
                                <Image
                                    style={styles.iconRightHeader}
                                    source={require('../../../assets/img/Icon-about.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    (
                        rightComponent
                    )

            }
            IndentationFlag={IndentationFlag}
        />
    );
};

export default MainHeader;
