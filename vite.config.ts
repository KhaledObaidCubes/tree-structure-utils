import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ include: 'src' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/models/interfaces/i-types.ts'),
      formats: ['es']
    }
  }
})
