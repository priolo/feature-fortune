import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import federation from '@originjs/vite-plugin-federation'



// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        base: '/app/',
        plugins: [
            react(),
            // When you install @originjs/vite-plugin-federation, uncomment this:
            federation({
                name: 'feature-fortune-client',
                filename: 'remoteEntry.js',
                // Configure shared dependencies to prevent useSyncExternalStore issues
                shared: ['react', 'react-dom', 'react-router-dom', '@priolo/jon', '@priolo/jon-utils']
            })
        ],
        build: {
            outDir: 'dist',
            sourcemap: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3000', // Sostituisci con la porta del tuo server API
                    changeOrigin: true,
                    //rewrite: (path) => path.replace(/^\/api/, ''), // Opzionale: riscrivi il percorso se necessario
                },
            },
        },
        
    }
})
