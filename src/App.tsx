// import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
// import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient()
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        {/* <Provider store={store}> */}
        <AppRoutes />
        {/* </Provider> */}
      </QueryClientProvider>
    </HashRouter>
  );
}
