import { Icon } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { ICONSIZE } from '../../../constants/Screen';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
    const stars = Array.from({ length: maxRating }, (_, index) => (
        <Icon
            key={index}
            type={'AntDesign'}
            name={index < rating ? 'star' : 'staro'}
            style={{ color: '#FFD700', marginRight: 2,fontSize: ICONSIZE[0] }} // Add some margin for spacing
        />
    ));

    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default StarRating;
