import {Alert} from 'react-native';
import {VideoItem} from '#/navigator/type';

export const handleToggleFavorite = async (
  video: VideoItem,
  data: VideoItem[],
  saveData: (data: VideoItem[]) => Promise<void>,
) => {
  try {
    const updatedData = data.map(item =>
      item.id === video.id ? {...item, isFavorite: !item.isFavorite} : item,
    );
    await saveData(updatedData);
    const message = video.isFavorite
      ? 'Removed from favorites'
      : 'Added to favorites';
    Alert.alert(message);
    return updatedData;
  } catch (error) {
    Alert.alert('An error occurred while updating the favorite status');
    throw error;
  }
};

export const handleDeleteVideo = async (
  video: VideoItem,
  data: VideoItem[],
  saveData: (data: VideoItem[]) => Promise<void>,
  recentlyPlayedList: VideoItem[],
  saveRecentlyPlayedList: (data: VideoItem[]) => Promise<void>,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  Alert.alert(
    'Warning',
    'Are you sure you want to delete?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updateData = data.filter(item => item.id !== video.id);
          await saveData(updateData);
          const updateRecentlyPlayedList = recentlyPlayedList.filter(
            item => item.id !== video.id,
          );
          await saveRecentlyPlayedList(updateRecentlyPlayedList);
          setModalVisible(false);
        },
      },
    ],
    {cancelable: false},
  );
};
export const addRecentlyPlayedList = (
  video: VideoItem,
  recentlyPlayedList: VideoItem[],
  saveRecentlyPlayedList: (data: VideoItem[]) => Promise<void>,
) => {
  const videoFind = recentlyPlayedList?.find(item => item.id === video.id);
  if (videoFind) {
    const restData = recentlyPlayedList?.filter(item => item.id !== video.id);
    saveRecentlyPlayedList([video, ...(restData || [])]);
  } else {
    saveRecentlyPlayedList([video, ...(recentlyPlayedList || [])]);
  }
};
export const handleRename = async (
  id: string,
  name: string,
  data: VideoItem[],
  saveData: (data: VideoItem[]) => Promise<void>,
) => {
  const updateData = (data || []).map(item =>
    item.id === id ? {...item, title: name} : item,
  );
  saveData(updateData);
};
