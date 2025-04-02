import {colors} from '#/themes/colors';
import React, {useState, useRef} from 'react';
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

interface Resolution {
  label: string;
  value: string;
  size: string;
  url: string;
}

interface PlayVideoScreenProps {
  navigation?: any;
  route?: any;
}

const PlayVideoScreen: React.FC<PlayVideoScreenProps> = ({
  navigation,
  route,
}) => {
  // Video player ref
  const videoRef = useRef<typeof Video>(null);

  // State variables
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(416); // 6:56 in seconds
  const [duration, setDuration] = useState<number>(986); // 16:26 in seconds
  const [showControls, setShowControls] = useState<boolean>(true);

  // Sample video data
  const videoData = {
    title: 'The Best Partner Season 3·One Day',
    subtitle: 'Wish Fulfilled GNZ48-Zhe...',
    thumbnail:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Play%20video-jx1o5SHSZklixGtIVjJQ2FYoBFOV50.png', // Replace with actual thumbnail URL
    url: 'https://example.com/video.mp4', // Replace with actual video URL
  };

  // Available resolutions
  const resolutions: Resolution[] = [
    {
      label: '240p',
      value: '240p',
      size: '96MB',
      url: 'https://example.com/video-240p.mp4',
    },
    {
      label: '360p',
      value: '360p',
      size: '189MB',
      url: 'https://example.com/video-360p.mp4',
    },
    {
      label: '480p',
      value: '480p',
      size: '368MB',
      url: 'https://example.com/video-480p.mp4',
    },
    {
      label: '720p',
      value: '720p',
      size: '487MB',
      url: 'https://example.com/video-720p.mp4',
    },
    {
      label: '1080p',
      value: '1080p',
      size: '687MB',
      url: 'https://example.com/video-1080p.mp4',
    },
    {
      label: '1440p',
      value: '1440p',
      size: '890MB',
      url: 'https://example.com/video-1440p.mp4',
    },
  ];

  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Handle video press (show/hide controls)
  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle back button press
  const handleBack = () => {
    navigation?.goBack();
  };

  // Handle copy/duplicate button press
  const handleCopy = () => {
    console.log('Copy video link');
  };

  // Handle download resolution
  const handleDownload = (resolution: Resolution) => {
    console.log(`Downloading ${resolution.label} (${resolution.size})`);
    // In a real app, you would start the download process here
  };

  // Handle video load
  const handleLoad = (data: any) => {
    setDuration(data.duration);
  };

  // Handle video progress
  const handleProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Video Player */}
      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={handleVideoPress}>
        {/* Using Image as placeholder for the Video component */}
        <Image
          source={{uri: videoData.thumbnail}}
          style={styles.videoPlayer}
          resizeMode="cover"
        />

        {/* In a real app, you would use the Video component */}
        {/* 
        <Video
          ref={videoRef}
          source={{ uri: videoData.url }}
          style={styles.videoPlayer}
          resizeMode="contain"
          paused={!isPlaying}
          onLoad={handleLoad}
          onProgress={handleProgress}
        />
        */}

        {/* Video Controls Overlay */}
        {showControls && (
          <View style={styles.controlsOverlay}>
            {/* Top Controls */}
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

            {/* Center Play/Pause Button */}
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

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      {/* Video Info */}
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{videoData.title}</Text>
        <Text style={styles.videoSubtitle}>{videoData.subtitle}</Text>
      </View>

      {/* Resolution Options */}
      <View style={styles.resolutionContainer}>
        <Text style={styles.resolutionTitle}>Change Resolution</Text>

        <View style={styles.resolutionsGrid}>
          {resolutions.map((resolution, index) => (
            <View key={index} style={styles.resolutionItem}>
              <View style={styles.resolutionInfo}>
                <Text style={styles.resolutionLabel}>{resolution.label}</Text>
                <Text style={styles.resolutionSize}>{resolution.size}</Text>
              </View>
              <IconButton
                icon="download"
                iconColor="#FFFFFF"
                size={24}
                onPress={() => handleDownload(resolution)}
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
    height: (width * 9) / 16, // 16:9 aspect ratio
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
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
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  videoInfo: {
    padding: 16,
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
    color: colors.Accent, // Gold color
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

export default PlayVideoScreen;
