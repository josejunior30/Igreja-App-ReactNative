import Constants from 'expo-constants';

let extra: Record<string, any> = {};

try {
  extra = JSON.parse(Constants.manifestString).extra;
} catch (error) {
  console.error('Error parsing manifest JSON:', error);
}

export const BASE_URL = extra.REACT_APP_BASE_URL || 'http://192.168.1.3:8080';
export const CLIENT_ID = extra.REACT_APP_CLIENT_ID || 'myclientid';
export const CLIENT_SECRET = extra.REACT_APP_CLIENT_SECRET || 'myclientsecret';
export const TOKEN_KEY = 'com.esibape/token';

