import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    

    return {
        base: '/app/',
        plugins: [react()],

        esbuild: {
            target: 'esnext'
        },

        build: {
            target: 'esnext',
            sourcemap: true, // Genera i file .map per il debug
            minify: false, // Disabilita la minificazione per codice leggibile
            rollupOptions: {
                input: "index.html",
                preserveEntrySignatures: 'strict',
                output: {
                    preserveModules: true, // Mantiene i file separati
                    preserveModulesRoot: 'src', // Mantiene la struttura src/
                    // entryFileNames: 'assets/[name].[hash].js',
                    // chunkFileNames: 'assets/[name].[hash].js',
                    // assetFileNames: 'assets/[name].[hash].[ext]',
                }
            },
        },

        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'react': path.resolve(__dirname, './node_modules/react'),
                'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
            }
        },
        
        server: {
            cors: true,
        },
    }
})
