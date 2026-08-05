import {useEffect} from 'react';
import {AppState} from 'react-native';
import {useNetworkState} from 'expo-network';
import {focusManager, onlineManager} from '@tanstack/react-query';

export const useQueryClientState = () => {
  const {isInternetReachable} = useNetworkState();

  useEffect(() => {
    if (typeof isInternetReachable === 'boolean') onlineManager.setOnline(isInternetReachable);
  }, [isInternetReachable]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      focusManager.setFocused(status === 'active');
    });

    return () => subscription.remove();
  }, []);
};
