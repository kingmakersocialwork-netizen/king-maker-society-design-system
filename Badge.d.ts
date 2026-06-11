import * as React from 'react';

/**
 * Small uppercase tag — day badges (WEEKDAY 2PM CST), "Most Popular",
 * status pills. Sharp corners, Barlow Condensed.
 */
export interface BadgeProps {
  children: React.ReactNode;
  /** @default "gold" */
  variant?: 'gold' | 'outline' | 'red' | 'ghost';
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
