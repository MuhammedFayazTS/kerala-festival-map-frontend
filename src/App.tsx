import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/ui/theme-provider"
import Index from "@/pages/Index";
import Header from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="festival-map-ui-theme">
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <BrowserRouter>
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Index />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
