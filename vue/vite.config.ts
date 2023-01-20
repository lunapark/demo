/// <reference types="vitest" />
/// <reference types="histoire" />

import * as path from "path";
import { defineConfig, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const alias = {
    "@": path.resolve(__dirname, "src")
};

export default defineConfig(({ command }) => {
    const config: UserConfig = {
        plugins: [vue(
            {
                template: {
                    compilerOptions: {
                        isCustomElement: tag => tag.startsWith('lp-'),
                    },
                },
            }
        )],
        resolve: {
            alias
        },
        server: {
            host: "127.0.0.1",
            port: 2022
        }
    };

    return config;
});
