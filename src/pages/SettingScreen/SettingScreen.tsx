import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Share,
  Linking,
  Alert,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import InAppReview from 'react-native-in-app-review';
import {colors} from '#/themes/colors';
interface SettingItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface SettingScreenProps {
  navigation?: any;
}

const SettingScreen: React.FC<SettingScreenProps> = ({navigation}) => {
  const handleShareApp = async () => {
    try {
      try {
        await Share.share({
          message: 'Check out this awesome app!',
        });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRateApp = useCallback(async () => {
    try {
      const available = await InAppReview.isAvailable();

      if (available) {
        await InAppReview.RequestInAppReview();
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      Alert.alert('Error');
    }
  }, []);

  const handleContactUs = () => {
    Linking.openURL('https://www.google.com/');
  };

  const handleTermsOfPolicy = () => {
    Linking.canOpenURL('https://www.apple.com/legal/privacy/vn/')
      .then(supported => {
        if (supported) {
          return Linking.openURL('https://www.apple.com/legal/privacy/vn/');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const settingItems: SettingItem[] = [
    {
      id: '1',
      title: 'Share App',
      icon: 'account-group',
      onPress: handleShareApp,
    },
    {
      id: '2',
      title: 'Rate App',
      icon: 'star',
      onPress: handleRateApp,
    },
    {
      id: '3',
      title: 'Contact Us',
      icon: 'face-agent',
      onPress: handleContactUs,
    },
    {
      id: '4',
      title: 'Term of Policy',
      icon: 'shield',
      onPress: handleTermsOfPolicy,
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}>
      <IconButton
        icon={item.icon}
        iconColor="#FFFFFF"
        size={24}
        style={styles.settingIcon}
      />
      <Text style={styles.settingTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Setting</Text>
      </View>

      <View style={styles.settingsContainer}>
        {settingItems.map(renderSettingItem)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.Accent,
    textAlign: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingIcon: {
    margin: 0,
    marginRight: 10,
  },
  settingTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SettingScreen;
