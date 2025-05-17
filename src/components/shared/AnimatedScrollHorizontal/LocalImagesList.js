import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';



const LocalImagesList = ({images}) => {
  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image 
        source={{ uri: `file://${item}` }} 
        style={styles.image} 
        resizeMode="cover" 
      />
    </View>
  );

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  imageContainer: {
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default LocalImagesList;
