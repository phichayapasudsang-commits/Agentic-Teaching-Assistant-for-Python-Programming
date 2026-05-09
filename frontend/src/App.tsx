
import { MainLayout } from './components/layout/MainLayout';
import { WelcomeHero } from './components/views/WelcomeHero';
import { WorkspaceGrid } from './components/views/WorkspaceGrid';
import { useLearningStore } from './store/useLearningStore';

function App() {
  const currentTopic = useLearningStore(state => state.currentTopic);

  return (
    <MainLayout>
      {currentTopic ? <WorkspaceGrid /> : <WelcomeHero />}
    </MainLayout>
  );
}

export default App;