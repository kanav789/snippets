import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import CreateSnippet from "./pages/CreateSnippet";
import SnippetsList from "./pages/SnippetsList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: 'hsl(120 10% 6%)',
            border: '1px solid hsl(120 40% 20%)',
            color: 'hsl(120 100% 65%)',
            fontFamily: 'Fira Code, monospace',
          },
        }}
      />
      <BrowserRouter>
        <div className="terminal-screen relative min-h-screen bg-background">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create-snippet" element={<CreateSnippet />} />
            <Route path="/snippets" element={<SnippetsList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;