import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner"; // or just 'sonner' if globally registered
import { AuthProvider } from "@/context/AuthContext";
import AppRouter from "@/router/AppRouter";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
