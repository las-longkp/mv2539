import Footer from '#/Footer';
import FavoriteScreen from '#/pages/FavoriteScreen/FavoriteScreen';
import HomeScreen from '#/pages/HomeScreen/HomeScreen';
import SaveVideoScreen from '#/pages/SaveVideoScreen/SaveVideoScreen';
import SettingScreen from '#/pages/SettingScreen/SettingScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamsList, Screens} from './type';
import PlayVideoScreen from '#/pages/PlayVideoScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();
const Tab = createBottomTabNavigator<RootStackParamsList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Footer {...props} />}>
      <Tab.Screen name={Screens.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={Screens.FavoriteScreen} component={FavoriteScreen} />
      <Tab.Screen name={Screens.SaveVideoScreen} component={SaveVideoScreen} />
      <Tab.Screen name={Screens.SettingScreen} component={SettingScreen} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.MainScreen} component={TabNavigator} />
      <Stack.Screen
        name={Screens.PlayVideoScreen}
        component={PlayVideoScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
