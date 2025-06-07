import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';

import {useProfileNavigation } from 'components/navigations';


type UserData = {
  usernameOrEmail: string;
  password: string;
};

type TabButtonProps = {
  iconName: string;
  tabKey: string;
  activeTab: string;
  onPress: () => void;
};

export default function ProfileScreen() {
  const navigation=useProfileNavigation();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('async_data');
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }} className='bg-black'>
      <View style={{ padding: 20 }} className='text-white'>
        <Text className='text-white'>Welcome: {userData.usernameOrEmail}</Text>
        <Text className='text-white'>Password: {userData.password}</Text>
        <Text className='text-white'>Profile Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 


});
