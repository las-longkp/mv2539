import {Screens} from '#/navigator/type';
import {colors} from '#/themes/colors';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

  const Button = ({
    name,
    icon,
    label,
  }: {
    name: string;
    icon: string;
    label: string;
  }) => (
    <TouchableOpacity
      style={[styles.button, selected === name && styles.selectedButton]}
      onPress={() => handlePress(name)}>
      <Icon
        source={icon}
        size={24}
        color={selected === name ? colors.Primary : colors.Gray}
      />
      <Text
        style={[
          styles.textButton,
          selected === name && styles.selectedTextButton,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.groupButton}>
      <Button name={Screens.HomeScreen} icon="home" label="Home" />
      <Button
        name={Screens.FavoriteScreen}
        icon="bell-outline"
        label="Reminder"
      />
      <Button
        name={Screens.SaveVideoScreen}
        icon="chart-bar"
        label="Statistical"
      />
      <Button
        name={Screens.SettingScreen}
        icon="cog-outline"
        label="Settings"
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  groupButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
