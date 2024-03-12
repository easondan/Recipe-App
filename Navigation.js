import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import RecipeHome from "./pages/RecipeHome";
import RecipePage from "./pages/RecipePage";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import CookbookHome from "./pages/CookbookHome";
import GroceryList from "./pages/GroceryList";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Toolbar from "./components/Toolbar";
import RecipeToolbar from "./components/RecipeToolbar";
import AddRecipe from "./pages/AddRecipe";
import CustomDrawer from "./components/CustomDrawer";
import SearchComponent from "./components/SearchComponent";
import Search from "./pages/SearchPage";
export default function Navigation() {
  
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    // TODO want to review this, why are the functions defined with the use effect?
    // Should be dependent on "session" state no?
    const fetchSession = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      error
      ? console.error("Error fetching session:", error.message)
      : setSession(session);
    };
    fetchSession();
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    
  }, []);

  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();

  const RecipeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="RecipeHome"
          component={RecipeHome}
          options={{ header: () => <Toolbar title={"My Recipes"}/> }} 
        />
        <Stack.Screen 
          name="RecipePage" 
          component={RecipePage}
          options={({ route }) => ({ header: () => <RecipeToolbar route={route} /> })}
        />
        <Stack.Screen 
          name="AddRecipePage" 
          component={AddRecipe}
          options={{ header: () => <RecipeToolbar addRecipe = {true} /> }}
        />
      </Stack.Navigator>
    );
  };


  const SearchStack = () =>{
    <Stack.Navigator>
        <Stack.Screen 
              name="SearchScreen"
              component={Search}
              options={({ route }) => ({ header: () => <SearchComponent route={route} /> })}
        />
          <Stack.Screen 
              name="SearchFilter"
              component={Search}
              options={({ route }) => ({ header: () => <SearchComponent route={route} /> })}
        />

    </Stack.Navigator>
  }

  return (
    <View style={styles.root}>
      {session && session.user ? (
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="RecipeHome"
            drawerContent={({navigation}) => <CustomDrawer navigation={navigation} />}
          >
            <Drawer.Screen
              name="RecipeStack"
              component={RecipeStack}
              options={{ headerShown: false }}  // Disable duplicate header, already in Stack
            />
            <Drawer.Screen
              name="FavouriteRecipes"
              component={FavouriteRecipes}
              options={{ header: () => <Toolbar title={"Favourites"} moreOptions={true}/> }}
            />
            <Drawer.Screen
              name="CookbookHome"
              component={CookbookHome}
              options={{ header: () => <Toolbar title={"Cookbooks"} /> }}
            />
            <Drawer.Screen
              name="GroceryList"
              component={GroceryList}
              options={{ header: () => <Toolbar title={"Grocery List"} /> }}
            />
            <Drawer.Screen
              name="Account"
              component={Account}
              options={{ header: () => <Toolbar title={"Account"} showSearch={false} /> }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{ header: () => <Toolbar title={"Settings"} showSearch={false} /> }}
            />
            <Drawer.Screen
              name="Search"
              component={SearchStack}
              options={({ route }) => ({ header: () => <SearchComponent route={route} /> })}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'#fff',
  }
});
