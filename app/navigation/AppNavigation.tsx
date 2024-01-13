import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import RecipeDetailScreen from '../screens/RecipeDetailScreen'

export type AppNavParams = {
  Home: undefined,
  Welcome: undefined,
  RecipeDetail: undefined
}

const AppStack = createNativeStackNavigator<AppNavParams>()

export type HomePageProps = NativeStackNavigationProp<AppNavParams, 'Home'>
export type WelcomePageProps = NativeStackNavigationProp<AppNavParams, 'Welcome'>
export type RecipeDetailPageProps = NativeStackNavigationProp<AppNavParams, 'RecipeDetail'>

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <AppStack.Screen name='Home' component={HomeScreen} />
        <AppStack.Screen name='Welcome' component={WelcomeScreen} />
        <AppStack.Screen name='RecipeDetail' component={RecipeDetailScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation