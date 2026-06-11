export function Badge({ children, variant = 'gold', style, ...rest }) {
  const variants = {
    gold: { background: 'var(--gold)', color: 'var(--black)', border: '1px solid var(--gold)' },
    outline: { background: 'transparent', color: 'var(--gold)', border: '1px solid var(--border-strong)' },
    red: { background: 'var(--red)', color: 'var(--off-white)', border: '1px solid var(--red)' },
    ghost: { background: 'rgba(201,168,76,0.08)', color: 'var(--gold-light)', border: '1px solid var(--border)' },
  };

  return (
    <span
      style={{
        fontFamily: 'var(--font-label)',
        fontWeight: 700,
        fontSize: '0.68rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '5px 11px',
        borderRadius: 'var(--radius-sm)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
