# Marketing Tweets Repository

A curated collection of the best marketing insights from Twitter. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Marketing Tweets Repository](https://via.placeholder.com/800x400/1a1a2e/8b5cf6?text=Marketing+Tweets+Repository)

## Features

- **Responsive Grid Layout**: Beautiful card-based design that works on all devices
- **Category Filtering**: Filter tweets by marketing categories
- **Search Functionality**: Search through tweets, authors, and categories
- **Sorting Options**: Sort by date, likes, or retweets
- **Dark Theme**: Modern dark purple/blue gradient design
- **Smooth Animations**: Hover effects and fade-in animations
- **Easy to Update**: Simple JSON file for adding new tweets

## Categories

- Content Marketing
- SEO
- Social Media
- Email Marketing
- Copywriting
- Analytics
- Paid Ads

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

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

## Adding New Tweets

To add new tweets, edit the `src/data/tweets.json` file. Each tweet follows this structure:

```json
{
  "id": "unique-id",
  "text": "Your tweet text here...",
  "author": {
    "name": "Author Name",
    "handle": "@handle",
    "avatar": "https://i.pravatar.cc/150?img=1"
  },
  "category": "Content Marketing",
  "date": "2024-01-15",
  "likes": 1234,
  "retweets": 567,
  "bookmarks": 890
}
```

### Available Categories

Make sure to use one of these exact category names:
- `"Content Marketing"`
- `"SEO"`
- `"Social Media"`
- `"Email Marketing"`
- `"Copywriting"`
- `"Analytics"`
- `"Paid Ads"`

### Avatar URLs

You can use:
- [Pravatar](https://pravatar.cc/) for random avatars: `https://i.pravatar.cc/150?img=NUMBER`
- Twitter profile images: `https://pbs.twimg.com/profile_images/...`
- Any public image URL

## Project Structure

```
marketing tweets repo/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/
│   │   ├── FilterBar.tsx    # Category filter buttons
│   │   ├── Header.tsx       # Page header
│   │   ├── SearchBar.tsx    # Search input
│   │   ├── SortDropdown.tsx # Sort options dropdown
│   │   └── TweetCard.tsx    # Individual tweet card
│   ├── data/
│   │   └── tweets.json      # Tweet data storage
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── public/                   # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Deployment on Vercel

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import the project in Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Vercel will auto-detect Next.js settings

3. Click **Deploy**

That's it! Your site will be live in seconds.

### Environment Variables

No environment variables are required for this project.

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
- **Font**: Inter (Google Fonts)

## Customization

### Changing Colors

Edit `tailwind.config.ts` to modify the color scheme. The main colors are:
- `primary`: Purple shades for accents
- `dark`: Slate shades for backgrounds

### Adding More Categories

1. Add the category to `src/types/index.ts` in the `Category` type
2. Add a color mapping in `src/components/TweetCard.tsx` and `src/components/FilterBar.tsx`
3. Add the category to the `CATEGORIES` array in `src/app/page.tsx`

## License

MIT License - feel free to use this for your own projects!

---

Built with ♥ for marketers everywhere
