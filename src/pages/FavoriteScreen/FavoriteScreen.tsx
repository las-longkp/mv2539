import RenameModal from '#/components/RenameModal';
import VideoPlayer from '#/components/VideoPlayer';
import {VideoItem} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {useVideoItemList} from '#/useLocalStorageSWR';
import {shortenTitle} from '#/utils/paragraph';
import {formatDate, formatTime} from '#/utils/time';
import {
  handleDeleteVideo,
  handleRename,
  handleToggleFavorite,
} from '#/utils/video';
import React, {useState} from 'react';
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
import {EmptyData} from '../EmptyData';

interface FavoritesScreenProps {
  navigation?: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({navigation}) => {
  const {data, saveData} = useVideoItemList();
  const favoriteVideos = (data || []).filter(item => item.isFavorite);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const handleShareVideo = (video: VideoItem) => {
    console.log(`Share video: ${video.title}`);
  };

  const renderVideoItem = (video: VideoItem) => (
    <View key={video.id} style={styles.videoItem}>
      <TouchableOpacity style={styles.thumbnailContainer}>
        <VideoPlayer
          videoPath={video.uri}
          backgroundVideo={styles.backgroundVideo}
          paused={true}
        />
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}> {formatTime(video.duration)}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.videoInfo}>
        <View style={styles.videoDetails}>
          <Text style={styles.videoTitle}>{shortenTitle(video.title, 20)}</Text>
          <Text style={styles.videoMetadata}>
            {formatDate(new Date(video.date))}
          </Text>
          <Text style={styles.videoMetadata}>{video.size}</Text>
          <View style={styles.actionButtons}>
            <IconButton
              icon="pencil-outline"
              iconColor="#FFFFFF"
              size={24}
              onPress={() => setRenameModalVisible(true)}
            />
            <IconButton
              icon="heart"
              iconColor="#FFFFFF"
              size={24}
              onPress={() => handleToggleFavorite(video, data || [], saveData)}
            />
            <IconButton
              icon="share-outline"
              iconColor="#FFFFFF"
              size={24}
              onPress={() => handleShareVideo(video)}
            />
            <IconButton
              icon="trash-can-outline"
              iconColor="#FFFFFF"
              size={24}
              onPress={() =>
                handleDeleteVideo(video, data || [], saveData, () => {})
              }
            />
          </View>
        </View>
      </View>
      <RenameModal
        visible={renameModalVisible}
        onClose={() => setRenameModalVisible(false)}
        onRename={newName =>
          handleRename(video.id, newName, data || [], saveData)
        }
        initialName={video.title}
      />
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
        {favoriteVideos.length > 0 ? (
          favoriteVideos.map(renderVideoItem)
        ) : (
          <EmptyData text="Haven't uploaded anything? Click the “+” sign to upload or play a video" />
        )}
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
    maxHeight: 150,
  },
  thumbnail: {
    width: 120,
    height: 120,
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
  backgroundVideo: {
    aspectRatio: 20 / 16,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    width: 130,
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
    marginVertical: 2,
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
