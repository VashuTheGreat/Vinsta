import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';



const InstagramProfileHeader = () => {
    const [name,setname]=useState("a");
    const [posts,setposts]=useState(0);
    const [followers,setfollowers]=useState(0);
    const [following,setfollowings]=useState(0);
      const [imageUri, setImageUri] = useState<string | null>(null);
      



      const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await AsyncStorage.setItem('profile_image', result.assets[0].uri);
    }
  };


    useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('async_data');
        if (data) {
         console.log("data :",data);
         setname(JSON.parse(data).usernameOrEmail);
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      }
    };

    fetchData();


    
  }, [name]);

   useEffect(() => {
    // Load saved image from AsyncStorage on mount
    const loadImage = async () => {
      const savedImageUri = await AsyncStorage.getItem('profile_image');
      if (savedImageUri) setImageUri(savedImageUri);
    };
    loadImage();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        {/* Header Section */}
        <View className="px-4 pt-4">
          {/* Profile Info Row */}
          <View className="flex-row items-center justify-between mb-4">
            {/* Profile Photo */}
            <View className="relative">
              <View className="w-20 h-20 rounded-full border-2 border-gray-200 items-center justify-center bg-gray-500">
                <Image
source={{
  uri: imageUri
    ? imageUri
    : 'https://instagram.fsrg9-1.fna.fbcdn.net/v/t51.2885-19/464760996_1254146839119862_3605321457742435801_n.png?stp=dst-jpg_e0_s150x150_tt6&cb=8577c754-c2464923&_nc_ad=z-m&_nc_ht=instagram.fsrg9-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2QGdxZl4P6lb3kxM28W39yiH-rA81bYpCkzd-EkRUZV8wiC9DlA7FyMDydr-LDnkpvY&_nc_ohc=jIDHd3d_O3YQ7kNvwHDvDrX&_nc_gid=N6_NpCFc5XBH4mijbe4b5w&edm=ALlQn9MBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.3-ccb7-5-cb8577c754-c2464923&oh=00_AfMstY2BNqSR5Z8YE5dl7CsRQSoEd_bvlyVMJ9SM6yZjLQ&oe=6849D368&_nc_sid=e7f676'
}}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
                {/* Camera Icon Overlay */}
                <TouchableOpacity className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full items-center justify-center" onPress={pickImage}>
                  <Ionicons name="camera" size={12} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Username and Options */}
            <View className="flex-1 ml-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-semibold text-white">
                  {name}
                </Text>
                <TouchableOpacity className="p-2">
                  <MaterialIcons name="more-horiz" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-around mb-4 px-4">
            <View className="items-center">
              <Text className="text-lg font-semibold text-white">{posts}</Text>
              <Text className="text-sm text-gray-400">posts</Text>
            </View>
            <TouchableOpacity className="items-center">
              <Text className="text-lg font-semibold text-white">{followers}</Text>
              <Text className="text-sm text-gray-400">followers</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <Text className="text-lg font-semibold text-white">{following}</Text>
              <Text className="text-sm text-gray-400">following</Text>
            </TouchableOpacity>
          </View>

          {/* Display Name */}
          {/* <View className="mb-4">
            <Text className="text-base font-semibold text-white">
              Vansh Sharma
            </Text>
          </View> */}

          {/* Action Buttons */}
          <View className="flex-row mb-4 space-x-2">
            <TouchableOpacity className="flex-1 bg-gray-500 py-2 px-4 rounded-lg items-center mr-2">
              <Text className="text-white font-medium">Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-500 py-2 px-4 rounded-lg items-center">
              <Text className="text-white font-medium">View archive</Text>
            </TouchableOpacity>
          </View>

          {/* Story Highlights Section */}
          <View className="mb-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {/* New Story Highlight */}
                <View className="items-center mr-4">
                  <TouchableOpacity className="w-14 h-14 rounded-full border-2 border-gray-300 items-center justify-center bg-gray-50">
                    <Ionicons name="add" size={24} color="gray" />
                  </TouchableOpacity>
                  <Text className="text-xs text-gray-400 mt-1">New</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Posts Grid Placeholder */}
          <View className="border-t border-gray-200 pt-4">
            <View className="flex-row justify-center">
              <TouchableOpacity className="items-center">
                <MaterialIcons name="grid-on" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstagramProfileHeader;

