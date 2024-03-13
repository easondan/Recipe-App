import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";

const RecipePage = ({ route }) => {
  
  const { data } = route.params;

  return (
    <View>
      <View style={styles.overview}>
        <Image source={{ uri: data.imageUrl }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.recipeName}>{data.name}</Text>
          <Text style={styles.body}>Author: Brittany</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overview: {
    flexDirection: "row",
    margin: 15,
  },
  details: {
    marginLeft: 15
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 20,
  },
  body: {
    fontSize: 14
  }
});

export default RecipePage;