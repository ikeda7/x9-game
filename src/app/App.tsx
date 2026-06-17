import { useGame } from './App.hooks.ts';
import { PhaseRouter } from './App.layout.tsx';

export default function App() {
  const { state, actions } = useGame();
  return <PhaseRouter state={state} actions={actions} />;
}
