import React, { useEffect } from 'react'
import { View, Text, Image, Dimensions, TextInput } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { useProfileNavigation } from 'components/navigations';

type StoryViewProps = {
  route: RouteProp<Record<string, { item: any }>, string>;
};

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const StoryView: React.FC<StoryViewProps> = ({ route }) => {
  const selectedItem = route.params.item;
  const currentHour = new Date().getHours();
  const storyTime = currentHour - selectedItem.story.time;
const navigation=useProfileNavigation();



  useEffect(()=>{
    setTimeout(()=>{
        navigation.goBack();
    },15000)
  },[])

  return (
    <View className="flex-1 bg-black">
      
      {/* Top bar */}
      <View className="flex-row items-center gap-2 pt-12 px-4 z-10">
        <Image source={selectedItem.profile} className="w-10 h-10 rounded-full mr-2" />
        <Text className="text-white font-semibold text-base">{selectedItem.name}</Text>
        <Text className="text-white text-sm">{storyTime}h</Text>
      </View>

      {/* Story Image */}
      <Image
        source={selectedItem.story.image}
        className="absolute top-0"
        style={{ width: width, height: height-100 }}
      />

      {/* Message Input */}
      <View className="absolute bottom-8 left-4 right-4 flex-row items-center">
        <TextInput
          className="flex-1 border border-white rounded-full px-4 py-2 text-white mr-2"
          placeholder="Message"
          placeholderTextColor="white"
        />
        <Image
          source={require('../assets/Messanger.png')}
          style={{tintColor:'white',width:26,height:26}}
        />
      </View>
    </View>
  );
};

export default StoryView;
