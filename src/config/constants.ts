import { Platform } from 'react-native';

export const FREE_SOUND_LIMIT = 3;

// RevenueCat public SDK keys.
export const REVENUECAT_API_KEY_IOS = 'appl_FJNZSoYWWFCPJMTbuibMXLCJpes';
export const REVENUECAT_API_KEY_ANDROID = 'goog_mRzQNLEWSqjfisGoWGaLycmVOVC';

export const REVENUECAT_API_KEY =
  Platform.OS === 'ios' ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;

export const ENTITLEMENT_ID = 'pro';
