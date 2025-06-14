
// import { useNavigation } from '@react-navigation/native';
// import type { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//   Home: undefined;
//   Login: undefined;
//   me:undefined;
// };

// type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// export default function navigation(){

//       const navigation = useNavigation<ProfileScreenNavigationProp>();

//       return navigation
    
// }





import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  me: undefined;
  dsb: undefined;
  storyView: { item: any };
  reels:undefined;
  // ...other routes
};




 

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function useProfileNavigation() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return navigation;
}
