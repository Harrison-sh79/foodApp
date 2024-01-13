import { View, Text, Pressable, Image, FlatList } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list'
import { mealData } from '../contants'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loading from './loading'
import { CachedImage } from '../helpers/image'
import { useNavigation } from '@react-navigation/native'
import { RecipeDetailPageProps } from '../navigation/AppNavigation'

const Recipes = ({ categories, meals }: any) => {

  const nagivation = useNavigation<RecipeDetailPageProps>()

  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='font-semibold text-gray-600'>Recipes</Text>
      <View>
        {categories.length == 0 || meals.length == 0 ?
          <Loading size='large' className='mt-20' />
          :
          <MasonryList
            data={meals}
            keyExtractor={(item): string => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }: any) => <RecipeCard item={item} index={i} nagivation={nagivation}/>}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
          // onEndReached={() => loadNext(ITEM_CNT)}
          />}

      </View>
    </View>
  )
}

export default Recipes

const RecipeCard = ({ item, index, nagivation }: any) => {
  let isEven = index % 2 === 0
  let isOdd = index % 3 === 0
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}>
      <Pressable
        style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        className='flex justify-center space-y-1 mb-4'
        onPress={()=> nagivation.navigate('RecipeDetail', { ...item })}
        >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', borderRadius: 35, height: isOdd ? hp(25) : hp(35) }}
          className='bg-black/5'
        /> */}
        <CachedImage
          uri={item.strMealThumb}
          style={{ width: '100%', borderRadius: 35, height: isOdd ? hp(25) : hp(35) }}
          className='bg-black/5'
          sharedTransitionTag={item.strMeal}
        />
        <Text style={{ fontSize: hp(1.5) }} className='font-semibold ml-2 text-neutral-600'>
          {item.strMeal.length > 20 ? item.strMeal.substring(0, 20) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}