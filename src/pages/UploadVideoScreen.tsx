import {RootStackParamsList, Screens} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {useDownloadList, useVideoItemList} from '#/useLocalStorageSWR';
import Slider from '@react-native-community/slider';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FFmpegKit, FFmpegKitConfig} from 'ffmpeg-kit-react-native';
import uuid from 'react-native-uuid';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {IconButton} from 'react-native-paper';
import Video from 'react-native-video';
import {getVideoDuration} from 'react-native-video-duration';

type UploadVideoScreenProps = {
  navigation: StackNavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, Screens.UploadVideoScreen>;
};

export const UploadVideoScreen: React.FC<UploadVideoScreenProps> = ({
  navigation,
  route,
}) => {
  const {video} = route.params;
  const {data, saveData} = useDownloadList();
  const {data: dataVideoItem, saveData: saveDataVideoItem} = useVideoItemList();
  const videoRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [durationVideo, setDurationVideo] = useState(0);
  const [durationCurrent, setDurationCurrent] = useState(0);
  type Resolution = '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p';
  const resolutionMap: Record<Resolution, string> = {
    '240p': '426:240',
    '360p': '640:360',
    '480p': '854:480',
    '720p': '1280:720',
    '1080p': '1920:1080',
    '1440p': '2560:1440',
  };
  const [processing, setProcessing] = useState<boolean>(false);
  const handleDownload = async (resolution: Resolution) => {
    try {
      if (!video || !video.uri) {
        Alert.alert('Error', 'No video selected or invalid video URI');
        return;
      }

      setProcessing(true);
      const outputFileName = `output_${resolution}_${Date.now()}.mp4`;
      const outputFilePath = `${RNFS.DocumentDirectoryPath}/${outputFileName}`;

      await FFmpegKitConfig.init();
      const scale = resolutionMap[resolution];
      const command = `-i ${video.uri} -vf scale=1280:720 -c:v libx264 -preset fast -crf 23 -c:a aac ${outputFilePath}`;
      console.log(command);
      const session = await FFmpegKit.execute(command);
      console.log('tai xuong thanh cong', outputFilePath);
      // const newData = {
      //   id: uuid.v4().toString(),
      //   title: video.fileName || '',
      //   resolution: resolution,
      //   progress: 0,
      //   status: 'done',
      //   outputPath: video.uri,
      //   size: video.fileSize,
      //   createdAt: new Date().toISOString(),
      // };
      // saveData([...(data || []), newData]);
      const newData = {
        id: uuid.v4().toString(),
        title: video.fileName || '',
        uri: outputFilePath,
        duration: video.duration || 0,
        date: new Date().toISOString(),
        size: video.fileSize || 0,
        isFavorite: false,
      };
      saveDataVideoItem([...(dataVideoItem || []), newData]);
      navigation.goBack();
    } catch (error) {
      console.error('Error during video processing:', error);
      Alert.alert('Error', `An error occurred: ${error}`);
    } finally {
      setProcessing(false);
    }
  };

  const onSliderValueChange = (value: number) => {
    videoRef.current?.seek(value);
  };

  const getDurationVideo = useCallback(async () => {
    try {
      setCurrentTime(0);
      if (video && video?.uri) {
        const videoDuration = await getVideoDuration(video?.uri);
        if (typeof videoDuration === 'number') {
          setDurationVideo(videoDuration);
        }
      }
    } catch (err) {}
  }, [video]);

  const onLoad = (data: any) => {
    setDurationCurrent(data.duration);
  };

  const onProgress = useCallback((data: {currentTime: number}) => {
    setCurrentTime(prevTime =>
      Math.abs(prevTime - data.currentTime) > 0.5 ? data.currentTime : prevTime,
    );
  }, []);

  useEffect(() => {
    if (video?.uri) {
      getDurationVideo();
    }
  }, [getDurationVideo, video]);

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

  const handleCopy = () => {
    console.log('Copy video link');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={handleVideoPress}>
        {video && (
          <Video
            source={{uri: video.uri}}
            ref={videoRef}
            onLoad={onLoad}
            onProgress={onProgress}
            style={styles.backgroundVideo}
            paused={!isPlaying}
          />
        )}

        {showControls && (
          <View style={styles.controlsOverlay}>
            <View style={styles.topControls}>
              <IconButton
                icon="arrow-left"
                iconColor="#FFFFFF"
                size={24}
                onPress={handleBack}
              />

              <IconButton
                icon="content-copy"
                iconColor="#FFFFFF"
                size={24}
                onPress={handleCopy}
              />
            </View>

            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={handlePlayPause}>
              <IconButton
                icon={isPlaying ? 'pause' : 'play'}
                iconColor="#FFFFFF"
                size={30}
                style={styles.playPauseIcon}
              />
            </TouchableOpacity>

            <View style={styles.bottomControls}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={durationCurrent}
                value={currentTime}
                onValueChange={onSliderValueChange}
                minimumTrackTintColor={colors.Primary}
                thumbTintColor="#fff"
              />
              <Text style={styles.timeText}>{formatTime(durationVideo)}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{video?.fileName}</Text>
      </View>

      <View style={styles.resolutionContainer}>
        <Text style={styles.resolutionTitle}>Change Resolution</Text>

        <View style={styles.resolutionsGrid}>
          {Object.keys(resolutionMap).map((res, index) => (
            <View key={index} style={styles.resolutionItem}>
              <View style={styles.resolutionInfo}>
                <Text style={styles.resolutionLabel}>{res}</Text>
              </View>
              <IconButton
                icon={processing ? 'progress-download' : 'download'}
                iconColor="#FFFFFF"
                size={24}
                onPress={() => handleDownload(res as Resolution)}
              />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  videoContainer: {
    width: width,
    height: (width * 9) / 16,
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  slider: {
    width: width - 120,
  },
  textTime: {
    color: colors.Primary,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  playPauseButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseIcon: {
    margin: 0,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    gap: 5,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  videoInfo: {
    padding: 16,
  },
  backgroundVideo: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: 16 / 9,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoSubtitle: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  resolutionContainer: {
    padding: 16,
  },
  resolutionTitle: {
    color: colors.Accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.Accent,
    paddingBottom: 8,
  },
  resolutionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resolutionItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 8,
  },
  resolutionInfo: {
    flex: 1,
  },
  resolutionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resolutionSize: {
    color: '#CCCCCC',
    fontSize: 12,
    marginTop: 4,
  },
});
