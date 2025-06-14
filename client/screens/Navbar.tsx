import React from 'react';
import { View, TouchableOpacity, Image, Text as RNText } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text } from 'react-native-svg';

const Navbar = () => {
  return (
   <View
  className='w-full flex flex-row justify-between p-2 items-center shadow-black shadow-md bg-white rounded-md mt-7 h-20'

>

      {/* Left: Logo SVG */}
      <View>
        <Svg width={100} height={80} viewBox="0 0 250 60">
          <Defs>
            <LinearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#f09433" />
              <Stop offset="25%" stopColor="#e6683c" />
              <Stop offset="50%" stopColor="#dc2743" />
              <Stop offset="75%" stopColor="#cc2366" />
              <Stop offset="100%" stopColor="#bc1888" />
            </LinearGradient>
          </Defs>
          <Text
            x={10}
            y={45}
            fontSize={40}
            fontFamily="Arial"
            fill="url(#instaGradient)"
          >
            Vinstagram
          </Text>
        </Svg>
      </View>

      {/* Right: Icons */}
      <View className='flex flex-row items-center space-x-4 p-4 gap-4'>
        <TouchableOpacity>
          <Image source={require('../assets/heart.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <View className='relative'>
          <TouchableOpacity>
            <Image source={require('../assets/send.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View className='bg-red-500 rounded-full absolute top-0 right-0 w-5 h-5 items-center justify-center'>
            <RNText style={{ color: 'white', fontSize: 12 }}>0</RNText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
