import {colors} from '#/themes/colors';
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
  Dimensions,
} from 'react-native';
import {IconButton} from 'react-native-paper';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  size: string;
  totalSize: string;
}

interface SaveVideoScreenProps {
  navigation?: any;
}

const SaveVideoScreen: React.FC<SaveVideoScreenProps> = ({navigation}) => {
  const savedVideos: VideoItem[] = [
    {
      id: '1',
      title: 'Dog Training Guide',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Save%20video%20%2B%20Playermini-ZdSMiu4xhnhrdcWJLEyS5wzIzRr2BT.png', // Replace with actual thumbnail URL
      date: '26/03/2025',
      size: '999MB',
      totalSize: '1.1GB',
    },
    {
      id: '2',
      title: 'Best Partner Season 3: Episode 5',
      thumbnail:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Save%20video%20%2B%20Playermini-ZdSMiu4xhnhrdcWJLEyS5wzIzRr2BT.png', // Replace with actual thumbnail URL
      date: '26/03/2025',
      size: '456MB',
      totalSize: '890MB',
    },
  ];

  const [currentlyPlaying, setCurrentlyPlaying] = useState<VideoItem | null>(
    savedVideos[1],
  );
  const [showMiniPlayer, setShowMiniPlayer] = useState<boolean>(true);

  const handleDeleteVideo = (video: VideoItem) => {
    console.log(`Delete video: ${video.title}`);
  };

  const handlePlayVideo = (video: VideoItem) => {
    setCurrentlyPlaying(video);
    setShowMiniPlayer(true);
    console.log(`Play video: ${video.title}`);
  };

  const handleExpandMiniPlayer = () => {
    console.log('Expand to full screen player');
  };

  const handleCloseMiniPlayer = () => {
    setShowMiniPlayer(false);
  };

  const renderVideoItem = (video: VideoItem) => (
    <View key={video.id} style={styles.videoItem}>
      <TouchableOpacity
        style={styles.videoContent}
        onPress={() => handlePlayVideo(video)}>
        <Image
          source={{uri: video.thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoDate}>{video.date}</Text>
          <View style={styles.sizeContainer}>
            <IconButton
              icon="circle"
              iconColor="#FFFFFF"
              size={16}
              style={styles.circleIcon}
            />
            <Text style={styles.videoSize}>
              {video.size}/{video.totalSize}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <IconButton
        icon="delete"
        iconColor="#FFFFFF"
        size={24}
        onPress={() => handleDeleteVideo(video)}
      />
    </View>
  );

  const renderMiniPlayer = () => {
    if (!showMiniPlayer || !currentlyPlaying) return null;

    return (
      <View style={styles.miniPlayerContainer}>
        <TouchableOpacity
          style={styles.miniPlayerContent}
          onPress={handleExpandMiniPlayer}>
          <Image
            source={{uri: currentlyPlaying.thumbnail}}
            style={styles.miniPlayerThumbnail}
            resizeMode="cover"
          />

          <IconButton
            icon="fullscreen"
            iconColor="#FFFFFF"
            size={20}
            style={styles.expandButton}
            onPress={handleExpandMiniPlayer}
          />

          <IconButton
            icon="close"
            iconColor="#FFFFFF"
            size={20}
            style={styles.closeButton}
            onPress={handleCloseMiniPlayer}
          />
        </TouchableOpacity>
      </View>
    );
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
        {savedVideos.map(renderVideoItem)}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {renderMiniPlayer()}
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
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
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
  videoDate: {
    color: '#999999',
    fontSize: 12,
    marginBottom: 4,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  miniPlayerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    overflow: 'hidden',
  },
  miniPlayerContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  miniPlayerThumbnail: {
    width: '100%',
    height: '100%',
  },
  expandButton: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: 0,
  },
});

export default SaveVideoScreen;
