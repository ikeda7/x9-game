import { useState } from 'react';

import { VoteMode } from '../../common/enums/vote-mode.enum';
import { Player } from '../../common/interfaces/player.interface';
import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { Screen } from '../../components/screen/screen';
import { haptic } from '../../game/feedback';

interface Props {
  mode: VoteMode;
  players: Player[];
  onEliminate: (playerId: number) => void;
  onTie: () => void;
  onSkip: () => void;
}

export default function VotingScreen(props: Props) {
  return props.mode === 'secret' ? (
    <SecretVoting {...props} />
  ) : (
    <OpenVoting {...props} />
  );
}

/** Resolve um conjunto de cédulas no desfecho da rodada. */
function resolveBallots(
  alive: Player[],
  ballots: Record<number, number | null>,
  on: Pick<Props, 'onEliminate' | 'onTie' | 'onSkip'>,
) {
  const counts: Record<number, number> = {};
  Object.values(ballots).forEach((id) => {
    if (id != null) counts[id] = (counts[id] ?? 0) + 1;
  });
  const max = Math.max(0, ...alive.map((p) => counts[p.id] ?? 0));
  if (max === 0) return on.onSkip();
  const leaders = alive.filter((p) => (counts[p.id] ?? 0) === max);
  if (leaders.length === 1) on.onEliminate(leaders[0].id);
  else on.onTie();
}

// ============================================================
// VOTAÇÃO ABERTA — o grupo soma os votos juntos
// ============================================================
function OpenVoting({ players, onEliminate, onTie, onSkip }: Props) {
  const alive = players.filter((p) => p.alive);
  const [votes, setVotes] = useState<Record<number, number>>({});

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const remaining = alive.length - total;

  function inc(id: number) {
    if (remaining <= 0) return;
    setVotes((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
  }
  function dec(id: number) {
    setVotes((v) => ({ ...v, [id]: Math.max(0, (v[id] ?? 0) - 1) }));
  }
  function apurar() {
    const max = Math.max(0, ...alive.map((p) => votes[p.id] ?? 0));
    if (max === 0) return onSkip();
    const leaders = alive.filter((p) => (votes[p.id] ?? 0) === max);
    if (leaders.length === 1) onEliminate(leaders[0].id);
    else onTie();
  }

  return (
    <Screen>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '34px 22px 24px',
        }}
      >
        <div className='x9-h1' style={{ textAlign: 'center' }}>
          Quem é o X9?
        </div>
        <p
          className='x9-small'
          style={{
            textAlign: 'center',
            color: 'var(--text-low)',
            marginTop: 6,
          }}
        >
          Toquem no nome pra somar cada voto do grupo.
        </p>

        <div
          style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 'var(--r-pill)',
              border: `1px solid ${remaining > 0 ? 'var(--line-neon)' : 'var(--line-soft)'}`,
              background:
                remaining > 0 ? 'rgba(176,38,255,0.08)' : 'transparent',
            }}
          >
            <Icon
              name='gavel'
              size={14}
              color={
                remaining > 0 ? 'var(--neon-purple-soft)' : 'var(--text-low)'
              }
            />
            <span
              className='x9-label'
              style={{
                color:
                  remaining > 0 ? 'var(--neon-purple-soft)' : 'var(--text-low)',
              }}
            >
              {remaining > 0
                ? `${remaining} voto${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}`
                : 'Todos votaram'}
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {alive.map((p) => {
            const n = votes[p.id] ?? 0;
            const on = n > 0;
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px 10px 14px',
                  borderRadius: 'var(--r-md)',
                  background: on
                    ? 'rgba(176,38,255,0.10)'
                    : 'var(--bg-surface)',
                  border: `1px solid ${on ? 'var(--line-neon)' : 'var(--line-soft)'}`,
                }}
              >
                <button
                  onClick={() => inc(p.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'transparent',
                    border: 'none',
                    cursor: remaining > 0 ? 'pointer' : 'not-allowed',
                    textAlign: 'left',
                    padding: '4px 0',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: on
                        ? 'var(--neon-purple)'
                        : 'rgba(255,255,255,0.05)',
                      color: on ? 'var(--text-on-neon)' : 'var(--text-mid)',
                    }}
                  >
                    <Icon name='user' size={17} />
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      color: 'var(--text-hi)',
                    }}
                  >
                    {p.name}
                  </span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => dec(p.id)}
                    disabled={n === 0}
                    style={stepBtn(n === 0, false)}
                  >
                    <Icon name='minus' size={14} />
                  </button>
                  <span
                    style={{
                      minWidth: 20,
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 20,
                      color: on ? 'var(--neon-purple-soft)' : 'var(--text-low)',
                    }}
                  >
                    {n}
                  </span>
                  <button
                    onClick={() => inc(p.id)}
                    disabled={remaining <= 0}
                    style={stepBtn(remaining <= 0, true)}
                  >
                    <Icon name='plus' size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Button
            variant='danger'
            icon='gavel'
            disabled={total === 0}
            onClick={apurar}
          >
            Apurar Votos
          </Button>
          <Button variant='quiet' size='md' onClick={onSkip}>
            Pular votação (ninguém sai)
          </Button>
        </div>
      </div>
    </Screen>
  );
}

