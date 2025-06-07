import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { useProfileNavigation } from 'components/navigations';

type TabButtonProps = {
  iconName: string;
  tabKey: string;
  activeTab: string;
  onPress: () => void;
};

const TabButton = ({ iconName, tabKey, activeTab, onPress }: TabButtonProps) => (
  <TouchableOpacity
    style={[styles.tabButton, activeTab === tabKey && styles.activeTab]}
    onPress={onPress}
  >
    <Icon
      name={iconName}
      size={24}
      color="#fff"  // always white icon
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
    <TabButton iconName="search-outline" tabKey="search" activeTab={activeTab} onPress={() => setActiveTab('search')} />
    <TabButton iconName="add-circle-outline" tabKey="add" activeTab={activeTab} onPress={() => setActiveTab('add')} />
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
    <InstagramBottomNav activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation} />
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 35,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    backgroundColor: '#ffffff20',
  },
});
