import VideoOptionsModal from '#/components/VideoOptionsModal';
import VideoPlayer from '#/components/VideoPlayer';
import {Screens, VideoItem} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {useRecentlyPlayedList, useVideoItemList} from '#/useLocalStorageSWR';
import {shortenTitle} from '#/utils/paragraph';
import {formatDate, formatTime} from '#/utils/time';
import {
  addRecentlyPlayedList,
  handleDeleteVideo,
  handleRename,
  handleToggleFavorite,
} from '#/utils/video';
import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {EmptyData} from '../EmptyData';
import MyVideoItem from '#/components/MyVideoItem';

interface VideoGalleryScreenProps {
  navigation?: any;
}

const VideoGalleryScreen: React.FC<VideoGalleryScreenProps> = ({
  navigation,
}) => {
  const {data: recentlyPlayedList, saveData: saveRecentlyPlayedList} =
    useRecentlyPlayedList();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const {data, saveData} = useVideoItemList();

  const handlePlayVideo = (video: VideoItem) => {
    addRecentlyPlayedList(
      video,
      recentlyPlayedList || [],
      saveRecentlyPlayedList,
    );
    navigation.navigate(Screens.PlayVideoScreen, {id: video.id});
  };

  const handleVideoOptions = (video: VideoItem) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const renderRecentlyPlayedItem = (video: VideoItem) => (
    <TouchableOpacity
      key={video.id}
      style={styles.recentlyPlayedItem}
      onPress={() => handlePlayVideo(video)}>
      <View style={styles.thumbnailContainer}>
        <VideoPlayer
          videoPath={video.uri}
          backgroundVideo={styles.backgroundVideo}
          paused={true}
        />
        <View style={styles.playButtonOverlay}>
          <IconButton icon="play-circle" size={24} iconColor="#FFFFFF" />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}> {formatTime(video.duration)}</Text>
        </View>
      </View>
      <Text style={styles.videoTitle}> {shortenTitle(video.title, 15)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        {(recentlyPlayedList || [])?.length <= 0 &&
          (data || [])?.length <= 0 && (
            <EmptyData text="Haven’t uploaded anything? Click the “+” sign to upload or play a video" />
          )}
        {(recentlyPlayedList || [])?.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <IconButton icon="clock" size={20} iconColor="#FFFFFF" />
              <Text style={styles.sectionTitle}>Recently Played</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentlyPlayedContainer}>
              {(recentlyPlayedList || []).map(renderRecentlyPlayedItem)}
            </ScrollView>
          </View>
        )}

        {(data || [])?.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <IconButton icon="film" size={20} iconColor="#FFFFFF" />
              <Text style={styles.sectionTitle}>My videos</Text>
            </View>
            <View style={styles.myVideosGrid}>
              {(data || []).map((video, index) => (
                <MyVideoItem
                  key={video.id}
                  video={video}
                  index={index}
                  onPlayVideo={handlePlayVideo}
                  onOptionsPress={handleVideoOptions}
                />
              ))}
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
      <VideoOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        video={selectedVideo}
        onPlayVideo={handlePlayVideo}
        onToggleFavorite={video => {
          setModalVisible(false);
          handleToggleFavorite(video, data || [], saveData);
        }}
        onDeleteVideo={video =>
          handleDeleteVideo(
            video,
            data || [],
            saveData,
            recentlyPlayedList || [],
            saveRecentlyPlayedList,
            setModalVisible,
          )
        }
        onRename={(video, name) => {
          handleRename(video.id, name, data || [], saveData);
          setModalVisible(false);
        }}
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
  backgroundVideo: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: 16 / 9,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
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
    fontSize: 24,
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
    fontSize: 16,
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
    color: '#fff',
    fontSize: 12,
  },
  bottomPadding: {
    height: 20,
  },
});

export default VideoGalleryScreen;
