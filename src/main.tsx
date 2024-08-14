import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Menu from "./Menu.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { About } from "./About.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      // refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<h1>Oops!</h1>}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <nav>
            <Link to="/">Menu</Link> | <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
