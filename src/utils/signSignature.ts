const HMAC_SIGNATURE_KEY = process.env.HMAC_SIGNATURE_KEY || "duchoang" as string;
import crypto from 'crypto-js';
export const signSignature = (nonce: number, timestamp: number, key = HMAC_SIGNATURE_KEY): string => {
    const raw = `${nonce}${timestamp}`;
    return crypto.HmacSHA256(raw, key).toString();
}