# Gojira Holdings Website Specification

> **Version:** 1.0  
> **Last Updated:** January 2026  
> **For:** Cursor AI / Development Reference

---

## 1. Project Overview

Gojira Holdings is a blockchain infrastructure and investment firm. This site serves two audiences:
1. **Stakers** — SOL holders looking to delegate to a reliable validator
2. **Founders/Projects** — Web3 teams seeking investment or partnership

**Primary Goal:** Increase validator stake through a professional, trust-building web presence.

---

## 2. Brand Identity

### 2.1 Color Palette

```css
:root {
  --gojira-red: #E31837;        /* Primary - CTAs, accents, highlights */
  --background-dark: #2D2D2D;   /* Primary background */
  --background-darker: #1A1A1A; /* Cards, secondary backgrounds */
  --text-primary: #FFFFFF;      /* Headings, primary text */
  --text-muted: #9CA3AF;        /* Body text, secondary text */
  --border-subtle: #3D3D3D;     /* Card borders, dividers */
}
```

### 2.2 Typography

- **Primary Font:** Inter (fallback: system sans-serif, Arial)
- **Headings:** Bold, clean
- **Logo Lockup:** "GOJIRA" in red (#E31837) + "HOLDINGS" in white
- **Decorative:** Japanese katakana ゴジラ used as accent element

### 2.3 Logo Assets

| Asset | Usage |
|-------|-------|
| G mark (red) | Favicon, nav, hero |
| Full lockup | Header, footer |
| "GOJIRA STAKE" | Validator-specific contexts |
| Godzilla silhouette | Background/hero decorative element |

### 2.4 Visual Style

- **Tone:** Bold, powerful, premium — "King of the Nodes"
- **Theme:** Dark mode only
- **Cards:** Dark background (#1A1A1A) with subtle border, red top-border accent on key elements
- **CTAs:** Solid red buttons (#E31837) with white text
- **Secondary CTAs:** Ghost/outline buttons with gray border

---

## 3. Site Structure

```
/ (main page - single page with scroll sections)
├── #hero
├── #portfolio
├── #staking
├── #about
└── Footer

/validator (separate page)
└── Validator details + staking widget
```

### 3.1 Navigation

**Sticky top navbar:**

```
[G Logo]                    [HOME] [PORTFOLIO] [VALIDATOR] [ABOUT]  [STAKE NOW]
                            scroll  scroll      /validator   scroll   red CTA
```

- Logo → scrolls to top
- HOME, PORTFOLIO, ABOUT → smooth scroll to section anchors
- VALIDATOR → navigates to `/validator` route
- STAKE NOW → opens staking widget or scrolls to staking section

**Mobile:** Hamburger menu with same navigation items

---

## 4. Page Sections (Main Page)

### 4.1 Hero Section

**Purpose:** Immediate value proposition + primary conversion

**Layout:**
```
                    [G Logo Mark]
                    
        Pushing the Limits of Web3 Innovation
                    (red underline on "Web3 Innovation")

   Gojira Holdings operates at the forefront of blockchain—
   powering Solana with our top-performing validator and 
   investing in the next generation of Web3 innovation.

        [Stake With Us]  [Explore Validator →]
            (red)            (ghost)

────────────────────────────────────────────────────────
   $XX,XXX,XXX          X.X%           XXX.X%
   TOTAL ASSETS         APY         UPTIME (30D)
      STAKED
```

**Background:** Large Godzilla silhouette (subtle, right-aligned, 20-30% opacity)

**⚠️ CRITICAL — Stats must be LIVE data:**
```typescript
// Required live data points for hero stats
interface HeroStats {
  totalStaked: number;      // In USD - fetch from validator + SOL price
  apy: number;              // Current APY from validator/staking API
  uptime30d: number;        // 30-day uptime percentage
}
```

### 4.2 Portfolio Section

**Purpose:** Showcase investments

**Layout:**
```
              ┌─────────────────┐
              │ OUR INVESTMENTS │  (red badge)
              └─────────────────┘
              
              Strategic Portfolio
                    ("Portfolio" in red)

   We've strategically invested in the most promising projects 
   across the blockchain ecosystem...

   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
   │  Logo   │  │  Logo   │  │  Logo   │  │  Logo   │
   │   1     │  │   2     │  │   3     │  │   4     │
   └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

**Portfolio Grid:**
- 4 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Dark cards with subtle hover lift effect
- Logos should be provided as assets

### 4.3 Staking Section

**Purpose:** Primary conversion for stakers

**Layout:**
```
              ┌──────────────────┐
              │ STAKING MADE     │  (red badge)
              │ SIMPLE           │
              └──────────────────┘
              
         Stake With the King of Nodes
                ("King of Nodes" in red)

   Join those who trust our validator infrastructure...

   ┌─────────────────────────────────────┐
   │ ═══════════════════════════════════ │ ← red top border
   │                                     │
   │  Stake Solana              X.XX% APY│ ← LIVE
   │                                     │
   │  ┌─────────┐  ┌──────────┐         │
   │  │  Stake  │  │ Unstake  │         │
   │  └─────────┘  └──────────┘         │
   │                                     │
   │  You're Staking        [HALF] [MAX]│
   │  ┌─────────────────────────────┐   │
   │  │ [SOL icon]  SOL        0.0  │   │
   │  └─────────────────────────────┘   │
   │                                     │
   │  ┌─────────────────────────────┐   │
   │  │      Connect Wallet         │   │ ← red button
   │  └─────────────────────────────┘   │
   │                                     │
   │  Disclaimer                         │ ← red link
   │  Available Balance      X.XXXX SOL │ ← LIVE
   │  Next Epoch      MM/DD/YYYY, HH:MM │ ← LIVE
   └─────────────────────────────────────┘
```

**⚠️ CRITICAL — All staking data must be LIVE:**
```typescript
interface StakingWidgetData {
  apy: number;                    // Current APY
  availableBalance: number;       // User's SOL balance (after wallet connect)
  nextEpoch: Date;                // Calculated from Solana epoch schedule
}
```

### 4.4 About Section

**Purpose:** Build trust, communicate values

**Layout:**
```
              ┌──────────────┐
              │ ABOUT GOJIRA │  (red badge)
              └──────────────┘
              
          Leading the Web3 Revolution
               ("Web3 Revolution" in red)

   Gojira Holdings was founded to be at the forefront of web3 
   innovation. We operate our flagship validator — Gojira, the 
   "King of the Nodes" — while strategically investing in 
   promising projects across the ecosystem.

   ┌─────────────────────────────┐
   │  Our Values                 │    ┌────────────────┐
   │                             │    │ Stake With Us →│
   │  • Technical Excellence     │    └────────────────┘
   │    and Reliability          │         (red CTA)
   │  • Transparency and         │
   │    Community Focus          │
   │  • Strategic Web3           │
   │    Investments              │
   └─────────────────────────────┘
   (card with subtle Godzilla silhouette bg)
```

### 4.5 Footer

**Layout:**
```
────────────────────────────────────────────────────────────

[G] GOJIRA HOLDINGS        Navigation          Resources
    ═══                    Staking             Terms of Service
    (red underline)        Validator           Privacy Policy
                           Portfolio           Contact
                           About

────────────────────────────────────────────────────────────
© 2026 Gojira Holdings.              King of the Nodes  Stake Now →
All rights reserved.                                    (red link)
```

---

## 5. Validator Page (`/validator`)

**Purpose:** Dedicated validator details + staking

**Layout:**
```
[Standard Navbar]

Validator Details

Our validator infrastructure is meticulously engineered to achieve 
maximum uptime, security, and performance...

┌─────────────────────────────┐  ┌─────────────────────────────┐
│ ═══════════════════════════ │  │ ═══════════════════════════ │
│                         [G] │  │                             │
│ Validator Details           │  │ Stake Solana      X.XX% APY │
│                             │  │                             │
│ Identity     gojir4Wn... 📋 │  │ [Stake] [Unstake]          │
│ Vote Account goJiRADN... 📋 │  │                             │
│ Commission   X%             │  │ You're Staking   [HALF][MAX]│
│ APY          X.X%           │  │ ┌─────────────────────────┐ │
│ Uptime (30d) XXX.X%         │  │ │ [SOL]  SOL         0.0 │ │
│ Status       ● Active       │  │ └─────────────────────────┘ │
│                             │  │                             │
└─────────────────────────────┘  │ [Connect Wallet]            │
                                 │                             │
                                 │ Disclaimer                  │
                                 │ Available Balance  X.XX SOL │
                                 │ Next Epoch  MM/DD, HH:MM:SS │
                                 └─────────────────────────────┘

[Footer]
```

**⚠️ CRITICAL — All validator data must be LIVE:**
```typescript
interface ValidatorData {
  identity: string;           // Full validator identity pubkey
  voteAccount: string;        // Full vote account pubkey
  commission: number;         // Commission percentage
  apy: number;                // Current APY
  uptime30d: number;          // 30-day uptime percentage
  status: 'Active' | 'Inactive' | 'Delinquent';
  totalStake: number;         // Total SOL staked
}
```

---

## 6. Live Data Requirements

### ⚠️ NO HARDCODED VALUES

The following data points **MUST** be fetched live. Do not hardcode any of these values:

| Data Point | Source | Refresh Rate |
|------------|--------|--------------|
| Total Stake (SOL) | Solana RPC / Validator API | 30-60 seconds |
| Total Stake (USD) | Stake × SOL Price | 30-60 seconds |
| SOL Price | Price API (CoinGecko, Jupiter, etc.) | 30-60 seconds |
| APY | Staking rewards API / calculated | 5 minutes |
| Uptime (30d) | Validator monitoring service | 5 minutes |
| Commission | Validator on-chain data | On page load |
| Next Epoch | Solana epoch schedule | 1 minute |
| User Balance | Wallet adapter | On connect + after tx |
| Validator Status | Solana RPC | 1 minute |

### Suggested Data Sources

```typescript
// Solana RPC
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Validator info
const voteAccounts = await connection.getVoteAccounts();
const validatorInfo = voteAccounts.current.find(v => v.votePubkey === VOTE_ACCOUNT);

// Epoch info (for next epoch countdown)
const epochInfo = await connection.getEpochInfo();
const epochSchedule = await connection.getEpochSchedule();

// SOL price - use Jupiter, CoinGecko, or similar
const solPrice = await fetch('https://price.jup.ag/v4/price?ids=SOL');

// For detailed validator stats, consider:
// - Stakewiz API
// - Validators.app API  
// - Custom indexer
```

### Data Fetching Pattern

```typescript
// Example: React Query pattern for live data
function useValidatorStats() {
  return useQuery({
    queryKey: ['validator-stats'],
    queryFn: fetchValidatorStats,
    refetchInterval: 30_000,  // 30 seconds
    staleTime: 15_000,        // Consider stale after 15s
  });
}

function useEpochCountdown() {
  return useQuery({
    queryKey: ['epoch-info'],
    queryFn: fetchEpochInfo,
    refetchInterval: 60_000,  // 1 minute
  });
}
```

---

## 7. Functional Requirements

### 7.1 Wallet Integration

```typescript
// Use @solana/wallet-adapter-react
import { 
  ConnectionProvider, 
  WalletProvider,
  useWallet 
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// Supported wallets
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  // Add: Backpack, Glow, etc.
];
```

**Wallet UX:**
- "Connect Wallet" → Opens wallet selection modal
- Connected state → Show truncated address (e.g., `GoJi...xYz4`)
- Show SOL balance after connection
- Persist connection across page refreshes

### 7.2 Staking Functionality

**Stake Flow:**
1. User enters SOL amount
2. Validate: amount > 0, amount <= balance, amount >= min stake
3. Create stake account instruction
4. Delegate to Gojira validator
5. Send transaction, await confirmation
6. Show success/error feedback
7. Refresh balance

**Unstake Flow:**
1. User selects stake account (if multiple)
2. Deactivate stake instruction
3. Send transaction, await confirmation
4. Show cooldown period info (~2-3 days)
5. Refresh data

```typescript
// Validator addresses (CONFIRM THESE)
const GOJIRA_VOTE_ACCOUNT = 'goJiRADNdmfnJ4iWEyft7KaYM...'; // Get full address
const GOJIRA_IDENTITY = 'gojir4WnhS7VS1JdbnanJMzaM...';     // Get full address
```

### 7.3 Smooth Scroll Navigation

```typescript
// Next.js example
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
};

// Intersection Observer for active section highlighting
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    // Observe all sections
    ['hero', 'portfolio', 'staking', 'about'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return activeSection;
};
```

---

## 8. Technical Stack

### Recommended

```json
{
  "framework": "Next.js 14+ (App Router)",
  "styling": "Tailwind CSS",
  "wallet": "@solana/wallet-adapter-react",
  "solana": "@solana/web3.js",
  "data-fetching": "TanStack Query (React Query)",
  "animations": "Framer Motion (optional)",
  "icons": "Lucide React",
  "hosting": "Vercel"
}
```

### Project Structure

```
/app
  /layout.tsx          # Root layout with providers
  /page.tsx            # Main page (hero, portfolio, staking, about)
  /validator
    /page.tsx          # Validator details page
/components
  /ui                  # Reusable UI components
  /navbar.tsx
  /footer.tsx
  /hero.tsx
  /portfolio.tsx
  /staking-widget.tsx
  /validator-details.tsx
  /stats-bar.tsx
/hooks
  /use-validator-stats.ts
  /use-epoch-countdown.ts
  /use-sol-price.ts
/lib
  /solana.ts           # Solana connection, helpers
  /constants.ts        # Validator addresses, etc.
/public
  /images              # Logos, assets
```

### Performance Targets

- **LCP:** < 2.5 seconds
- **FID:** < 100ms
- **CLS:** < 0.1
- **Bundle Size:** < 200kb (initial JS)

### Responsive Breakpoints

```css
/* Tailwind defaults */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

---

## 9. Required Assets

**From Client:**
- [ ] G logo mark (SVG + PNG)
- [ ] Full logo lockup (SVG + PNG)
- [ ] Godzilla silhouette for backgrounds (SVG)
- [ ] Portfolio company logos (PNG/SVG, consistent sizing)
- [ ] Full validator identity address
- [ ] Full vote account address
- [ ] Confirm commission rate (screenshots show 0%, client mentioned 5%)

**To Create:**
- [ ] Favicon (from G mark)
- [ ] OG image for social sharing
- [ ] Apple touch icons

---

## 10. Content Needed

- [ ] Terms of Service (full legal copy)
- [ ] Privacy Policy (full legal copy)
- [ ] Staking disclaimer text
- [ ] Contact method/information
- [ ] Portfolio project details (if adding descriptions)

---

## 11. Deliverables Checklist

### Pages
- [ ] Main page with all sections (Hero, Portfolio, Staking, About)
- [ ] Validator page (`/validator`)
- [ ] Terms of Service page
- [ ] Privacy Policy page

### Functionality
- [ ] Wallet connection (Phantom, Solflare, Backpack minimum)
- [ ] Stake SOL functionality
- [ ] Unstake SOL functionality
- [ ] Live data integration (NO hardcoded values)
- [ ] Smooth scroll navigation
- [ ] Active section highlighting in nav

### Design
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] Dark theme matching brand
- [ ] Hover states on interactive elements
- [ ] Loading states for data fetching
- [ ] Error states for failed data/transactions

### Technical
- [ ] SEO meta tags
- [ ] OG tags for social sharing
- [ ] Favicon
- [ ] Performance optimized (images, bundle)
- [ ] Deployed and accessible

---

## 12. Notes & Clarifications Needed

1. **Commission Rate:** Screenshots show 0% but client mentioned 5% — confirm correct value
2. **Portfolio Projects:** Need full list of portfolio companies with logos and optional URLs
3. **Validator Addresses:** Need full pubkeys for identity and vote account
4. **Contact Method:** Email? Form? Discord? Twitter DM?
5. **Analytics:** Add Plausible, Fathom, or Google Analytics?

---

## Quick Reference: Validator Info

```typescript
// TODO: Replace with actual values
export const VALIDATOR_CONFIG = {
  name: 'Gojira',
  identity: 'gojir4WnhS7VS1JdbnanJMzaM___FULL_ADDRESS___',
  voteAccount: 'goJiRADNdmfnJ4iWEyft7KaYM___FULL_ADDRESS___',
  commission: 5, // CONFIRM: 0% or 5%?
  website: 'https://gojira.holdings', // or whatever domain
};
```

---

*End of Specification*