function stepBtn(disabled: boolean, accent: boolean) {
  return {
    width: 30,
    height: 30,
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 9,
    border: `1px solid ${disabled ? 'var(--line-soft)' : accent ? 'var(--line-neon)' : 'var(--line-soft)'}`,
    background: disabled
      ? 'transparent'
      : accent
        ? 'rgba(176,38,255,0.12)'
        : 'var(--bg-elevated)',
    color: disabled ? 'var(--text-low)' : 'var(--neon-purple-soft)',
    cursor: disabled ? ('not-allowed' as const) : ('pointer' as const),
  };
}

// ============================================================
// VOTAÇÃO SECRETA — cada um vota escondido, passando o celular
// ============================================================
function SecretVoting({ players, onEliminate, onTie, onSkip }: Props) {
  const alive = players.filter((p) => p.alive);
  const [voterIndex, setVoterIndex] = useState(0);
  const [step, setStep] = useState<'pass' | 'ballot'>('pass');
  const [selected, setSelected] = useState<number | null>(null);
  const [ballots, setBallots] = useState<Record<number, number | null>>({});

  const voter = alive[voterIndex];
  const isLast = voterIndex === alive.length - 1;
  const suspects = alive.filter((p) => p.id !== voter.id);

  function commit(choice: number | null) {
    const next = { ...ballots, [voter.id]: choice };
    if (isLast) {
      resolveBallots(alive, next, { onEliminate, onTie, onSkip });
    } else {
      setBallots(next);
      setVoterIndex((i) => i + 1);
      setSelected(null);
      setStep('pass');
    }
  }

  // ---- passe o celular ----
  if (step === 'pass') {
    return (
      <Screen dark>
        <div
          className='animate-fade-in'
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 30px',
            textAlign: 'center',
          }}
        >
          <div
            className='x9-mono'
            style={{ color: 'var(--text-low)', fontSize: 13 }}
          >
            {String(voterIndex + 1).padStart(2, '0')} /{' '}
            {String(alive.length).padStart(2, '0')}
          </div>
          <div
            className='x9-label'
            style={{ marginTop: 26, color: 'var(--text-low)' }}
          >
            Voto secreto · passe para
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 44,
              lineHeight: 1.05,
              color: 'var(--text-hi)',
              textShadow: '0 0 26px rgba(176,38,255,0.45)',
            }}
          >
            {voter.name}
          </div>
          <p
            className='x9-small'
            style={{ marginTop: 16, color: 'var(--text-low)', maxWidth: 250 }}
          >
            Que ninguém veja seu voto. Quando estiver com {voter.name}, toque
            para votar.
          </p>
          <div style={{ marginTop: 36, width: '100%', maxWidth: 320 }}>
            <Button
              variant='primary'
              icon='eye-off'
              onClick={() => {
                haptic(20);
                setStep('ballot');
              }}
            >
              Votar em segredo
            </Button>
          </div>
        </div>
      </Screen>
    );
  }

  // ---- cédula ----
  return (
    <Screen dark>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '34px 22px 24px',
        }}
      >
        <div
          className='x9-label'
          style={{ textAlign: 'center', color: 'var(--text-low)' }}
        >
          Voto de {voter.name}
        </div>
        <div className='x9-h2' style={{ textAlign: 'center', marginTop: 8 }}>
          Quem é o X9?
        </div>

        <div
          style={{
            marginTop: 20,
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 11,
          }}
        >
          {suspects.map((p) => {
            const on = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: '15px 16px',
                  borderRadius: 'var(--r-md)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: on
                    ? 'rgba(176,38,255,0.12)'
                    : 'var(--bg-surface)',
                  border: `1.5px solid ${on ? 'var(--neon-purple)' : 'var(--line-soft)'}`,
                  boxShadow: on ? 'var(--glow-purple-sm)' : 'none',
                  transition: 'all .15s ease',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: on
                      ? 'var(--neon-purple)'
                      : 'rgba(255,255,255,0.05)',
                    color: on ? 'var(--text-on-neon)' : 'var(--text-mid)',
                  }}
                >
                  <Icon name='user' size={17} />
                </span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: 'var(--text-hi)',
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${on ? 'var(--neon-purple)' : 'var(--line-soft)'}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: on ? 'var(--neon-purple)' : 'transparent',
                  }}
                >
                  {on && (
                    <Icon name='check' size={13} color='var(--text-on-neon)' />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <Button
            variant='primary'
            icon={isLast ? 'gavel' : 'arrow-right'}
            disabled={selected === null}
            onClick={() => commit(selected)}
          >
            {isLast ? 'Votar e apurar' : 'Confirmar e passar'}
          </Button>
          <Button variant='quiet' size='md' onClick={() => commit(null)}>
            Anular meu voto
          </Button>
        </div>
      </div>
    </Screen>
  );
}
