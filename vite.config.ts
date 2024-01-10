import { HtmlTagDescriptor, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import { createHtmlPlugin } from 'vite-plugin-html';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const fontsDirectory = resolve(__dirname, 'public/assets/fonts');

const fontFiles = readdirSync(fontsDirectory).filter((file) =>
  file.endsWith('.woff2'),
);

const injectFontsToHead: HtmlTagDescriptor[] = fontFiles.map((fontFile) => ({
  injectTo: 'head',
  tag: 'link',
  attrs: {
    rel: 'preload',
    href: `/assets/fonts/${fontFile}`,
    as: 'font',
    type: 'font/woff2',
  },
}));

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({
      compiler: true,
    }),
    createHtmlPlugin({
      inject: {
        tags: injectFontsToHead,
      },
    }),
  ],
  test: {
    globals: true, 
    environment: 'happy-dom',
    include: ['src/stories/**/*.test.ts?(x)'],
  },
  define: {
    'process.env': {},
  },
});
