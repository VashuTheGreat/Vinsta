import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import "../global";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  signUP: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


import {

  Alert,
 
} from 'react-native';

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [ue, setue] = useState('');
  const [pw, setpw] = useState('');
  const [haveError, setHaveError] = useState(false);


  const handleLogin = async () => {
    // ✅ Add validation (dummy check here)

    try{
    const response = await fetch(`http://192.168.153.207:3000/getdata?user_name=${encodeURIComponent(ue)}&password=${encodeURIComponent(pw)}`);
const result = await response.json();
    console.log("response : "+response);
    console.log("Result : "+result);

          console.log(result.success);

    if(result.success===1){
      const userData = {
        usernameOrEmail: ue,
        password: pw,
      };
      await AsyncStorage.setItem('async_data', JSON.stringify(userData));
      console.log('✅ Data saved to AsyncStorage:', userData);
      setHaveError(false);
      navigation.replace('Home');

    }
    else{
           setHaveError(true);
      Alert.alert('Login Failed', 'Invalid username or password');
    }

    }catch (error) {
    console.error('Login error:', error);
    Alert.alert('Error', 'Unable to login. Please try again later.');
  }
     
  };

  return (
    <View className="flex-1 bg-black justify-center items-center px-6">
      <Text className="text-white text-5xl font-bold mb-12 tracking-wider">Vinsta</Text>

      <TextInput
        value={ue}
        onChangeText={setue}
        placeholder="Phone number, username or email"
        placeholderTextColor="#aaa"
        className="bg-[#1c1c1e] text-white w-full px-4 py-3 rounded mb-4"
      />

      <TextInput
        value={pw}
        onChangeText={setpw}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        className="bg-[#1c1c1e] text-white w-full px-4 py-3 rounded mb-6"
      />

      <TouchableOpacity onPress={handleLogin} className="bg-blue-500 w-full py-3 rounded items-center">
        <Text className="text-white text-base font-semibold">Log In</Text>
      </TouchableOpacity>

      {haveError && (
        <Text className="text-red-600 mt-2">Either username or password is incorrect</Text>
      )}

      <View className="flex-row items-center my-6 w-full">
        <View className="flex-1 h-px bg-gray-600" />
        <Text className="text-gray-400 mx-3">OR</Text>
        <View className="flex-1 h-px bg-gray-600" />
      </View>

    <View className='flex gap-1 flex-row'>
      <Text className="text-white">

        Don't have an account?
      </Text>
        <TouchableOpacity onPress={() => navigation.replace('signUP')}>
        
        <Text className="text-white font-semibold">Sign up</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}
