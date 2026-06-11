import * as React from 'react';

/**
 * King Maker Society button. Sharp rectangular shape (radius 4–6px, never a pill),
 * Barlow Condensed uppercase label, subtle lift on hover.
 *
 * Variant rules: `primary` (red) is for action/commit only — Join Now, commit.
 * `outline` (gold) and `gold` (solid) for secondary CTAs and trials. `ghost` for nav.
 *
 * @startingPoint section="Core" subtitle="Primary, outline, gold & ghost buttons" viewport="700x160"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. Red = action only. @default "primary" */
  variant?: 'primary' | 'outline' | 'gold' | 'ghost';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Renders an <a> instead of <button> when set. */
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
