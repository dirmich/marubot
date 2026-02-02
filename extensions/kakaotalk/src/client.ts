import { TalkClient } from "node-kakao";

const clients = new Map<string, TalkClient>();

export function getClient(accountId: string): TalkClient | undefined {
    return clients.get(accountId);
}

export async function startClient(accountId: string, config: any, logger: any) {
    const { email, password, deviceId } = config;

    if (!email || !password || !deviceId) {
        throw new Error("Missing credentials");
    }

    const client = new TalkClient();

    try {
        const loginRes = await client.login({
            email,
            password,
            deviceUUID: deviceId,
            forced: true,
        });

        if (!loginRes.success) {
            throw new Error(`Login failed: ${loginRes.status}`);
        }

        logger?.info(`[KakaoTalk] Logged in successfully`);
        clients.set(accountId, client);

        // Set up listeners here or in the caller

        return client;
    } catch (err) {
        logger?.error(`[KakaoTalk] Login error: ${String(err)}`);
        throw err;
    }
}

export function stopClient(accountId: string) {
    const client = clients.get(accountId);
    if (client) {
        client.close();
        clients.delete(accountId);
    }
}
