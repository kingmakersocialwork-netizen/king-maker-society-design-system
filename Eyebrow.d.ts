import * as React from 'react';

/**
 * Section eyebrow / kicker — the small uppercase label that sits above
 * every headline ("What You Get", "Live Master Classes"). Includes a
 * short gold rule before the text.
 */
export interface EyebrowProps {
  children: React.ReactNode;
  /** @default "gold" */
  color?: 'gold' | 'muted';
  style?: React.CSSProperties;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
