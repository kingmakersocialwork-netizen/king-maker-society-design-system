import * as React from 'react';

export function FaqItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid var(--border-card)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 'var(--space-5) 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          textAlign: 'left',
          color: 'var(--off-white)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: open ? 'var(--gold)' : 'var(--off-white)', transition: 'color var(--dur-fast) var(--ease-out)' }}>
          {question}
        </span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: '26px',
            height: '26px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)',
            fontSize: '1.1rem',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform var(--dur-med) var(--ease-out)',
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows var(--dur-med) var(--ease-out)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, padding: '0 2.5rem var(--space-5) 0', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.75, color: 'var(--muted)' }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
