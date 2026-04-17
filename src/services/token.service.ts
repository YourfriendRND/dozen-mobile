import * as SecureStore from 'expo-secure-store';
import { TokenType } from '../common/token.type';

export const tokenService = {
    async saveToken(accessToken: string, refreshToken: string): Promise<void> {
        await SecureStore.setItemAsync(TokenType.ACCESS, accessToken);
        await SecureStore.setItemAsync(TokenType.REFRESH, refreshToken);
    },

    async getAccessToken() {
        return SecureStore.getItemAsync(TokenType.ACCESS);
    },

    async getRefreshToken() {
        return SecureStore.getItemAsync(TokenType.REFRESH);
    },

    async clear() {
        await SecureStore.deleteItemAsync(TokenType.ACCESS);
        await SecureStore.deleteItemAsync(TokenType.REFRESH);
    }
}
