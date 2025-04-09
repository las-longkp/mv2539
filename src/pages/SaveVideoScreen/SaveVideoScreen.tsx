import MyVideoItem from '#/components/MyVideoItem';
import VideoOptionsModal from '#/components/VideoOptionsModal';
import {Screens, VideoItem} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {useRecentlyPlayedList, useVideoItemList} from '#/useLocalStorageSWR';
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
  View,
} from 'react-native';
import {EmptyData} from '../EmptyData';

interface SaveVideoScreenProps {
  navigation?: any;
}

const SaveVideoScreen: React.FC<SaveVideoScreenProps> = ({navigation}) => {
  const {data, saveData} = useVideoItemList();

  const {data: recentlyPlayedList, saveData: saveRecentlyPlayedList} =
    useRecentlyPlayedList();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Save Video</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {(data || [])?.length > 0 ? (
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
        ) : (
          <EmptyData text="No data here" />
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
  myVideosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    paddingHorizontal: 16,
  },
  scrollContent: {},
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },

  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  circleIcon: {
    margin: 0,
    padding: 0,
  },
  videoSize: {
    color: '#999999',
    fontSize: 12,
    marginLeft: -5,
  },
  bottomPadding: {
    height: 100,
  },
});

export default SaveVideoScreen;
