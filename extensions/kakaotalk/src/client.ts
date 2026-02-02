import { TalkClient, AuthApiClient } from "node-kakao";

const clients = new Map<string, TalkClient>();

export function getClient(accountId: string): TalkClient | undefined {
    return clients.get(accountId);
}

export async function startClient(accountId: string, config: any, logger: any) {
    const { email, password, deviceId } = config;

    if (!email || !password || !deviceId) {
        throw new Error("Missing credentials");
    }

    try {
        const authClient = await AuthApiClient.create(
            "OpenClaw",
            deviceId
        );

        const loginRes = await authClient.login({
            email,
            password,
        }, true);

        if (!loginRes.success) {
            throw new Error(`Login failed: ${loginRes.status}`);
        }

        const client = new TalkClient();

        // Use the credential from login result
        const connRes = await client.login(loginRes.result);
        if (!connRes.success) {
            throw new Error(`Connection failed: ${connRes.status}`);
        }

        logger?.info(`[KakaoTalk] Logged in successfully`);
        clients.set(accountId, client);

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
