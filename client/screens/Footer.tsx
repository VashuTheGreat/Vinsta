import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { useProfileNavigation } from 'components/navigations';

type TabButtonProps = {
  iconName: string;
  tabKey: string;
  activeTab: string;
  onPress: () => void;
};

const TabButton = ({ iconName, tabKey, activeTab, onPress }: TabButtonProps) => (
  <TouchableOpacity
    style={styles.tabButton}
    onPress={onPress}
  >
    <Icon
      name={iconName}
      size={24}
      color={activeTab === tabKey ? '#000' : '#666'} // Active = black, else dark gray
    />
  </TouchableOpacity>
);

const InstagramBottomNav = ({
  activeTab,
  setActiveTab,
  navigation,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  navigation: ProfileScreenNavigationProp;
}) => (
  <View style={styles.bottomNav}>
    <TabButton iconName="home-outline" tabKey="home" activeTab={activeTab} onPress={() => {
        setActiveTab('home')
        navigation.navigate('Home');
    }} />
    <TabButton iconName="search-outline" tabKey="search" activeTab={activeTab} onPress={() => {
        setActiveTab('search');
        navigation.navigate('dsb');
    }} />
    <TabButton iconName="add-circle-outline" tabKey="add" activeTab={activeTab} onPress={() => {
        setActiveTab('add');
    }} />

    {/* Reel icon button (image) */}
    <TouchableOpacity
      style={styles.tabButton}
      onPress={() => {setActiveTab('reel')
        navigation.navigate('reels')
      }
        
      }
    >
      <Image
        source={require('../assets/footer/reel.png')}
        style={{
          width: 24,
          height: 24,
          tintColor: activeTab === 'reel' ? '#000' : '#666', // black if active, gray if not
        }}
      />
    </TouchableOpacity>

    <TabButton
      iconName="person-outline"
      tabKey="profile"
      activeTab={activeTab}
      onPress={() => {
        setActiveTab('profile');
        navigation.navigate('me');
      }}
    />
  </View>
);

export default function Footer() {
  const navigation = useProfileNavigation();
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <InstagramBottomNav
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      navigation={navigation}
    />
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom:40,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff', // white background
  },
  tabButton: {
    padding: 10,
  },
});
