import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type UserData = {
  usernameOrEmail: string;
  password: string;
};

export default function ProfileScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('async_data');
        console.log("Raw AsyncStorage Data:", data);

        if (data) {
          const parsed: UserData = JSON.parse(data);

          if (parsed?.usernameOrEmail && parsed?.password) {
            setUserData(parsed);
          } else {
            navigation.replace('Login');
          }
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
        navigation.replace('Login');
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };

    fetchData();
  }, []);

  // ✅ Show loading indicator while checking
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // ✅ Show profile only if data was successfully fetched
  if (!userData) return null;

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome: {userData.usernameOrEmail}</Text>
      <Text>Password: {userData.password}</Text>
      <Text>Profile Screen</Text>
    </View>
  );
}
