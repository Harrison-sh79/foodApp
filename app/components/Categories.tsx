import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
// import { categoryData } from '../contants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { CachedImage } from '../helpers/image'

const Categories = ({ activeCategory, categories, handleChangeCategory }: any) => {

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className='space-x-4'>
        {
          categories.map((cat:any, index:number) => {
            let isActive = activeCategory === cat.strCategory
            let activeButtonClass = isActive ? ' bg-amber-400' : ' bg-black/10'
            return (
              <TouchableOpacity
                key={index}
                className='flex items-center space-y-0.5'
                onPress={() => handleChangeCategory(cat.strCategory)}
              >
                <View className={'rounded-full p-[6px]' + activeButtonClass}>
                  {/* <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: hp(6), height: hp(6) }}
                    className='rounded-full'
                  /> */}
                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(6), height: hp(6) }}
                    className='rounded-full'
                  />
                </View>
                <Text className='text-neutral-500' style={{ fontSize: hp(1.6) }}>{cat.strCategory}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}

export default Categories