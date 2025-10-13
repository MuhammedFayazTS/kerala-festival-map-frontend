import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router";
import Index from "./pages/Index";

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="festival-map-ui-theme">
      <BrowserRouter>
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
