import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const reporterName: string = 'verbose'
console.log(`VITEST used ${reporterName} as a reporter`)
export default defineConfig({
  plugins: [vue(), dts({ include: 'src' })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/_test_/TreeMethods.spec.ts'],
    css: true,
    testTimeout: 3000,
    reporters: [reporterName] //['verbose'] ['tap'] ['dot'] ['json'] ['junit'] ['default']
  }
})
