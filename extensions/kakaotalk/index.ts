import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

const plugin = {
    id: "kakaotalk",
    name: "KakaoTalk",
    description: "KakaoTalk channel plugin",
    configSchema: {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" },
            deviceId: { type: "string" }
        },
        required: ["email", "password", "deviceId"]
    },
    register(api: OpenClawPluginApi) {
        if (!api) {
            return;
        }
        // TODO: Register channel
        // api.registerChannel({ plugin: kakaoPlugin });
        console.log("KakaoTalk plugin registered");
    },
};

export default plugin;
