import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./queryClient";
import UserPanel from "./features";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserPanel />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
