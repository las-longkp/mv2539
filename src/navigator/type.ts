export enum Screens {
  MainScreen = 'MainScreen',
  HomeScreen = 'HomeScreen',
  FavoriteScreen = 'FavoriteScreen',
  SaveVideoScreen = 'SaveVideoScreen',
  SettingScreen = 'SettingScreen',
  PlayVideoScreen = 'PlayVideoScreen',
}

export type RootStackParamsList = {
  HomeScreen: undefined;
  MainScreen: undefined;
  FavoriteScreen: undefined;
  SaveVideoScreen: undefined;
  SettingScreen: undefined;
  PlayVideoScreen: {id: string};
};
