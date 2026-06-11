import * as React from 'react';

/**
 * Circular member/leader avatar. Pass `initials` for a gold-gradient
 * monogram (default) or `src` for a photo. Gold ring + warm shadow.
 */
export interface AvatarProps {
  /** Monogram shown when no `src`. e.g. "JA" */
  initials?: string;
  /** Photo URL — overrides initials. */
  src?: string;
  /** Pixel diameter. @default 56 */
  size?: number;
  /** Override the monogram background (e.g. a CSS gradient). */
  color?: string;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
