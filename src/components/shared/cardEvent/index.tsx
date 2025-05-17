import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon } from 'native-base';
import Styles from './Styles';
import { BASE_URL_IMG, formatDate } from '../services';
import { FONTSIZE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';
import { EventData } from '../../../types/interfaces';
import IconTextContainer from '../TextDateIcon';
import CText from '../../custom/Text';
import { useTheme } from '../../../theme/ThemeProvider';

interface Props {
  DATA: EventData[];
  onClick: (event: EventData) => void; // Define onClick prop for navigation
}

const rowIcon = require('../../../assets/img/row1.png');
const colIcon = require('../../../assets/img/column1.png');

const PrevListChange: React.FC<Props> = ({ DATA, onClick }) => {
  const { theme } = useTheme();
  useEffect(() => {

  }, [theme]);
  const [changewindow, setChangewindow] = useState(true);

  const renderItems = (items: EventData[]) => {
    return items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[changewindow ? Styles.commitecar : Styles.horiztouch,
          {backgroundColor:theme.colors.card,
            elevation:100,
          shadowColor:'#00000040'}]}
        onPress={() => {          
          onClick(item)
        }} // Use onClick prop to handle navigation
      >
        <Image
          resizeMode="stretch"
          style={changewindow ? Styles.imgcommite : Styles.horizimgcommite}
          source={{ uri: BASE_URL_IMG + item.Image }} // Use URI for images
        />
        <View style={[Styles.addeventstitle, { width: changewindow ? 'auto' : '72%' }]}>
          <CText style={{ fontSize: FONTSIZE[1], fontWeight: '500'}}>{item.Name}</CText>
          <View>
            <View style={Styles.locationWrapper}>
              <Icon name="map-marker-alt" type="FontAwesome5" style={Styles.iconLocation} />
              <CText numberOfLines={1} style={Styles.location}>{item.Location}</CText>
            </View>
            <IconTextContainer text={formatDate(item.Day)} />
          </View>

        </View>
      </TouchableOpacity>
    ));
  };

  const RenderIcon = () => (
    <View style={{ flexDirection: 'row' }}>
      <Image
        resizeMode="stretch"
        style={{
          width: (SCREEN_WIDTH * 5) / 100,
          height: (SCREEN_HEIGHT * 3) / 100,
        }}
        source={colIcon}
      />
      <Image
        resizeMode="stretch"
        style={{
          marginLeft: '4%',
          width: (SCREEN_WIDTH * 5) / 100,
          height: (SCREEN_HEIGHT * 3) / 100,
        }}
        source={rowIcon}
      />
    </View>
  );

  return (
    <View style={{ width: SCREEN_WIDTH }}>
      <View style={Styles.windowiconview}>
        <TouchableOpacity onPress={() => setChangewindow((prev) => !prev)}>
          <RenderIcon />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: changewindow ? 'row' : 'column',
          alignContent: 'center',
          flexWrap: changewindow ? 'wrap' : 'nowrap',
        }}
      >
        {renderItems(DATA)}
      </View>
      {/* <View style={{height:  SCREEN_HEIGHT * 0.068}}></View> */}
    </View>
  );
};

export default PrevListChange;
