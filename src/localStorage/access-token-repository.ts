import AsyncStorage from '@react-native-async-storage/async-storage';

import { TOKEN_KEY } from '../contexts/system';

export async function save(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token', error);
  }
}

export async function get(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
}

export async function remove() {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token', error);
  }
}

export async function getUserData(): Promise<any | null> {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error('Error getting user data', error);
    return null;
  }
}

export async function saveUserData(token: string, userData: any) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data', error);
  }
}
