import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./queryClient";
import UserPanel from "./components";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserPanel />
    </QueryClientProvider>
  );
}
