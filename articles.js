// Article Database
// This file stores all articles in JSON format
// Add new articles to the beginning of the array to show them as "recent"

const articles = [
    {
        id: 1,
        title: "How Solana is Changing the Way We Transact",
        summary: "Learn about instant P2P, P2B and B2B transfers and why speed matters in the blockchain race",
        date: "2026-01-25",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
        tags: ["Solana", "DeFi", "Payments"],
        content: "Full article content would go here..."
    },
    {
        id: 2,
        title: "NFT Royalties: Are They Dead or Just Sleeping?",
        summary: "The ongoing debate about creator royalties in the NFT space and what it means for artists",
        date: "2026-01-24",
        image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80",
        tags: ["NFTs", "Ethereum", "Web3"],
        content: "Full article content would go here..."
    },
    {
        id: 3,
        title: "Understanding Gas Fees Without the Jargon",
        summary: "A simple breakdown of why you're paying transaction fees and how to save money on them",
        date: "2026-01-23",
        image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&q=80",
        tags: ["Ethereum", "Education", "Gas Fees"],
        content: "Full article content would go here..."
    },
    {
        id: 4,
        title: "Stablecoins Explained: Your Digital Dollar Guide",
        summary: "What are stablecoins, how do they work, and why should you care about USDC vs USDT?",
        date: "2026-01-22",
        image: "https://images.unsplash.com/photo-1640826514546-7d2d285eb997?w=800&q=80",
        tags: ["Stablecoins", "DeFi", "Education"],
        content: "Full article content would go here..."
    },
    {
        id: 5,
        title: "Layer 2s: Making Ethereum Affordable Again",
        summary: "Arbitrum, Optimism, and Base are solving Ethereum's scaling problem - here's how",
        date: "2026-01-21",
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
        tags: ["Ethereum", "Layer 2", "Scaling"],
        content: "Full article content would go here..."
    },
    {
        id: 6,
        title: "Bitcoin ETFs: What Changed in 2024?",
        summary: "The approval of spot Bitcoin ETFs and what it means for mainstream adoption",
        date: "2026-01-20",
        image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
        tags: ["Bitcoin", "ETF", "Regulation"],
        content: "Full article content would go here..."
    },
    {
        id: 7,
        title: "DeFi Yield Farming: Risk vs Reward 101",
        summary: "Understanding APY, impermanent loss, and whether yield farming is right for you",
        date: "2026-01-19",
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80",
        tags: ["DeFi", "Yield Farming", "Education"],
        content: "Full article content would go here..."
    },
    {
        id: 8,
        title: "Wallet Security: Don't Get Rekt",
        summary: "Essential tips to protect your crypto from scams, phishing, and hacks",
        date: "2026-01-18",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        tags: ["Security", "Wallets", "Education"],
        content: "Full article content would go here..."
    }
];

// Function to save articles (for admin use)
function saveArticles() {
    localStorage.setItem('cryptonews_articles', JSON.stringify(articles));
}

// Function to load articles (prioritize localStorage if it exists)
function loadArticles() {
    const stored = localStorage.getItem('cryptonews_articles');
    if (stored) {
        return JSON.parse(stored);
    }
    return articles;
}

// Initialize localStorage with default articles if empty
if (!localStorage.getItem('cryptonews_articles')) {
    saveArticles();
}
