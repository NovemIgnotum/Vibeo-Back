import Redis from 'ioredis';

const redisClient = new Redis();

//Creation de session
export const createSession = async (sessionId: string, userData: any, ttl: number) => {
    try {
        await redisClient.set(sessionId, JSON.stringify(userData), 'EX', ttl);
    } catch (error: any) {
        throw new Error(error);
    }
};

//Récupération de session
export const getSession = async (sessionId: string) => {
    try {
        const session = await redisClient.get(sessionId);
        return JSON.parse(Object(session));
    } catch (error: any) {
        throw new Error(error);
    }
};

//Suppression de session
export const deleteSession = async (sessionId: string) => {
    try {
        await redisClient.del(sessionId);
    } catch (error: any) {
        throw new Error(error);
    }
};
