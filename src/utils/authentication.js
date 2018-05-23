// @flow
import {AsyncStorage} from 'react-native';

const AUTHENTICATION_STORAGE_KEY: string = 'PepperoniState:Authentication';

export function getAuthenticationToken(): string | null {
  return AsyncStorage.getItem(AUTHENTICATION_STORAGE_KEY);
}

export async function setAuthenticationToken(token: string): string {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_KEY, token);
}

export async function clearAuthenticationToken() {
  return AsyncStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
}
