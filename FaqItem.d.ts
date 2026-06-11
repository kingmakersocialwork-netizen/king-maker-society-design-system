import * as React from 'react';

/**
 * Accordion FAQ row — gold rotating "+" toggle, smooth grid-rows expand,
 * question turns gold when open. Stack several inside a container.
 */
export interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

export function FaqItem(props: FaqItemProps): JSX.Element;
