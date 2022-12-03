import { defaultTheme } from "vuepress"
import {chalk, getDirname, logger, path} from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

// https://github.com/lando/vuepress-theme-default-plus/blob/main/index.js
export const needleEngineTheme = options => {
    
  

    return {
        name: '@needle-tools/vuepress-theme-needle-engine',
        extends: defaultTheme(options),
        alias: {
            ...{
                // override defaults
            },
            ...options.alias,
        },

        define: {
            __THEME_OPTIONS__: options,
        },

        
    }
}