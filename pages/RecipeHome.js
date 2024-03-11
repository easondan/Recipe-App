import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import ActionButton from "../components/ActionButton";
import { RecipeCard } from "../components/RecipeCard";
import { recipes } from "../recipes.json";
import { useNavigation } from '@react-navigation/native';

const RecipeHome = () => {
  const navigation = useNavigation();
  const addRecipe = ()=>{
    navigation.navigate("AddRecipePage")
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {
          recipes.map((recipe, i) => (
            <View key={i} style={styles.gridItem}>
              <RecipeCard recipeData={recipe} />
            </View>
          ))
        }
      </ScrollView>
      <ActionButton onPress={addRecipe}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    margin: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridItem: {
    marginBottom: 15
  }
});

export default RecipeHome;
