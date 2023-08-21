import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 'process.env.BASE_API_URL': JSON.stringify(env.BASE_API_URL),
      // 'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
      // If you want to exposes all env variables, which is not recommended
      'process.env': env
    },
  };
});