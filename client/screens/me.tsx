import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { VideoView,useVideoPlayer } from 'expo-video';
import { useEvent } from 'expo';


const CLOUD_NAME = 'dg8roe123'; // ✅ Replace with your cloud name
const UPLOAD_PRESET = 'unsigned_preset'; // ✅ Replace with your preset

const { height,width  } = Dimensions.get('window');





 const VideoItem = ({ src }: { src: string }) => {
  const player = useVideoPlayer(src, (player) => {
    player.loop = true;
    player.play(); // Start playing when full screen
  });

  return (
    <VideoView
      style={{ width: width, height: height }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
};



const countries = [
  { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
  { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
]

const InstagramProfileHeader = () => {
    const [name,setname]=useState("a");
    const [posts,setposts]=useState(0);
    const [followers,setfollowers]=useState(0);
    const [following,setfollowings]=useState(0);
      const [imageUri, setImageUri] = useState<string | null>(null);

  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [upload,setUpload]=useState(false);
  const [view,setView]=useState(false);


  // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });



  const [userReels, setUserReels] = useState<any[]>([]);


  


  const handleView=()=>{
    if(view===true) setView(false);
    else setView(true);
    console.log('view: ',view);
  }
       



      const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await AsyncStorage.setItem('profile_image', result.assets[0].uri);
    }
  };





  
  // try {
  //   const response = await fetch('http://192.168.153.207:3000/local_video_uri', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ uri: videoUri }),
  //   });

  //   const data = await response.json();
  //   console.log('Server Response:', data);
  //   alert('Upload request sent successfully!');
  // } catch (error) {
  //   console.error('Error sending video path:', error);
  //   alert('Failed to send video path to server');
  // }

const handlePickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pickedUri = result.assets[0].uri;
        console.log('📼 Selected Video URI:', pickedUri);
        setVideoUri(pickedUri);

        // Upload to Cloudinary
        const formData = new FormData();
        formData.append('file', {
          uri: pickedUri,
          type: 'video/mp4',
          name: 'upload.mp4',
        } as any);
        formData.append('upload_preset', UPLOAD_PRESET);

        console.log("📤 Uploading to Cloudinary...");

        setUpload(true);

        const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
          method: 'POST',
          body: formData,
        });
        setUpload(false);

        const cloudinaryData = await cloudinaryRes.json();
        console.log("✅ Cloudinary response:", cloudinaryData);

        if (cloudinaryData.secure_url) {
          Alert.alert('✅ Uploaded!', cloudinaryData.secure_url);

          // Send to your server
          const serverRes = await fetch('http://192.168.153.207:3000/local_video_uri', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uri: cloudinaryData.secure_url }),
          });

          const serverData = await serverRes.json();
          console.log("📡 Server response:", serverData);
        } else {
          Alert.alert("❌ Upload failed", JSON.stringify(cloudinaryData));
        }
      }
    } catch (err) {
      console.error("❌ Error:", err);
      Alert.alert("Error", err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

const fetchUserReels = async (userId: number) => {
  const res = await fetch(`http://192.168.153.207:3000/me?id=${userId}`);
  const data = await res.json();
  console.log(data.reels); // All videos for user with ID = userId
setUserReels(data.reels.map((item: any) => item.media_url));
};





// fetchUserReels(1);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('async_data');
        if (data) {
         console.log("data :",data);
         setname(JSON.parse(data).usernameOrEmail);
        }
      } catch (error) {
        console.error('Error reading from AsyncStorage:', error);
      }
    };

    fetchData();


    
  }, [name]);

   useEffect(() => {
    // Load saved image from AsyncStorage on mount
    const loadImage = async () => {
      const savedImageUri = await AsyncStorage.getItem('profile_image');
      if (savedImageUri) setImageUri(savedImageUri);
    };
    loadImage();
  }, []);

  return (
   <SafeAreaView className="flex-1 bg-white mt-4">
      <ScrollView className="flex-1 mt-2">
        {/* Header Section */}
        <View className="px-4 pt-4">
          {/* Profile Info Row */}
          <View className="flex-row items-center justify-between mb-4">
            {/* Profile Photo */}
            <View className="relative">
              <View className="w-20 h-20 rounded-full border-2 border-gray-800 items-center justify-center bg-gray-200">
                <Image
                  source={{
                    uri: imageUri
                      ? imageUri
                      : 'https://instagram.fsrg9-1.fna.fbcdn.net/v/t51.2885-19/464760996_1254146839119862_3605321457742435801_n.png?...',
                  }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-200 rounded-full items-center justify-center"
                  onPress={pickImage}
                >
                  <Ionicons name="camera" size={12} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Username and Options */}
            <View className="flex-1 ml-4 ">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-semibold text-black">
                  {name}
                </Text>
                <TouchableOpacity className="p-2">
                  <MaterialIcons name="more-horiz" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-around mb-4 px-4">
            <View className="items-center">
              <Text className="text-lg font-semibold text-black">{posts}</Text>
              <Text className="text-sm text-gray-600">posts</Text>
            </View>
            <TouchableOpacity className="items-center">
              <Text className="text-lg font-semibold text-black">{followers}</Text>
              <Text className="text-sm text-gray-600">followers</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center">
              <Text className="text-lg font-semibold text-black">{following}</Text>
              <Text className="text-sm text-gray-600">following</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View className="flex-row mb-4 space-x-2">
            <TouchableOpacity className="flex-1 bg-gray-200 py-2 px-4 rounded-lg items-center mr-2">
              <Text className="text-black font-medium">Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-200 py-2 px-4 rounded-lg items-center">
              <Text className="text-black font-medium">View archive</Text>
            </TouchableOpacity>
          </View>

          {/* Story Highlights Section */}
          <View className="mb-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {/* New Story Highlight */}
                <View className="items-center mr-4">
                  <TouchableOpacity
                    className="w-14 h-14 rounded-full border-2 border-gray-600 items-center justify-center bg-white"
                    onPress={handlePickVideo}
                  >
                    <Ionicons name="add" size={24} color="black" />
                  </TouchableOpacity>
                  <Text className="text-xs text-gray-600 mt-1">New</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Posts Grid Placeholder */}
          <View className="border-t border-gray-300 pt-4">
            <View className="flex-row justify-center">
              <TouchableOpacity className="items-center">
                <MaterialIcons name="grid-on" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Post / Reels Section */}
      <View>
        {view === false ? (
          <FlatList
            data={countries}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            style={{ height: 400 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setView(true)} style={{ flex: 1, margin: 8 }}>
                <Image
                  source={{
                    uri:
                      'https://imgs.search.brave.com/HWrggDgnmyba4GrFiS765rROwhiKnMqAIskDPTBP5Gg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTIw/MjYwMzY3L3Bob3Rv/L21hbi1ob2xkaW5n/LW1vYmlsZS1zbWFy/dC1waG9uZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Um85/U016Qm1EV0JlcVdO/NERsajN4amJhQjRI/bzNXd3daM3RycGd2/ajZYcz0',
                  }}
                  style={{ width: '100%', height: 180, borderRadius: 8 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            key={'video'}
            data={countries}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <VideoItem src={item.src} />}
            pagingEnabled
          />
        )}
      </View>
    </SafeAreaView>
  );};

export default InstagramProfileHeader;

