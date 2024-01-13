import { View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { AppNavParams, RecipeDetailPageProps } from '../navigation/AppNavigation'
import { StatusBar } from 'expo-status-bar'
import { CachedImage } from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline'
import { HeartIcon, UsersIcon, Square3Stack3DIcon } from 'react-native-heroicons/solid'
import axios from 'axios'
import Loading from '../components/loading'
import YouTubeIframe from 'react-native-youtube-iframe';
import * as Linking from 'expo-linking'
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated'

const ios = Platform.OS == 'ios';

const ReceipeDetailScreen = ({ navigation, route }: any) => {
  let item = route.params
  const [isFavourite, setIsFavourite] = React.useState(false)
  const [meal, setMeal] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getMealData(item.idMeal)
  }, [])


  const getMealData = async (id: any) => {
    setLoading(true)
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
      if (response && response.data) {
        // console.log(response.data);
        setMeal(response.data.meals[0])
        setLoading(false)
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const ingredientsIndexes = (meal: any) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  }

  const getYoutubeVideoId = (url: any) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  const handleOpenLink = (url: any) => {
    Linking.openURL(url);
  }

  return (
    <ScrollView className='flex-1 bg-white'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style='light' />
      <View className='flex-row justify-center'>
        <CachedImage uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98), height: hp(50), borderRadius: 53,
            borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4
          }} />
      </View>
      {/* back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className='flex-row justify-between items-center w-full absolute pt-14'>
        <TouchableOpacity className='bg-white rounded-full p-2 ml-5'
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={hp(3.5)} color='#fbbf24' strokeWidth={4.5} />
        </TouchableOpacity>
        <TouchableOpacity className='bg-white rounded-full p-2 mr-5'
          onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? 'red' : 'gray'} />
        </TouchableOpacity>
      </Animated.View>

      {loading ? <Loading size='large' className='mt-16' /> : (
        <View className='flex px-4 pt-8 justify-between space-y-4'>
          {/* name and area */}
          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
            <Text style={{ fontSize: hp(3) }} className='font-bold flex-1 text-neutral-700'>
              {meal?.strMeal}
            </Text>
            <Text style={{ fontSize: hp(2) }} className='font-semibold flex-1 text-neutral-500'>
              {meal?.strArea}
            </Text>
          </Animated.View>
          {/* misc */}
          <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='flex-row justify-around'>
            <View className='flex rounded-full bg-amber-300 p-2' >
              <View style={{ width: hp(6.5), height: hp(6.5) }}
                className='bg-white rounded-full flex justify-center items-center'>
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>35</Text>
                <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Mins</Text>
              </View>
            </View>
            <View className='flex rounded-full bg-amber-300 p-2' >
              <View style={{ width: hp(6.5), height: hp(6.5) }}
                className='bg-white rounded-full flex justify-center items-center'>
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>03</Text>
                <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Servings</Text>
              </View>
            </View>
            <View className='flex rounded-full bg-amber-300 p-2' >
              <View style={{ width: hp(6.5), height: hp(6.5) }}
                className='bg-white rounded-full flex justify-center items-center'>
                <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>103</Text>
                <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>Cal</Text>
              </View>
            </View>
            <View className='flex rounded-full bg-amber-300 p-2' >
              <View style={{ width: hp(6.5), height: hp(6.5) }}
                className='bg-white rounded-full flex justify-center items-center'>
                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </View>
              <View className='flex items-center py-2 space-y-1'>
                <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'></Text>
                <Text style={{ fontSize: hp(1.3) }} className='font-bold text-neutral-700'>easy</Text>
              </View>
            </View>
          </Animated.View>
          {/* ingredients */}
          <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
            <Text style={{ fontSize: hp(2.5) }} className='font-bold text-neutral-700 flex-1'>Ingredients</Text>
            <View className='space-y-2 ml-3'>
              {
                ingredientsIndexes(meal).map(i => {
                  return (
                    <View key={i} className="flex-row space-x-4">
                      <View style={{ height: hp(1.5), width: hp(1.5) }}
                        className="bg-amber-300 rounded-full" />
                      <View className="flex-row space-x-2">
                        <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-700">{meal['strMeasure' + i]}</Text>
                        <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600">{meal['strIngredient' + i]}</Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </Animated.View>
          {/* instructions */}
          <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {
                meal?.strInstructions
              }
            </Text>
          </Animated.View>
          {/* recipe video */}

          {
            meal.strYoutube && (
              <Animated.View entering={FadeInDown.delay(600).duration(700).springify().damping(12)} className="space-y-4">
                <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                  Recipe Video
                </Text>
                <View>
                  {/* YoutubeIfram uses webview and it does not work properly on android (until its fixed we'll just show the video on ios) */}
                  {
                    ios ? (
                      <YouTubeIframe
                        webViewProps={{
                          overScrollMode: "never" // a fix for webview on android - which didn't work :(
                        }}
                        videoId={getYoutubeVideoId(meal.strYoutube)}
                        height={hp(30)}
                        webViewStyle={{borderRadius: 15}}
                      />
                    ) : (
                      <TouchableOpacity className="mb-5" onPress={() => handleOpenLink(meal.strYoutube)}>
                        <Text className="text-blue-600" style={{ fontSize: hp(2) }}>{meal.strYoutube}</Text>
                      </TouchableOpacity>

                    )
                  }

                </View>
              </Animated.View>
            )
          }
        </View>
      )}
    </ScrollView>
  )
}

export default ReceipeDetailScreen