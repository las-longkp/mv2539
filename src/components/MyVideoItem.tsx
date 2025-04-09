import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import VideoPlayer from '#/components/VideoPlayer';
import {VideoItem} from '#/navigator/type';
import {formatDate, formatFileSize, formatTime} from '#/utils/time';
import {shortenTitle} from '#/utils/paragraph';

interface MyVideoItemProps {
  video: VideoItem;
  index: number;
  onPlayVideo: (video: VideoItem) => void;
  onOptionsPress: (video: VideoItem) => void;
}

const MyVideoItem: React.FC<MyVideoItemProps> = ({
  video,
  index,
  onPlayVideo,
  onOptionsPress,
}) => {
  const {width} = useWindowDimensions();
  const isTablet = width > 768;
  return (
    <View
      style={[
        styles.container,
        index % 2 === 0 ? {marginRight: 8} : {marginLeft: 8},
      ]}>
      <TouchableOpacity onPress={() => onPlayVideo(video)}>
        <View style={styles.thumbnailContainer}>
          <VideoPlayer
            videoPath={video.uri}
            backgroundVideo={styles.backgroundVideo}
            paused={true}
          />
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>
              {formatTime(video.duration)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View>
        <View style={styles.titleContainer}>
          <View style={{gap: 3}}>
            <Text style={styles.videoTitle}>
              {shortenTitle(video.title, isTablet ? 40 : 20)}
            </Text>
            <Text style={styles.videoMetadata}>
              {formatDate(new Date(video.date))} - {formatFileSize(video.size)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => onOptionsPress(video)}>
            <IconButton icon="dots-vertical" size={20} iconColor="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width - 50) / 2,
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundVideo: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: 'hidden',
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  optionsButton: {
    padding: 5,
  },
});

export default MyVideoItem;
