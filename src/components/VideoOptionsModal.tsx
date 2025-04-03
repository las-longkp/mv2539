import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Share,
  Alert,
  ScrollView,
} from 'react-native';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date?: string;
  size?: string;
  isFavorite?: boolean;
}

interface VideoOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  video: VideoItem | null;
  onPlayVideo?: (video: VideoItem) => void;
  onRenameVideo?: (video: VideoItem) => void;
  onToggleFavorite?: (video: VideoItem) => void;
  onDeleteVideo?: (video: VideoItem) => void;
}

const VideoOptionsModal: React.FC<VideoOptionsModalProps> = ({
  visible,
  onClose,
  video,
  onPlayVideo,
  onRenameVideo,
  onToggleFavorite,
  onDeleteVideo,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const handleDeleteVideo = () => {
    if (video && onDeleteVideo) {
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete "${video.title}"?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => onDeleteVideo(video),
          },
        ],
      );
    }
  };

  const handleShareVideo = async () => {
    if (video) {
      try {
        await Share.share({
          title: video.title,
          message: `Check out this video: ${video.title}`,
        });
      } catch (error) {
        console.error('Error sharing video:', error);
      }
    }
  };

  if (!video) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{translateY}]}]}>
            <View style={styles.modalHandle} />
            <ScrollView>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onPlayVideo?.(video)}>
                <Text style={styles.optionText}>Play Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onRenameVideo?.(video)}>
                <Text style={styles.optionText}>Rename</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => onToggleFavorite?.(video)}>
                <Text style={styles.optionText}>
                  {video.isFavorite
                    ? 'Remove from Favourite'
                    : 'Add to Favourite'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={handleShareVideo}>
                <Text style={styles.optionText}>Share Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionItem, styles.deleteOption]}
                onPress={handleDeleteVideo}>
                <Text style={styles.optionText}>Delete Video</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalContainer: {
    backgroundColor: '#2D2D3F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#FFD700',
    alignSelf: 'center',
    marginVertical: 12,
    borderRadius: 2,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  deleteOption: {
    marginTop: 10,
  },
});

export default VideoOptionsModal;
