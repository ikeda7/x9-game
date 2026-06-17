import './home.css';

import { Screen } from '../../components/screen/screen.tsx';
import { useHelp } from './home.hooks.ts';
import type { HomeScreenProps } from './home.interface.ts';
import {
  Eyebrow,
  FooterHint,
  HeroBrand,
  HomeActions,
  HowToPlay,
} from './home.layout.tsx';

export default function HomeScreen({ onNew }: HomeScreenProps) {
  const { showHelp, openHelp, closeHelp } = useHelp();

  return (
    <Screen>
      <div className='animate-fade-in home'>
        <Eyebrow />
        <HeroBrand />
        <div className='home__spacer' />
        <HomeActions onNew={onNew} onHelp={openHelp} />
        <FooterHint />
      </div>

      {showHelp && <HowToPlay onClose={closeHelp} />}
    </Screen>
  );
}
