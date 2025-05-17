import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { ICONSIZE } from '../../../constants/Screen';
import CText from '../../custom/Text';

const DropdownMenu = ({ locations = [], hasRightIcon, hasLeftIcon,
  alignText,
  backgroundColor,
  textColor,
  onItemClick,
  selectedLocationProps = null
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(selectedLocationProps || null);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const selectItem = (item) => {
    setSelectedLocation(item);
    onItemClick(item)
    setExpanded(false);
  };
  useEffect(() => {
    setSelectedLocation(selectedLocationProps);
  }, [selectedLocationProps]);
  return (
    <View style={[styles.container, {
      backgroundColor: backgroundColor,

    }]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        {hasLeftIcon &&
          <View style={{ width: '10%' }}>
            <Icon
              name="map-marker"
              type="FontAwesome"
              style={{ fontSize: ICONSIZE[5], color: textColor }}
            />
          </View>
        }

        <View style={{
          width: alignText === 'center' ? '100%' : '80%',
          padding: '1%',
          alignItems: alignText
        }}>
          <CText numberOfLines={1} style={[styles.selectedText, { color: textColor }]}>
            {selectedLocation || 'Select Location'}
          </CText>
        </View>
        {
          hasRightIcon &&
          <View style={{ width: '10%', alignItems: 'flex-end', justifyContent: 'center' }}>
            <Icon
              name={expanded ? 'down' : 'right'}
              type="AntDesign"
              style={{ fontSize: ICONSIZE[1], color: textColor }}
            />
          </View>
        }


      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdown}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {locations.length > 0 && locations.map((item, index) => (
              <Pressable
                key={index}
                style={[styles.item, { zIndex: 100000 + index }]}
                onPress={() => selectItem(item)}
              >
                <CText numberOfLines={1} style={styles.itemText}>{item}</CText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    zIndex: 500
  },
  header: {
    padding: '2%',
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row'
  },
  selectedText: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: '90%', // تنظیم فاصله از بالای کامپوننت والد
    left: 0,
    right: 0,
    // zIndex: 1000,
    maxHeight: 200, // حداکثر ارتفاع dropdown
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 2, // برای ایجاد سایه
  },
  scrollViewContent: {
    paddingVertical: 0,
  },
  item: {
    padding: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#eee'
  },
  itemText: {
    fontSize: 12,
    color: '#333',
    backgroundColor: '#eee',
  },
});

export default DropdownMenu;
