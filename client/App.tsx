import React ,{useState}from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer,getFocusedRouteNameFromRoute,NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/Home';
import LoginScreen from './screens/login';
import SignUpScreen from './screens/signUp';
import MeScreen from "./screens/me";
import Footer from './screens/Footer';
import { View, StyleSheet } from 'react-native';
import dashboard from 'screens/dashboard';
import StoryView from 'screens/storyView';
import ReelView from 'screens/reels'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {


   const [currentRoute, setCurrentRoute] = useState('Home');

  const handleStateChange = (state: NavigationState | undefined) => {
    if (!state) return;

    // Get current active route name from state
    const routeName = getFocusedRouteNameFromRoute(state.routes[state.index]) || 'Home';
    setCurrentRoute(routeName);
  };

  // Screens where footer should be hidden
  const hideFooterScreens = ['Login', 'signUP'];
  return (
    <View style={styles.container}>
      <NavigationContainer onStateChange={handleStateChange}>
        <>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="signUP" component={SignUpScreen} />
            <Stack.Screen name="me" component={MeScreen} />
            <Stack.Screen name="dsb" component={dashboard} />
<Stack.Screen name="storyView" component={StoryView} />
<Stack.Screen name="reels" component={ReelView} />
          </Stack.Navigator>
          {!hideFooterScreens.includes(currentRoute) && <Footer />}
        </>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
});
