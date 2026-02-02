import type { ChannelPlugin, ResolvedAccount } from "openclaw/plugin-sdk";
import { getKakaoRuntime } from "./runtime.js";

export interface KakaoAccountConfig {
    email?: string;
    password?: string;
    deviceId?: string;
}

export interface ResolvedKakaoAccount extends ResolvedAccount<KakaoAccountConfig> {
}

export const kakaoPlugin: ChannelPlugin<ResolvedKakaoAccount> = {
    id: "kakaotalk",
    configSchema: {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" },
            deviceId: { type: "string" }
        }
    },
    config: {
        listAccountIds: () => ["default"],
        resolveAccount: (cfg, accountId) => ({
            accountId,
            name: "KakaoTalk",
            enabled: true,
            config: cfg.channels?.kakaotalk ?? {},
            tokenSource: "config"
        }),
        defaultAccountId: () => "default",
        setAccountEnabled: () => { },
        deleteAccount: () => { },
        isConfigured: (account) => Boolean(account.config.email && account.config.password),
        describeAccount: (account) => ({
            accountId: account.accountId,
            name: account.name,
            enabled: account.enabled,
            configured: Boolean(account.config.email && account.config.password),
            tokenSource: account.tokenSource,
        }),
        resolveAllowFrom: () => [],
        formatAllowFrom: () => [],
    },
    gateway: {
        startAccount: async (ctx) => {
            ctx.log?.info(`[KakaoTalk] Starting account ${ctx.account.name}...`);

            const client = await startClient(ctx.account.accountId, ctx.account.config, ctx.log);

            client.on("chat", (data, channel) => {
                // TODO: Implement Inbound Activity mapping
                // const text = data.text;
                // const sender = data.sender;
                // ctx.runtime.ingest({...});
                ctx.log?.debug(`[KakaoTalk] Received message: ${data.text}`);
            });

            return async () => {
                ctx.log?.info("[KakaoTalk] Stopping account...");
                stopClient(ctx.account.accountId);
            };
        },
        logoutAccount: async () => {
            return { cleared: true, envToken: false, loggedOut: true };
        },
    },
    outbound: {
        deliveryMode: "direct",
        sendText: async ({ to, text, accountId }) => {
            const client = getClient(accountId ?? "default");
            if (!client) {
                return { channel: "kakaotalk", success: false, error: "Client not found" };
            }

            try {
                // node-kakao uses Channel to send. We need to find the channel by ID (to)
                // 'to' is usually the chat room ID.
                // In node-kakao, we use client.channelManager.get(to)
                const channel = client.channelList.get(to); // or similar, need to verify API
                if (!channel) {
                    return { channel: "kakaotalk", success: false, error: "Channel not found" };
                }

                await channel.sendText(text);
                return { channel: "kakaotalk", success: true };
            } catch (e: any) {
                return { channel: "kakaotalk", success: false, error: String(e) };
            }
        },
        sendMedia: async () => {
            return { channel: "kakaotalk", success: false, error: "Not implemented" };
        }
    },
    // TODO: Add missing required properties
    directory: {
        self: async () => null,
        listPeers: async () => [],
        listGroups: async () => [],
    },
    messaging: {
        normalizeTarget: (t) => t,
        targetResolver: {
            looksLikeId: (id) => /^[0-9]+$/.test(id),
            hint: "KakaoTalk Chat ID"
        }
    },
    setup: {
        resolveAccountId: ({ accountId }) => accountId,
        applyAccountName: () => ({} as any),
        validateInput: () => null,
        applyAccountConfig: () => ({} as any)
    }
};
