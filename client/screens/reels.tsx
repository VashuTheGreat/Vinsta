import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfileNavigation } from 'components/navigations';
import { useVideoPlayer, VideoView } from 'expo-video';

const { height } = Dimensions.get('window');

type UserData = {
  usernameOrEmail: string;
  password: string;
};

type ReelItemProps = {
  uri: string;
  isActive: boolean;
  playerRef: React.MutableRefObject<any>;
};

const ReelItem = ({ uri, isActive, playerRef }: ReelItemProps) => {
  const player = useVideoPlayer(uri, p => {
    p.loop = true;
    if (isActive) p.play();
  });

  // Store the player instance in the ref
  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  // Pause/Play based on active status
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive]);

  return (
    <VideoView
      style={styles.video}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
};
export default function ProfileScreen() {
  const navigation = useProfileNavigation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reels, setReels] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const playerRefs = useRef<any[]>([]);

  const fetchReels = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`http://192.168.153.207:3000/reels?page=${page}`);
      const data = await res.json();
      setReels(prev => [...prev, ...data.reels]);
      setPage(prev => prev + 1);
      setHasMore(data.hasMore);
    } catch (err) {
      console.log('Fetch error:', err);
    }
    setLoadingMore(false);
  };

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
        } 
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
        navigation.replace('Login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchReels();
  }, []);

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (!playerRefs.current[index]) {
      playerRefs.current[index] = React.createRef();
    }
    return (
      <ReelItem
        uri={item.media_url}
        isActive={index === currentIndex}
        playerRef={playerRefs.current[index]}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reels}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      pagingEnabled
      onEndReached={fetchReels}
      onEndReachedThreshold={0.5}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
}

const styles = StyleSheet.create({
  video: {
    height: height,
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});









