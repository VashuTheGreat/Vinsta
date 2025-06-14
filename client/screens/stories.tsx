import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { UserData } from 'utils/UserData';
import { useProfileNavigation } from 'components/navigations';

const Stories = () => {
    const navigation=useProfileNavigation();
  return (
    <View className="p-2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.isArray(UserData) && UserData.map((item, index) => (
        
          <TouchableOpacity key={index} className="items-center mr-4" onPress={()=>navigation.navigate('storyView',{item})}>
            <View
              style={{
                height: 72,
                width: 72,
                borderRadius: 36,
                borderWidth: 2,
                borderColor: '#cc2366',
                padding: 2,
              }}
            >
              <Image
                source={item.story.image} // ✅ STATIC require used in data
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 36,
                }}
              />
            </View>
            <Text className="text-xs mt-1">{item.username}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;
