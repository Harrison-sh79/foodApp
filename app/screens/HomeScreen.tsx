import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import axios from 'axios'
import Recipes from '../components/recipes'

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = React.useState('Beef')
  const [categories, setCategories] = React.useState([])
  const [meals, setMeals] = React.useState([])

  React.useEffect(() => {
    getCategories()
    getRecipts()
  }, [])

  const handleChangeCategory = (category:string) => {
    getRecipts(category)
    setActiveCategory(category)
    setMeals([])
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      if (response && response.data) {
        // console.log(response.data);
        setCategories(response.data.categories)
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const getRecipts = async (category = 'Beef') => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + category)
      if (response && response.data) {
        // console.log(response.data);
        setMeals(response.data.meals)
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='dark' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='space-y-6 pt-14'
      >
        <View className='flex-row mx-4 justify-between  items-center mb-2'>
          <Image source={require('../../assets/images/avatar.png')} style={{ width: hp(5.5), height: hp(5) }} />
          <BellIcon size={hp(4)} color='gray' />
        </View>
        {/* greeting and punchline */}
        <View className='mx-4 mb-2 space-y-2'>
          <Text className='text-neutral-600' style={{ fontSize: hp(1.6) }}>Hello, Harrison</Text>
          <Text className='text-neutral-600 font-bold' style={{ fontSize: hp(3.6) }}>
            Make your own Food, </Text>
          <Text className='text-neutral-600 font-bold' style={{ fontSize: hp(3.6) }}>
            stay at  <Text className='text-amber-400'>home</Text></Text>
        </View>
        {/* search bar */}
        <View className='mx-4 flex-row items-center bg-black/5 rounded-full p-[6px]'>
          <TextInput placeholder='Search any recipt'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.6) }}
            className='flex-1 text-base mb-1 pl-3 tracking-wider'
          />
          <View className='bg-white rounded-full p-3'>
            <MagnifyingGlassIcon size={hp(2.5)} color='gray' strokeWidth={2} />
          </View>
        </View>
        {/* categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>
        <View>
          <Recipes meals={meals}  categories={categories} />
        </View>
      </ScrollView>

    </View>
  )
}

export default HomeScreen