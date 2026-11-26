import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ghks331.github.io는 사용자 사이트라 루트('/')에서 서비스됩니다.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
