export const genNonceCacheKey = (userId: string): string => {
    return `nonce_${userId}`;
}