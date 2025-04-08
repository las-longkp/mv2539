import {Asset} from 'react-native-image-picker';

export enum Screens {
  MainScreen = 'MainScreen',
  HomeScreen = 'HomeScreen',
  FavoriteScreen = 'FavoriteScreen',
  SaveVideoScreen = 'SaveVideoScreen',
  SettingScreen = 'SettingScreen',
  PlayVideoScreen = 'PlayVideoScreen',
  UploadVideoScreen = 'UploadVideoScreen',
}

export type RootStackParamsList = {
  HomeScreen: undefined;
  MainScreen: undefined;
  FavoriteScreen: undefined;
  SaveVideoScreen: undefined;
  SettingScreen: undefined;
  PlayVideoScreen: {id: string};
  UploadVideoScreen: {video: Asset};
};
export type VideoItem = {
  id: string;
  title: string;
  uri: string;
  duration: number;
  date: string;
  size: number;
  isFavorite?: boolean;
};
export interface DownloadItem {
  id: string;
  title: string;
  resolution: string;
  progress: number;
  status: 'idle' | 'downloading' | 'done' | 'error';
  outputPath?: string;
  size: string;
  createdAt: string;
}
