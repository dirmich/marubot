import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { kakaoPlugin } from "./src/channel.js";
import { setKakaoRuntime } from "./src/runtime.js";

const plugin = {
    id: "kakaotalk",
    name: "KakaoTalk",
    description: "KakaoTalk channel plugin",
    configSchema: kakaoPlugin.configSchema,
    register(api: OpenClawPluginApi) {
        if (!api) {
            return;
        }
        setKakaoRuntime(api.runtime);
        api.registerChannel({ plugin: kakaoPlugin });
    },
};

export default plugin;
