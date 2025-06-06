import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    
    username: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

interface SignUpFormData {
    emailOrPhone: string;
    password: string;
    
    username: string;
}

type SignUpField = keyof SignUpFormData;

const handleInputChange = (field: SignUpField, value: string) => {
    const updatedData: SignUpFormData = { ...formData, [field]: value };
    setFormData(updatedData);

    const isValid =
        updatedData.emailOrPhone.trim() !== '' &&
        updatedData.password.trim() !== '' &&
        updatedData.username.trim() !== '';
    setIsFormValid(isValid);
};

const handleSignUp = async () => {
  if (isFormValid) {
    try {
      const response = await fetch('http://192.168.153.207:3000', {  // Replace with your PC IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.username,
          email: formData.emailOrPhone,
          password: formData.password,
          
        }),
      });

      const result = await response.json();
      console.log('Response from server:', result);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      console.error('Error during sign up:', error);
      Alert.alert('Error', 'Sign up failed. Check server/network.');
    }
  }
};


  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login would be implemented here');
  };

  const handleLogin = () => {
    Alert.alert('Login', 'Navigate to login screen');
    // Navigate to login screen
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-8"
        >
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View className="items-center mb-8">
              <Text className="text-4xl font-extrabold text-white">
                Vinsta
              </Text>
            </View>

            {/* Main Content */}
            <View className="w-full">
              {/* Header Text */}
              <Text className="text-base text-gray-300 text-center font-semibold mb-8 leading-6">
                Sign up to see photos and videos from your friends.
              </Text>

              {/* Facebook Login Button */}
              <TouchableOpacity
                className="bg-blue-700 py-3 px-6 rounded-md items-center mb-6"
                onPress={handleFacebookLogin}
                activeOpacity={0.8}
              >
                <Text className="text-white text-sm font-semibold">
                  Log in with Facebook
                </Text>
              </TouchableOpacity>

              {/* OR Divider */}
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-[1px] bg-gray-600" />
                <Text className="text-gray-400 text-xs font-semibold mx-4">
                  OR
                </Text>
                <View className="flex-1 h-[1px] bg-gray-600" />
              </View>

              {/* Input Fields */}
              <View className="mb-4">
                <TextInput
                  className="border border-gray-700 rounded-md px-4 py-3 text-sm bg-gray-900 text-white"
                  placeholder="Mobile Number or Email"
                  placeholderTextColor="#888888"
                  value={formData.emailOrPhone}
                  onChangeText={(value) => handleInputChange('emailOrPhone', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View className="mb-4">
                <TextInput
                  className="border border-gray-700 rounded-md px-4 py-3 text-sm bg-gray-900 text-white"
                  placeholder="Password"
                  placeholderTextColor="#888888"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>


              <View className="mb-4">
                <TextInput
                  className="border border-gray-700 rounded-md px-4 py-3 text-sm bg-gray-900 text-white"
                  placeholder="Username"
                  placeholderTextColor="#888888"
                  value={formData.username}
                  onChangeText={(value) => handleInputChange('username', value)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={30}
                />
              </View>

              {/* Terms Text */}
              <Text className="text-xs text-gray-500 text-center leading-5 mt-6 mb-6">
                People who use our service may have uploaded your contact information to Vinsta.{' '}
                <Text className="text-blue-400 font-semibold">Learn More</Text>
                {'\n\n'}
                By signing up, you agree to our{' '}
                <Text className="text-blue-400 font-semibold">Terms</Text>,{' '}
                <Text className="text-blue-400 font-semibold">Privacy Policy</Text> and{' '}
                <Text className="text-blue-400 font-semibold">Cookies Policy</Text>.
              </Text>

              {/* Sign Up Button */}
              <TouchableOpacity
                className={`py-3 px-6 rounded-md items-center mb-6 ${
                  isFormValid ? 'bg-blue-500' : 'bg-blue-500 opacity-40'
                }`}
                onPress={handleSignUp}
                disabled={!isFormValid}
                activeOpacity={isFormValid ? 0.8 : 1}
              >
                <Text className="text-white text-sm font-semibold">
                  Sign up
                </Text>
              </TouchableOpacity>
                  <View className="border-t border-gray-700 py-4 items-center bg-black">
          <Text className="text-sm text-gray-400">
            Have an account?{' '}
            <Text
              className="text-blue-400 font-semibold"
              onPress={handleLogin}
            >
              Log in
            </Text>
          </Text>
        </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Login Link */}
    
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
