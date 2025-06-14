import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { UserData } from 'utils/UserData';

const screenWidth = Dimensions.get('window').width;

const Post = () => {
  return (
    <View className="mt-2">
      {UserData.map((item) => (
        <View key={item.id} className="mb-8">
          {/* Header with profile picture and name */}
          <View className="flex-row items-center px-4 mb-2">
            <Image
              source={item.profile}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <Text className="ml-3 font-semibold text-[16px]">{item.name}</Text>
          </View>

          {/* Post Image */}
          <Image
            source={item.post.image}
            style={{
              width: screenWidth,
              height: 300,
              resizeMode: 'cover',
            }}
          />

          {/* Buttons: Like, Comment, Message */}
          <View className="flex-row gap-6 mt-3 px-4">
            <TouchableOpacity>
              <Image
                source={require('../assets/Like.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../assets/Comment.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../assets/Messanger.png')}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          {/* Likes Count */}
          <Text className="px-4 mt-2 font-semibold">{item.post.like} Likes</Text>

          {/* Caption */}
          <View className="px-4 mt-1 flex-row flex-wrap">
            <Text className="font-semibold mr-1">{item.name}</Text>
            <Text>{item.post.caption}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Post;
