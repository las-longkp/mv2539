import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {TextVariantConfig} from '#/themes';

interface EmptyDataProps {
  text: string;
}

const {width} = Dimensions.get('window');

export const EmptyData: React.FC<EmptyDataProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'noData'}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: width * 0.8,
    aspectRatio: 16 / 9,
    marginBottom: 12,
  },
  text: {
    ...TextVariantConfig.Title2,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
