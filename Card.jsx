export function Card({ children, featured = false, glow = false, padding, style, ...rest }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: `1px solid ${featured ? 'var(--gold)' : 'var(--border-card)'}`,
        borderRadius: 'var(--radius-md)',
        padding: padding || 'var(--space-6)',
        boxShadow: glow || featured ? 'var(--glow-gold-soft), var(--shadow-card)' : 'var(--shadow-card)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
