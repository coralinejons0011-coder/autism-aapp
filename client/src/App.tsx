import { TooltipProvider } from "@/components/ui/tooltip";
// import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import { SidebarProvider } from "./components/ui/sidebar";
import Home from "./pages/Home";
import ShapeMatchingPage from "./pages/ShapeMatchingPage";
import EmotionsPage from "./pages/EmotionsPage";
import SchedulePage from "./pages/SchedulePage";
import ProgressPage from "./pages/ProgressPage";
import ParentDashboardPage from "./pages/ParentDashboardPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChildProfilePage from "./pages/ChildProfilePage";
import SpatialPage from "./pages/SpatialPage";
import MemoryPage from "./pages/MemoryPage";
import SequencePage from "./pages/SequencePage";
import ClosurePage from "./pages/ClosurePage";
import MotorPage from "./pages/MotorPage";
import FigureGroundPage from "./pages/FigureGroundPage";
import FormConstancyPage from "./pages/FormConstancyPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/welcome" component={WelcomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/child-profile" component={ChildProfilePage} />
      <Route path="/dashboard" component={Home} />
      <Route path="/shape-matching" component={ShapeMatchingPage} />
      <Route path="/spatial" component={SpatialPage} />
      <Route path="/memory" component={MemoryPage} />
      <Route path="/sequence" component={SequencePage} />
      <Route path="/closure" component={ClosurePage} />
      <Route path="/motor" component={MotorPage} />
      <Route path="/figure-ground" component={FigureGroundPage} />
      <Route path="/form-constancy" component={FormConstancyPage} />
      <Route path="/emotions" component={EmotionsPage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/progress" component={ProgressPage} />
      <Route path="/parent-dashboard" component={ParentDashboardPage} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProgressProvider>
          <SidebarProvider>
            <ThemeProvider defaultTheme="light">
              <TooltipProvider>
                <Router />
                {/* <Toaster /> */}
              </TooltipProvider>
            </ThemeProvider>
          </SidebarProvider>
        </ProgressProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
