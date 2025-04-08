import {colors} from '#/themes/colors';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RenameModal from './RenameModal';
import {VideoItem} from '#/navigator/type';

interface VideoOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  video: VideoItem | null;
  onPlayVideo?: (video: VideoItem) => void;
  onToggleFavorite?: (video: VideoItem) => void;
  onDeleteVideo?: (video: VideoItem) => void;
  onRename: (video: VideoItem, name: string) => void;
}

const VideoOptionsModal: React.FC<VideoOptionsModalProps> = ({
  visible,
  onClose,
  video,
  onPlayVideo,
  onToggleFavorite,
  onDeleteVideo,
  onRename,
}) => {
  const [renameModalVisible, setRenameModalVisible] = useState<boolean>(false);
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
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      />

      <View style={styles.sheet}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        {onPlayVideo && (
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => onPlayVideo?.(video)}>
            <Text style={styles.optionText}>Play Video</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setRenameModalVisible(true)}>
          <Text style={styles.optionText}>Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => onToggleFavorite?.(video)}>
          <Text style={styles.optionText}>
            {video.isFavorite ? 'Remove from Favourite' : 'Add to Favourite'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={handleShareVideo}>
          <Text style={styles.optionText}>Share Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionItem, styles.deleteOption]}
          onPress={handleDeleteVideo}>
          <Text style={styles.optionText}>Delete Video</Text>
        </TouchableOpacity>
      </View>
      <RenameModal
        visible={renameModalVisible}
        onClose={() => setRenameModalVisible(false)}
        onRename={newName => onRename(video, newName)}
        initialName={video.title}
      />
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: colors.Bg2,
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
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
});

export default VideoOptionsModal;
