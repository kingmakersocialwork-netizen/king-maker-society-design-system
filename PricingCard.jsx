import { Card } from './Card.jsx';
import { Badge } from '../core/Badge.jsx';
import { Button } from '../core/Button.jsx';

export function PricingCard({
  tier,
  price,
  cadence = '/mo',
  features = [],
  cta = 'Join',
  ctaVariant,
  featured = false,
  badge = 'Most Popular',
  href,
  onCta,
}) {
  return (
    <Card
      featured={featured}
      padding="0"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* shimmer top border on featured */}
      {featured && (
        <div
          aria-hidden="true"
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold), transparent)',
            backgroundSize: '200% 100%',
            animation: 'kms-shimmer 2.6s linear infinite',
          }}
        />
      )}
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-label)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.95rem', color: 'var(--off-white)' }}>
            {tier}
          </span>
          {featured && <Badge variant="gold">{badge}</Badge>}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.3em' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.4rem', lineHeight: 0.9, color: 'var(--gold)', letterSpacing: '0.02em' }}>{price}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--muted)', paddingBottom: '0.5rem' }}>{cadence}</span>
        </div>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem', flex: 1 }}>
          {features.map((f, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.7em', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--off-white)' }}>
              <span aria-hidden="true" style={{ color: 'var(--gold)', flexShrink: 0 }}>&#9670;</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={ctaVariant || (featured ? 'gold' : 'outline')}
          href={href}
          onClick={onCta}
          style={{ width: '100%' }}
        >
          {cta}
        </Button>
      </div>
    </Card>
  );
}
