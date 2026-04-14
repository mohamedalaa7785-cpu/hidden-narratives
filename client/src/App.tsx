import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Videos from "./pages/Videos";
import ResearchRequest from "./pages/ResearchRequest";
import TasksPage from "./pages/Tasks";
import AssistantPage from "./pages/Assistant";
import DashboardPage from "./pages/Dashboard";
import PricingPage from "./pages/Pricing";
import PaymentPage from "./pages/Payment";
import AdminPage from "./pages/Admin";
import AdminPaymentsPage from "./pages/AdminPayments";
import ContactPage from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="" component={Home} />
      <Route path="/episodes" component={Episodes} />
      <Route path="/episodes/:slug" component={EpisodeDetail} />
      <Route path="/research-request" component={ResearchRequest} />
      <Route path="/tasks" component={TasksPage} />
      <Route path="/assistant" component={AssistantPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/payments" component={AdminPaymentsPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/videos" component={Videos} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/privacy-policy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
