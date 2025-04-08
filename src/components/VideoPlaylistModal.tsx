import {VideoItem} from '#/navigator/type';
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import MyVideoItem from './MyVideoItem';

interface VideoPlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  currentVideo: VideoItem | null;
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onVideoOptions: (video: VideoItem) => void;
}

const VideoPlaylistModal: React.FC<VideoPlaylistModalProps> = ({
  visible,
  onClose,
  currentVideo,
  videos,
  onSelectVideo,
  onVideoOptions,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const handleBack = () => {
    onClose();
  };

  const handleVideoOptions = (video: VideoItem) => {
    onVideoOptions(video);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      />
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.7)"
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconButton
            icon="arrow-left"
            iconColor="#FFFFFF"
            size={24}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>
            {currentVideo?.title || 'Playlist'}
          </Text>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <IconButton
            icon="filmstrip"
            iconColor="#FFFFFF"
            size={24}
            style={styles.headerIcon}
          />
          <IconButton
            icon="dots-vertical"
            iconColor="#FFFFFF"
            size={24}
            onPress={() => currentVideo && handleVideoOptions(currentVideo)}
            style={styles.headerIcon}
          />
        </View>
      </View>

      <Animated.View
        style={[styles.playlistContainer, {transform: [{translateY}]}]}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        <View style={styles.myVideosGrid}>
          {(videos || []).map((video, index) => (
            <MyVideoItem
              key={video.id}
              video={video}
              index={index}
              onPlayVideo={onSelectVideo}
              onOptionsPress={handleVideoOptions}
            />
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

const {width, height} = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -5,
  },
  myVideosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    margin: 0,
  },
  playlistContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.75,
    backgroundColor: '#2D2D3F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  videoItem: {
    width: itemWidth,
  },
  thumbnailContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  duration: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#FFFFFF',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoInfo: {
    marginTop: 5,
    paddingRight: 30,
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  currentVideoTitle: {
    color: '#FFD700',
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  videoDate: {
    color: '#AAAAAA',
    fontSize: 12,
    marginRight: 8,
  },
  videoSize: {
    color: '#AAAAAA',
    fontSize: 12,
  },
  optionsButton: {
    position: 'absolute',
    top: 100,
    right: -10,
    margin: 0,
  },
});

export default VideoPlaylistModal;
