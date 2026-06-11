export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '9px 18px', fontSize: '0.72rem', letterSpacing: '0.16em' },
    md: { padding: '14px 28px', fontSize: '0.82rem', letterSpacing: '0.18em' },
    lg: { padding: '18px 38px', fontSize: '0.95rem', letterSpacing: '0.2em' },
  };

  const variants = {
    // Red — action / commit. Urgency only.
    primary: {
      background: 'var(--red)',
      color: 'var(--off-white)',
      border: '1px solid var(--red)',
    },
    // Gold outline — secondary CTA
    outline: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '1px solid var(--gold)',
    },
    // Solid gold — light-dark surfaces, trials
    gold: {
      background: 'var(--gold)',
      color: 'var(--black)',
      border: '1px solid var(--gold)',
    },
    // Ghost — tertiary, nav
    ghost: {
      background: 'transparent',
      color: 'var(--off-white)',
      border: '1px solid transparent',
    },
  };

  const base = {
    fontFamily: 'var(--font-label)',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6em',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
    ...sizes[size],
    ...variants[variant],
    ...style,
  };

  const hoverMap = {
    primary: { background: 'var(--red-light)', borderColor: 'var(--red-light)' },
    outline: { background: 'rgba(201,168,76,0.1)', color: 'var(--gold-light)', borderColor: 'var(--gold-light)' },
    gold: { background: 'var(--gold-light)', borderColor: 'var(--gold-light)' },
    ghost: { color: 'var(--gold)' },
  };

  const onEnter = (e) => {
    if (disabled) return;
    Object.assign(e.currentTarget.style, hoverMap[variant]);
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const onLeave = (e) => {
    if (disabled) return;
    Object.assign(e.currentTarget.style, variants[variant]);
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type, disabled };

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={base}
      {...rest}
    >
      {children}
    </Tag>
  );
}
