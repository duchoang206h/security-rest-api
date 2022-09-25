import { Router, RequestHandler } from 'express';
import { genNonceCacheKey } from '../utils/genCacheKey';
import { signSignature } from '../utils/signSignature';
import { cache } from '../cache/cache';
const TIMESTAMP_PERIOD = 10000; // 1 minute
const router = Router();
router.post('/', (req,  res) => {
    const nonce = Number(req.body.nonce);
    const timestamp: number = Number(req.body.timestamp);
    const signature = req.body.signature;
    const userId = req.session.id;
    console.log(JSON.stringify({nonce, timestamp, signSignature, userId}));
    // check condition, can write a service or helper to handle this, simply check here
    const nonceKey = genNonceCacheKey(userId) ;
    if( signature !== signSignature(nonce, timestamp) ||
        new Date().getTime() - TIMESTAMP_PERIOD >= timestamp ||
        cache.get(nonceKey) ){
        return res.status(403).json({ message: 'Forbidden'})
    }
    cache.get(nonceKey)
    cache.set(nonceKey, nonce, TIMESTAMP_PERIOD/1000);
    return res.status(200).json({ message: 'OK'})
})
export default router;