import AsyncStorage from '@react-native-async-storage/async-storage';
import useSWR, {SWRResponse} from 'swr';
import {VideoItem} from './navigator/type';

const fetcher = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    throw new Error('Error fetching data from AsyncStorage');
  }
};

const saver = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return value;
  } catch (error) {
    throw new Error('Error saving data to AsyncStorage');
  }
};

interface LocalStorageSWRResponse<Data, Error>
  extends SWRResponse<Data, Error> {
  saveData: (value: Data) => Promise<void>;
  isLoading: boolean;
}

export function useLocalStorageSWR<Data = any, Error = any>(
  key: string,
  initialValue: Data,
): LocalStorageSWRResponse<Data, Error> {
  const {data, mutate, error, isValidating} = useSWR<Data, Error>(
    key,
    fetcher,
    {fallbackData: initialValue},
  );

  const saveData = async (value: Data) => {
    try {
      await saver(key, value);
      mutate(value, true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const isLoading = isValidating && !data && !error;

  return {
    data,
    saveData,
    error,
    mutate,
    isValidating,
    isLoading,
  };
}

export function useVideoItemList() {
  return useLocalStorageSWR<VideoItem[] | null>('VideoItemList', null);
}
