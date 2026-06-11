import * as React from 'react';

/**
 * Membership-tier pricing card. Composes Card + Badge + Button. The
 * `featured` tier gets a full gold border, "Most Popular" badge and an
 * animated gold shimmer along its top edge.
 *
 * Requires the keyframe `@keyframes kms-shimmer { to { background-position: -200% 0 } }`
 * in the host page (defined in the UI kit / card host).
 */
export interface PricingCardProps {
  /** Tier name, e.g. "Basic", "VIO Access", "Elite". */
  tier: string;
  /** Price string incl. symbol, e.g. "$30". */
  price: string;
  /** @default "/mo" */
  cadence?: string;
  features: string[];
  /** @default "Join" */
  cta?: string;
  ctaVariant?: 'primary' | 'outline' | 'gold' | 'ghost';
  featured?: boolean;
  /** @default "Most Popular" */
  badge?: string;
  href?: string;
  onCta?: (e: React.MouseEvent) => void;
}

export function PricingCard(props: PricingCardProps): JSX.Element;
