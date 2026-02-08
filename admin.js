// Admin Panel JavaScript

let articleToDelete = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default
    document.getElementById('article-date').valueAsDate = new Date();
    
    // Load article list
    loadArticleList();
    
    // Form submission
    document.getElementById('article-form').addEventListener('submit', handleFormSubmit);
    
    // Reset form button
    document.getElementById('reset-form').addEventListener('click', resetForm);
    
    // Management controls
    document.getElementById('view-all').addEventListener('click', loadArticleList);
    document.getElementById('clear-all').addEventListener('click', confirmClearAll);
    document.getElementById('reset-defaults').addEventListener('click', resetToDefaults);
    
    // Delete modal controls
    document.getElementById('close-delete').addEventListener('click', closeDeleteModal);
    document.getElementById('cancel-delete').addEventListener('click', closeDeleteModal);
    document.getElementById('confirm-delete').addEventListener('click', deleteArticle);
    
    // Close modal on outside click
    document.getElementById('delete-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDeleteModal();
        }
    });
});

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const articles = loadArticles();
    
    // Get the highest ID and increment
    const maxId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) : 0;
    
    // Create new article object
    const newArticle = {
        id: maxId + 1,
        title: formData.get('title'),
        summary: formData.get('summary'),
        date: formData.get('date'),
        image: formData.get('image'),
        tags: formData.get('tags').split(',').map(tag => tag.trim()),
        content: formData.get('content') || 'Full article content would go here...'
    };
    
    // Add to beginning of array (most recent)
    articles.unshift(newArticle);
    
    // Save to localStorage
    localStorage.setItem('cryptonews_articles', JSON.stringify(articles));
    
    // Show success message
    showMessage('Article added successfully! 🎉', 'success');
    
    // Reset form
    resetForm();
    
    // Reload article list
    loadArticleList();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset form
function resetForm() {
    document.getElementById('article-form').reset();
    document.getElementById('article-date').valueAsDate = new Date();
    hideMessage();
}

// Show message
function showMessage(text, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = text;
    messageDiv.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

// Hide message
function hideMessage() {
    const messageDiv = document.getElementById('form-message');
    messageDiv.className = 'form-message';
}

// Load and display article list
function loadArticleList() {
    const articles = loadArticles();
    const listContainer = document.getElementById('article-list');
    
    if (articles.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <h4>No Articles Yet</h4>
                <p>Add your first article using the form on the left</p>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    listContainer.innerHTML = articles.map(article => `
        <div class="article-item" data-article-id="${article.id}">
            <div class="article-item-info">
                <div class="article-item-title">${article.title}</div>
                <div class="article-item-date">${formatDate(article.date)} | ${article.tags.join(', ')}</div>
            </div>
            <div class="article-item-actions">
                <button class="delete-btn" onclick="confirmDelete(${article.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Confirm delete
function confirmDelete(articleId) {
    articleToDelete = articleId;
    document.getElementById('delete-modal').classList.add('active');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('active');
    articleToDelete = null;
}

// Delete article
function deleteArticle() {
    if (!articleToDelete) return;
    
    const articles = loadArticles();
    const filteredArticles = articles.filter(a => a.id !== articleToDelete);
    
    localStorage.setItem('cryptonews_articles', JSON.stringify(filteredArticles));
    
    closeDeleteModal();
    loadArticleList();
    showMessage('Article deleted successfully', 'success');
}

// Confirm clear all
function confirmClearAll() {
    const confirmed = confirm('Are you sure you want to delete ALL articles? This cannot be undone!');
    
    if (confirmed) {
        localStorage.setItem('cryptonews_articles', JSON.stringify([]));
        loadArticleList();
        showMessage('All articles cleared', 'success');
    }
}

// Reset to defaults
function resetToDefaults() {
    const confirmed = confirm('Reset to default sample articles? This will replace all current articles.');
    
    if (confirmed) {
        // Clear localStorage to trigger reload of default articles
        localStorage.removeItem('cryptonews_articles');
        
        // Reload the default articles
        const defaultArticles = [
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
        
        localStorage.setItem('cryptonews_articles', JSON.stringify(defaultArticles));
        loadArticleList();
        showMessage('Reset to default articles successfully', 'success');
    }
}
