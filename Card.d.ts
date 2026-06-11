import * as React from 'react';

/**
 * The base surface — charcoal panel with an 18%-gold hairline border and
 * deep shadow. Every pillar, class card, feature box and panel sits on this.
 *
 * @startingPoint section="Surfaces" subtitle="Charcoal panel with gold hairline" viewport="700x260"
 */
export interface CardProps {
  children: React.ReactNode;
  /** Full gold border + soft glow (e.g. featured pricing tier). */
  featured?: boolean;
  /** Adds the soft gold glow without the full border. */
  glow?: boolean;
  /** Override default padding (var(--space-6)). */
  padding?: string;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
