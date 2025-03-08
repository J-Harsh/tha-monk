import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProducts from "./components/organisms/AddProducts";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AddProducts />
    </QueryClientProvider>
  );
}

export default App;
