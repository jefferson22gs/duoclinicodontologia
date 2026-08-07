import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: 'auto',
        scope: '/',
        manifestFilename: 'manifest.json',
        includeAssets: [],
        manifest: {
          name: 'DuoClinic Odontologia',
          short_name: 'DuoClinic',
          description:
            'DuoClinic Odontologia em Indaiatuba. Atendimento individualizado, ambiente acolhedor e cuidado em cada etapa.',
          id: '/',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'any',
          lang: 'pt-BR',
          dir: 'ltr',
          theme_color: '#1D1D1B',
          background_color: '#F7F3EC',
          categories: ['health', 'medical', 'lifestyle'],
          prefer_related_applications: false,
          icons: [
            {
              src: 'icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'icons/pwa-maskable-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'icons/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          shortcuts: [
            {
              name: 'Agendar avaliação',
              short_name: 'Agendar',
              description: 'Agendar consulta via WhatsApp na DuoClinic',
              url: '/#contato',
              icons: [{ src: 'icons/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Ver tratamentos',
              short_name: 'Tratamentos',
              description: 'Conheça nossas especialidades como Endodontia e Estética',
              url: '/#especialidades',
              icons: [{ src: 'icons/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Conhecer a clínica',
              short_name: 'A DuoClinic',
              description: 'Saiba mais sobre a estrutura e os profissionais da DuoClinic',
              url: '/#a-duoclinic',
              icons: [{ src: 'icons/pwa-192x192.png', sizes: '192x192' }],
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff,woff2,json}'],
          globIgnores: [
            '**/*.mp4',
            '**/videos/**',
            '**/tour_clinica.mp4',
            '**/tratamento_canal.mp4',
            '**/cirurgia_siso.mp4',
            '**/icons/**',
            '**/screenshots/**',
            'manifest.json',
          ],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: ({ request, url }) => request.destination === 'video' || /\.mp4$/i.test(url.pathname),
              handler: 'NetworkOnly',
            },
            {
              urlPattern: ({ url }) =>
                url.hostname.includes('google.com') ||
                url.hostname.includes('instagram.com') ||
                url.hostname.includes('whatsapp.com') ||
                url.hostname.includes('wa.me') ||
                url.hostname.includes('gstatic.com'),
              handler: 'NetworkOnly',
            },
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'duoclinic-images-cache',
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: ({ request }) => request.destination === 'font',
              handler: 'CacheFirst',
              options: {
                cacheName: 'duoclinic-fonts-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 365 * 24 * 60 * 60,
                },
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
