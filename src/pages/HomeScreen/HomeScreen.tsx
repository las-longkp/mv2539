import VideoOptionsModal from '#/components/VideoOptionsModal';
import {Screens, VideoItem} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {useVideoItemList} from '#/useLocalStorageSWR';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import {IconButton} from 'react-native-paper';

interface VideoGalleryScreenProps {
  navigation?: any;
}

const VideoGalleryScreen: React.FC<VideoGalleryScreenProps> = ({
  navigation,
}) => {
  const recentlyPlayed: VideoItem[] = [
    {
      id: '1',
      title: 'Love Letter',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home-6fTJIvGHXykyj1cSX4jKuCfIn2Oedz.png',
      duration: '03:21',
    },
    {
      id: '2',
      title: 'Rose Youth',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home-6fTJIvGHXykyj1cSX4jKuCfIn2Oedz.png',
      duration: '04:13',
    },
    {
      id: '3',
      title: 'A Rainy Day',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home-6fTJIvGHXykyj1cSX4jKuCfIn2Oedz.png',
      duration: '01:14',
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const translateY = useRef(new Animated.Value(300)).current;
  const handleRenameVideo = (video: VideoItem) => {
    console.log(`Renaming video: ${video.title}`);
  };

  const handleToggleFavorite = (video: VideoItem) => {
    console.log(`Toggle favorite for video: ${video.title}`);
  };

  const handleDeleteVideo = (video: VideoItem) => {
    console.log(`Deleting video: ${video.title}`);
  };

  const {data, saveData} = useVideoItemList();

  const handlePlayVideo = (video: VideoItem) => {
    console.log(`Playing video: ${video.title}`);
    navigation.navigate(Screens.PlayVideoScreen, {id: ''});
  };

  const handleVideoOptions = (video: VideoItem) => {
    setSelectedVideo(video);
    setModalVisible(true);
    console.log(`Options for video: ${video.title}`);
  };

  const renderRecentlyPlayedItem = (video: VideoItem) => (
    <TouchableOpacity
      key={video.id}
      style={styles.recentlyPlayedItem}
      onPress={() => handlePlayVideo(video)}>
      <View style={styles.thumbnailContainer}>
        <Image
          source={{uri: video.thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButtonOverlay}>
          <IconButton icon="play-circle" size={24} iconColor="#FFFFFF" />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      <Text style={styles.videoTitle}>{video.title}</Text>
    </TouchableOpacity>
  );

  const renderMyVideoItem = (video: VideoItem, index: number) => (
    <View
      key={video.id}
      style={[
        styles.myVideoItem,
        index % 2 === 0 ? {marginRight: 8} : {marginLeft: 8},
      ]}>
      <TouchableOpacity onPress={() => handlePlayVideo(video)}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{uri: video.thumbnail}}
            style={styles.myVideoThumbnail}
            resizeMode="cover"
          />
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.myVideoInfo}>
        <View style={styles.myVideoTitleContainer}>
          <View style={{gap: 3}}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoMetadata}>
              {video.date} - {video.size}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => handleVideoOptions(video)}>
            <IconButton icon="dots-vertical" size={20} iconColor="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <IconButton icon="clock" size={20} iconColor="#FFFFFF" />
            <Text style={styles.sectionTitle}>Recently Played</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentlyPlayedContainer}>
            {recentlyPlayed.map(renderRecentlyPlayedItem)}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <IconButton icon="film" size={20} iconColor="#FFFFFF" />
            <Text style={styles.sectionTitle}>My videos</Text>
          </View>
          <View style={styles.myVideosGrid}>
            {(data || []).map((video, index) =>
              renderMyVideoItem(video, index),
            )}
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
      <VideoOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        video={selectedVideo}
        onPlayVideo={handlePlayVideo}
        onToggleFavorite={handleToggleFavorite}
        onDeleteVideo={handleDeleteVideo}
      />
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');
const itemWidth = (width - 50) / 2;

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
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recentlyPlayedContainer: {
    paddingHorizontal: 15,
  },
  recentlyPlayedItem: {
    width: 150,
    marginHorizontal: 5,
  },
  thumbnailContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 150,
    height: 85,
    borderRadius: 10,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  durationContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  myVideosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  myVideoItem: {
    width: itemWidth,
    marginBottom: 20,
  },
  myVideoThumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  myVideoInfo: {},
  myVideoTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsButton: {
    padding: 5,
  },
  videoMetadata: {
    color: '#999999',
    fontSize: 12,
  },
  bottomPadding: {
    height: 20,
  },
});

export default VideoGalleryScreen;
