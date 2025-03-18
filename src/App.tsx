import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers/Routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // data fetching config
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routers />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
