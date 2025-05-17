import React, { useState, useCallback } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import RangeSliderRN from 'rn-range-slider';
import styles from './distanceSlider-styles';
import { Icon } from 'native-base';
// import { scale } from 'react-native-size-scaling';

interface IDistanceSlider {
    /** distance is a required prop for default state of distance range */
    distance: number;
    /** startRange is a required prop that takes the initial minimum value of slider */
    startRange: number;
    /** lastRange is a required prop that takes the initial maximum value of slider */
    lastRange: number;
    /** onValueChange provides functionality to change the value of slider */
    onValueChange: (value: {low: number, high: number}) => void;
}

const RangeSelector: React.FC<IDistanceSlider> = props => {
    const { distance, lastRange, onValueChange, startRange } = props;

    const [low, setLow] = useState(startRange);
    const [high, setHigh] = useState(distance);


    /*
    * Function to render Thumb of slider
    */
    const renderThumb = () => {
        return (
            <View style={styles.thumbContainer}>
                
                <Icon
                name={'select-arrows'}
                type={'Entypo'}
                style={{transform: [{ rotate: '90deg' }]}}
              />
                <View style={styles.sliderThumb} />
            </View>
        );
    };

    /**
    * This function Will be called when a value was changed.
    */
    const handleValueChange = useCallback(
        (low: number, high: number) => {
            setLow(low);
            setHigh(high);
            onValueChange({ low, high });
        },
        [onValueChange],
    );

    /**
    * Function to render rail for thumbs
    */
    const renderRail = useCallback(() => <View style={styles.rail} />, []);

    /**
    * Function to render the selected part of "rail" for thumbs.
    */
    const renderRailSelected = useCallback(
        () => <View style={styles.railSelected} />,
        [],
    );

    return (
        <>
            <View style={styles.range}>
                {/* <Text style={styles.rangeText}> {startRange} </Text> */}
                {/* <Text style={styles.rangeText}> {lastRange}</Text> */}
            </View>
            <View style={styles.rangeSlider}>
                <RangeSliderRN
                    high={high}
                    low={low}
                    max={lastRange}
                    min={startRange}
                    onValueChanged={handleValueChange}
                    renderRail={renderRail}
                    renderRailSelected={renderRailSelected}
                    renderThumb={renderThumb}
                    step={1}
                />
            </View>
        </>
    );
};

export default RangeSelector;
