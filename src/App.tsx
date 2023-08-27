import {
  BrowserRouter
} from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  const queryClient = new QueryClient()
  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/Online-shoe-store/'}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
