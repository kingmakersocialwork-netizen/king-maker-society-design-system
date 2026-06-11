export function Eyebrow({ children, color = 'gold', style, ...rest }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-label)',
        fontWeight: 600,
        fontSize: '0.8rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: color === 'gold' ? 'var(--gold)' : 'var(--muted)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.7em',
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{ width: '28px', height: '1px', background: 'var(--gold)', opacity: 0.55, display: 'inline-block' }}
      />
      {children}
    </span>
  );
}
