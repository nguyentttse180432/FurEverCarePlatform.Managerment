import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routers/Routers";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </>
  );
}

export default App;
