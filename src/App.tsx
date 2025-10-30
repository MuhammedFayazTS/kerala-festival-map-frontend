import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/ui/theme-provider"
import Index from "@/pages/Index";
import { Footer } from "@/components/ui/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Festval from "@/pages/Festival";

function App() {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="festival-map-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div className="h-screen flex flex-col overflow-hidden relative">
          <BrowserRouter>
            <div className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<Index />} />
              </Routes>
              <Routes>
                <Route path="/:id" element={<Festval />} />
              </Routes>
            </div>
          </BrowserRouter>
          <Footer />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
