import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import CText from '../../custom/Text';
import { useTheme } from '../../../theme/ThemeProvider';
import { BASE_URL_IMG } from '../services';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/Screen';

interface CategoryScrollViewProps {
  categories: any;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  screenWidth: number;
}

const CategoryScrollView: React.FC<CategoryScrollViewProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  screenWidth,
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    // console.log(selectedCategory);

  }, [theme]);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView, { width: screenWidth * 0.94 }]}
        contentContainerStyle={{paddingRight: SCREEN_WIDTH * 0.3}}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onCategorySelect(item.CategoryName)}
            style={[
              styles.categoryItem,
              {
                backgroundColor: item.CategoryName === selectedCategory ? theme.colors.primary : theme.colors.card,
                marginRight: screenWidth * 0.03,
              },
            ]}
          >



            <CText style={{
              paddingLeft: item.CategoryImage?.length > 0 ? '1%' : 0,
              color: item.CategoryName === selectedCategory ? theme.colors.textSelected : theme.colors.text,
              fontSize: 9
            }}>
              {item.CategoryName}
            </CText>
            {
              item.CategoryImage?.length > 0 &&
              (
                <Image
                  style={{ width: SCREEN_WIDTH * 0.035, height: SCREEN_HEIGHT * 0.020 }}
                  source={{ uri: BASE_URL_IMG + item.CategoryImage }} />
              )

            }
          </TouchableOpacity>
        ))}
     
        {/* <View  style={{width:SCREEN_WIDTH / 2}}/> */}
        {/* <View style={{ width: SCREEN_WIDTH  }} /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    // paddingVertical: 0,
    // paddingRight: SCREEN_WIDTH / 2
  },
  scrollView: {
    alignContent: 'center',
    paddingLeft: '3%',
  },
  categoryItem: {
    paddingVertical: '1.5%',
    paddingHorizontal: '1%',
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#00055550',
    marginVertical: '1%',
    flexDirection: 'row-reverse'
  },
});

export default CategoryScrollView;
