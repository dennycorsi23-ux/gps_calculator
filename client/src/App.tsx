import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CalcolaGPS from "./pages/CalcolaGPS";
import Privacy from "./pages/Privacy";
import { InfoGPS } from "./pages/InfoGPS";
import { Contact } from "./pages/Contact";
import { NewsGPS2026 } from "./pages/NewsGPS2026";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import TrovaClasseConcorso from "./pages/TrovaClasseConcorso";
import ClasseDetail from "./pages/ClasseDetail";
import { CookiePolicy } from "./pages/CookiePolicy";
import { TermsConditions } from "./pages/TermsConditions";
import TestCombobox from "./pages/TestCombobox";
import GuideAumentarePunteggio from "./pages/GuideAumentarePunteggio";
import ConfrontaClassi from "./pages/ConfrontaClassi";
import FAQGPS from "./pages/FAQGPS";
import Corsi from "./pages/Corsi";
import AdminCorsi from "./pages/AdminCorsi";
import Login from "./pages/Login";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/calcola-gps"} component={CalcolaGPS} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/info-gps"} component={InfoGPS} />
      <Route path={"/novita-gps-2026"} component={NewsGPS2026} />
      <Route path={"/contatti"} component={Contact} />
      <Route path={"/guida-aumentare-punteggio"} component={GuideAumentarePunteggio} />
      <Route path={"/confronta-classi"} component={ConfrontaClassi} />
      <Route path={"/faq-gps"} component={FAQGPS} />
      <Route path={"/corsi"} component={Corsi} />
      <Route path={"/login"} component={Login} />
      <Route path={"/admin/corsi"} component={AdminCorsi} />
      <Route path={"/trova-classe"} component={TrovaClasseConcorso} />
      <Route path={"/classe/:codice"} component={ClasseDetail} />
      <Route path={"/cookie-policy"} component={CookiePolicy} />
      <Route path={"/termini-condizioni"} component={TermsConditions} />
      <Route path={"/test-combobox"} component={TestCombobox} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
