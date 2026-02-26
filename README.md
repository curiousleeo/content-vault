# The Content Vault

A curated collection of marketing wisdom and vibe coding insights. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Two Sections**: Marketing and Vibe Coding — each with their own categories
- **Tweets + Reels**: Store both X/Twitter tweets and Instagram reels
- **Category Filtering**: Filter by topic within each section
- **Search**: Search across content, authors, and categories
- **Sorting**: Sort by date or upvotes
- **Upvoting**: Community upvoting with localStorage persistence
- **Add Content**: Paste a tweet URL (auto-fetched) or manually add an Instagram reel
- **Share Cards**: Download/share tweet cards as images
- **Dark Theme**: Dark design with lime green (#d4ff00) accents
- **Contributor Credits**: Attribution for community submissions

## Sections & Categories

### 📢 Marketing
- Content Strategy
- Personal Branding
- Community Building
- Web3 Marketing
- Copywriting
- Growth

### ⚡ Vibe Coding
- AI Tools & Stacks
- Prompting Tips
- Workflow / Productivity
- Project Ideas

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd "Personal/marketing tweets repo"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Content

Use the **Add Content** button in the app. A modal lets you:
- **Tweet**: Paste an X/Twitter URL — author and text are fetched automatically
- **Reel**: Paste an Instagram reel URL and fill in author/caption manually

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── content/         # GET/POST content items
│   │   ├── contributors/    # GET contributors
│   │   ├── fetch-tweet/     # Twitter oEmbed fetcher
│   │   └── upvote/          # Upvote handler
│   ├── card/[tweetId]/      # Tweet share card page + OG image
│   ├── globals.css
│   ├── layout.tsx
│   ├── opengraph-image.tsx  # Site-level OG image
│   └── page.tsx             # Main page
├── components/
│   ├── AddContentModal.tsx  # Add tweet/reel modal
│   ├── AuthorsShowcase.tsx  # Featured authors grid
│   ├── ContentCard.tsx      # Tweet/reel card (platform-aware)
│   ├── Contributors.tsx     # Contributors grid
│   ├── FilterBar.tsx        # Category filter buttons
│   ├── Header.tsx           # Page header + stats
│   ├── PlatformToggle.tsx   # All / Tweets / Reels toggle
│   ├── SearchBar.tsx        # Search input
│   ├── SortDropdown.tsx     # Sort options dropdown
│   └── TabSwitcher.tsx      # Marketing / Vibe Coding tabs
├── data/
│   ├── contributors.json    # Contributor records
│   ├── marketing.json       # Marketing content (dev fallback)
│   └── vibe-coding.json     # Vibe coding content (dev fallback)
└── types/
    └── index.ts             # TypeScript interfaces
```

## Deployment on Vercel

1. Push to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add Upstash Redis KV via the Vercel integration
4. Deploy

### Environment Variables

| Variable | Description |
|----------|-------------|
| `KV_REST_API_URL` | Upstash Redis URL (set by Vercel KV integration) |
| `KV_REST_API_TOKEN` | Upstash Redis token (set by Vercel KV integration) |

In development, the app reads and writes directly to the JSON files in `src/data/`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Upstash Redis (prod) / JSON files (dev)
- **Font**: Inter (Google Fonts)

## License

MIT License — feel free to use this for your own projects!

---

Built with ♥ for builders everywhere
