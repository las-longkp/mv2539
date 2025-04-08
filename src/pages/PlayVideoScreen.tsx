import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList, Screens, VideoItem} from '#/navigator/type';
import {RouteProp} from '@react-navigation/native';
import {useRecentlyPlayedList, useVideoItemList} from '#/useLocalStorageSWR';
import {shortenTitle} from '#/utils/paragraph';
import {colors} from '#/themes/colors';
import VideoPlaylistModal from '#/components/VideoPlaylistModal';
import VideoOptionsModal from '#/components/VideoOptionsModal';
import {
  addRecentlyPlayedList,
  handleDeleteVideo,
  handleRename,
  handleToggleFavorite,
} from '#/utils/video';

type PlayVideoScreenProps = {
  navigation: StackNavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, Screens.PlayVideoScreen>;
};

export const PlayVideoScreen: React.FC<PlayVideoScreenProps> = ({
  navigation,
  route,
}) => {
  const {id} = route.params;
  const {data, saveData} = useVideoItemList();
  const {data: recentlyPlayedList, saveData: saveRecentlyPlayedList} =
    useRecentlyPlayedList();
  const [videoFind, setVideoFind] = useState<VideoItem | null>(null);
  const [visiblePlaylistModal, setVisiblePlaylistModal] = useState(false);
  const videoRef = useRef<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(126);
  const [duration, setDuration] = useState<number>(389);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [seekValue, setSeekValue] = useState<number>(0);
  useEffect(() => {
    const videoData = (data || []).find(item => item.id === id);
    if (videoData) {
      setVideoFind(videoData);
    }
  }, [data, id]);
  useEffect(() => {
    if (duration > 0) {
      setSeekValue(currentTime / duration);
    }
  }, [currentTime, duration]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBack = () => {
    navigation?.goBack();
  };

  const handleGallery = () => {
    setVisiblePlaylistModal(true);
  };

  const handlePrevious = () => {
    console.log('Play previous video');
    videoRef.current?.seek(0);
    setCurrentTime(0);
  };

  const handleNext = () => {
    console.log('Play next video');
  };

  const handleSliderValueChange = (value: number) => {
    setIsSeeking(true);
    setSeekValue(value);
  };

  const handleSliderSlidingComplete = (value: number) => {
    setIsSeeking(false);
    const newPosition = value * duration;
    videoRef.current?.seek(newPosition);
    setCurrentTime(newPosition);
  };

  const handleLoad = (data: any) => {
    setDuration(data.duration);
  };

  const handleProgress = (data: any) => {
    if (!isSeeking) {
      setCurrentTime(data.currentTime);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <IconButton
            icon="arrow-left"
            iconColor="#FFFFFF"
            size={24}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>
            {shortenTitle(videoFind?.title || '', 15)}
          </Text>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <IconButton
            icon="filmstrip"
            iconColor="#FFFFFF"
            size={24}
            onPress={handleGallery}
            style={styles.headerIcon}
          />
          <IconButton
            icon="dots-vertical"
            iconColor="#FFFFFF"
            size={24}
            onPress={() => setModalVisible(true)}
            style={styles.headerIcon}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={handleVideoPress}>
        <Video
          ref={videoRef}
          source={{uri: videoFind?.uri}}
          style={styles.videoPlayer}
          resizeMode="contain"
          paused={!isPlaying}
          onLoad={handleLoad}
          onProgress={handleProgress}
        />
      </TouchableOpacity>
      {showControls && (
        <View style={styles.controlsContainer}>
          <View style={styles.progressContainer}>
            <Slider
              style={styles.progressSlider}
              minimumValue={0}
              maximumValue={1}
              value={seekValue}
              minimumTrackTintColor={colors.Accent}
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor={colors.Accent}
              onValueChange={handleSliderValueChange}
              onSlidingComplete={handleSliderSlidingComplete}
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          <View style={styles.playbackControls}>
            <IconButton
              icon="skip-previous"
              iconColor="#FFFFFF"
              size={30}
              onPress={handlePrevious}
            />
            <IconButton
              icon={isPlaying ? 'pause' : 'play'}
              iconColor="#FFFFFF"
              size={40}
              style={styles.playPauseButton}
              onPress={handlePlayPause}
            />
            <IconButton
              icon="skip-next"
              iconColor="#FFFFFF"
              size={30}
              onPress={handleNext}
            />
          </View>
        </View>
      )}
      <VideoPlaylistModal
        visible={visiblePlaylistModal}
        onClose={() => setVisiblePlaylistModal(false)}
        currentVideo={null}
        videos={data || []}
        onSelectVideo={video => {
          setVideoFind(video);
          addRecentlyPlayedList(
            video,
            recentlyPlayedList || [],
            saveRecentlyPlayedList,
          );
          setVisiblePlaylistModal(false);
        }}
        onVideoOptions={() => setModalVisible(true)}
      />
      <VideoOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        video={videoFind}
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

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    margin: 0,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressSlider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playPauseButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    margin: 0,
  },
});
