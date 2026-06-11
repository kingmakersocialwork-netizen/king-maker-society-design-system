export function Avatar({ initials, src, size = 56, color, style, ...rest }) {
  const fontSize = size * 0.36;
  const ring = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    border: '1px solid var(--border-strong)',
    boxShadow: '0 6px 18px -8px rgba(138,95,16,0.6)',
    ...style,
  };

  if (src) {
    return (
      <span style={ring} {...rest}>
        <img src={src} alt={initials || ''} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </span>
    );
  }

  return (
    <span
      style={{
        ...ring,
        background: color || 'linear-gradient(150deg, var(--gold-light), var(--gold-deep))',
        fontFamily: 'var(--font-display)',
        fontSize,
        letterSpacing: '0.04em',
        color: 'var(--black)',
      }}
      {...rest}
    >
      {initials}
    </span>
  );
}
