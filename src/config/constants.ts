import { Platform } from 'react-native';

export const FREE_SOUND_LIMIT = 3;

// TODO: Replace with your RevenueCat API keys
export const REVENUECAT_API_KEY_IOS = 'appl_FJNZSoYWWFCPJMTbuibMXLCJpes';
export const REVENUECAT_API_KEY_ANDROID = 'your_android_api_key_here';

export const REVENUECAT_API_KEY =
  Platform.OS === 'ios' ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;

export const ENTITLEMENT_ID = 'pro';
