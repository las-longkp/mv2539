import {Screens} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Icon} from 'react-native-paper';
const Footer: React.FC<BottomTabBarProps> = ({navigation, state}) => {
  const [selected, setSelected] = useState(Screens.HomeScreen);
  const navigateScreen = (name: string) => {
    navigation.navigate(name);
  };

  const handlePress = (buttonName: string) => {
    setSelected(buttonName);
    navigateScreen(buttonName);
  };
  const handleAddVideo = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      selectionLimit: 1,
    });
    if (result.assets?.[0]) {
      navigation.navigate(Screens.UploadVideoScreen, {video: result.assets[0]});
    }
  };
  const Button = ({name, icon}: {name: string; icon: string}) => (
    <TouchableOpacity
      style={[styles.button, selected === name && styles.selectedButton]}
      onPress={() => handlePress(name)}>
      <Icon
        source={icon}
        size={24}
        color={selected === name ? colors.Accent : colors.Gray}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.groupButton}>
      <View
        style={{
          backgroundColor: colors.Bg2,
          borderRadius: 25,
          flexDirection: 'row',
          width: '85%',
          justifyContent: 'space-around',
        }}>
        <Button name={Screens.HomeScreen} icon="home" />
        <Button name={Screens.FavoriteScreen} icon="heart-outline" />
        <Button name={Screens.SaveVideoScreen} icon="arrow-collapse-down" />
        <Button name={Screens.SettingScreen} icon="cog-outline" />
      </View>
      <TouchableOpacity style={styles.buttonPlus} onPress={handleAddVideo}>
        <Icon size={24} source="plus" color={colors.Accent} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  groupButton: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.Bg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonPlus: {
    backgroundColor: colors.Bg2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  selectedButton: {
    borderRadius: 10,
  },
  textButton: {
    color: colors.Gray,
    fontSize: 12,
    marginTop: 4,
  },
  selectedTextButton: {
    color: colors.Primary,
  },
});
