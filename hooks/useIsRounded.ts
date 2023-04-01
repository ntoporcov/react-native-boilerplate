import { useMemo } from 'react';
import * as Device from 'expo-device';

export const useIsRounded = () => {
  return useMemo(() => {
    const iphoneId = parseFloat(Device.modelId.replace('iPhone', '').replace(',', '.'));

    if (iphoneId > 11) {
      return true;
    }

    return iphoneId === 10.3 || iphoneId === 10.6;
  }, []);
};
