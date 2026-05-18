import React, { useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import WelcomePage from './pages/WelcomePage';
import SignupPage from './pages/SignupPage';
import ChildProfilePage from './pages/ChildProfilePage';
import DashboardPage from './pages/DashboardPage';
import Module1DiscriminationPage from './pages/Module1DiscriminationPage';
import Module2SpatialPage from './pages/Module2SpatialPage';
import Module3MemoryPage from './pages/Module3MemoryPage';
import Module4SequencePage from './pages/Module4SequencePage';
import Module5ClosurePage from './pages/Module5ClosurePage';
import Module6MotorPage from './pages/Module6MotorPage';
import Module7FigureGroundPage from './pages/Module7FigureGroundPage';
import Module8ConstancyPage from './pages/Module8ConstancyPage';

type Page = 'splash' | 'welcome' | 'signup' | 'child-profile' | 'dashboard' | 'module1' | 'module2' | 'module3' | 'module4' | 'module5' | 'module6' | 'module7' | 'module8';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');

  const renderPage = () => {
    switch (currentPage) {
      case 'splash':
        return <SplashScreen />;
      case 'welcome':
        return <WelcomePage />;
      case 'signup':
        return <SignupPage />;
      case 'child-profile':
        return <ChildProfilePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'module1':
        return <Module1DiscriminationPage />;
      case 'module2':
        return <Module2SpatialPage />;
      case 'module3':
        return <Module3MemoryPage />;
      case 'module4':
        return <Module4SequencePage />;
      case 'module5':
        return <Module5ClosurePage />;
      case 'module6':
        return <Module6MotorPage />;
      case 'module7':
        return <Module7FigureGroundPage />;
      case 'module8':
        return <Module8ConstancyPage />;
      default:
        return <SplashScreen />;
    }
  };

  return <div>{renderPage()}</div>;
}
