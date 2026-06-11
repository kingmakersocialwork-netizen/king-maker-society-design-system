Membership-tier card — price, feature list, CTA. Mark one `featured` for the gold-shimmer "Most Popular" treatment.

```jsx
<PricingCard tier="Basic" price="$30" features={["24/7 chat", "2x Master Classes weekly"]} cta="Join Basic" />
<PricingCard tier="VIO Access" price="$100" featured features={["Everything in Basic", "Monthly 1-on-1 Mini-Audit"]} cta="Join VIO" />
```

Needs `@keyframes kms-shimmer { to { background-position: -200% 0; } }` defined on the host page.
