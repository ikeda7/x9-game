import './setup.css';

import { CATEGORIES } from '../../common/data/words.ts';
import { Screen } from '../../components/screen/screen.tsx';
import { useSetupForm } from './setup.hooks.ts';
import type { SetupScreenProps } from './setup.interface.ts';
import {
  AdvancedModeToggle,
  CategoryPicker,
  DurationPicker,
  ImpostorStepper,
  PlayerCountPill,
  PlayerInput,
  PlayerRow,
  SetupFooter,
  SetupHeader,
  VoteModePicker,
} from './setup.layout.tsx';

export default function SetupScreen({ onStart, onBack }: SetupScreenProps) {
  const form = useSetupForm(onStart);

  return (
    <Screen>
      <SetupHeader onBack={onBack} />

      <div className='setup-scroll'>
        <PlayerCountPill
          enough={form.enough}
          count={form.players.length}
          min={3}
        />

        <div className='setup-player-list'>
          {form.players.map((p, i) => (
            <PlayerRow
              key={p.id}
              player={p}
              index={i}
              onRemove={() => form.remove(p.id)}
            />
          ))}
        </div>

        <PlayerInput
          name={form.name}
          onNameChange={form.setName}
          onAdd={form.add}
        />

        <div className='x9-label setup-section-label'>Configurações</div>

        <ImpostorStepper
          impostors={form.impostors}
          cap={form.cap}
          onChange={form.setImpostors}
        />

        <DurationPicker duration={form.duration} onSelect={form.setDuration} />

        <VoteModePicker voteMode={form.voteMode} onSelect={form.setVoteMode} />

        <CategoryPicker
          categories={form.categories}
          allCategories={CATEGORIES}
          onToggle={form.toggleCategory}
        />

        <AdvancedModeToggle
          hintMode={form.hintMode}
          onToggle={form.toggleHintMode}
        />
      </div>

      <SetupFooter canStart={form.canStart} onStart={form.start} />
    </Screen>
  );
}
