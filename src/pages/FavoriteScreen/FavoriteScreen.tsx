import {colors} from '#/themes/colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  size: string;
  isFavorite: boolean;
}

interface FavoritesScreenProps {
  navigation?: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation}) => {
  const favoriteVideos: VideoItem[] = [
    {
      id: '1',
      title: 'Love Letter',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Favourite-PwxB1LRfTEmvMbRFTgY7j1ctvXcutr.png', // Replace with actual thumbnail URL
      duration: '03:21',
      date: '26/03/2025',
      size: '126MB',
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Rose Youth',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Favourite-PwxB1LRfTEmvMbRFTgY7j1ctvXcutr.png', // Replace with actual thumbnail URL
      duration: '04:13',
      date: '26/03/2025',
      size: '213MB',
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Curious kid',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Favourite-PwxB1LRfTEmvMbRFTgY7j1ctvXcutr.png', // Replace with actual thumbnail URL
      duration: '02:47',
      date: '22/03/2025',
      size: '103MB',
      isFavorite: true,
    },
    {
      id: '4',
      title: 'The scared cat',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Favourite-PwxB1LRfTEmvMbRFTgY7j1ctvXcutr.png', // Replace with actual thumbnail URL
      duration: '00:58',
      date: '22/03/2025',
      size: '36MB',
      isFavorite: true,
    },
    {
      id: '5',
      title: 'Go home',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Favourite-PwxB1LRfTEmvMbRFTgY7j1ctvXcutr.png', // Replace with actual thumbnail URL
      duration: '05:12',
      date: '18/03/2025',
      size: '212MB',
      isFavorite: true,
    },
    {
      id: '6',
      title: 'Summer Memories + PV',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Favourite-PwxB1LRfTEmvMbRFTgY7j1ctvXcutr.png', // Replace with actual thumbnail URL
      duration: '07:35',
      date: '03/03/2025',
      size: '314MB',
      isFavorite: true,
    },
  ];

  const handleEditVideo = (video: VideoItem) => {
    console.log(`Edit video: ${video.title}`);
  };

  const handleToggleFavorite = (video: VideoItem) => {
    console.log(`Toggle favorite for video: ${video.title}`);
  };

  const handleShareVideo = (video: VideoItem) => {
    console.log(`Share video: ${video.title}`);
  };

  const handleDeleteVideo = (video: VideoItem) => {
    console.log(`Delete video: ${video.title}`);
  };

  const renderVideoItem = (video: VideoItem) => (
    <View key={video.id} style={styles.videoItem}>
      <TouchableOpacity style={styles.thumbnailContainer}>
        <Image
          source={{uri: video.thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.videoInfo}>
        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoMetadata}>{video.date}</Text>
          <Text style={styles.videoMetadata}>{video.size}</Text>
          <View style={styles.actionButtons}>
            <IconButton
              icon="pencil"
              iconColor="#FFFFFF"
              size={16}
              onPress={() => handleEditVideo(video)}
            />
            <IconButton
              icon="heart"
              iconColor="#FFFFFF"
              size={16}
              onPress={() => handleToggleFavorite(video)}
            />
            <IconButton
              icon="share"
              iconColor="#FFFFFF"
              size={16}
              onPress={() => handleShareVideo(video)}
            />
            <IconButton
              icon="delete"
              iconColor="#FFFFFF"
              size={16}
              onPress={() => handleDeleteVideo(video)}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {favoriteVideos.map(renderVideoItem)}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.Accent,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  videoItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  durationContainer: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoDetails: {
    justifyContent: 'center',
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  videoMetadata: {
    color: '#fff',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});

export default FavoritesScreen;
