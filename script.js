// CryptoNews.Global - Main JavaScript

let currentShareUrl = '';
let currentShareTitle = '';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayArticles();
    initializeSearch();
    initializeShareModal();
});

// Load and display articles
function loadAndDisplayArticles() {
    const allArticles = loadArticles();
    
    // Sort by date (newest first)
    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Hero = latest article
    // Grid = rest
    const heroArticle = allArticles[0];
    const gridArticles = allArticles.slice(1);
    
    // Render hero
    const heroContainer = document.getElementById('hero-card');
    if (heroArticle && heroContainer) {
        heroContainer.innerHTML = createHeroCard(heroArticle);
    }
    
    // Render grid
    const gridContainer = document.getElementById('article-grid');
    if (gridContainer) {
        gridContainer.innerHTML = gridArticles.map(article => createArticleCard(article)).join('');
        
        // Add click handlers
        gridContainer.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.share-button')) {
                    const id = this.dataset.articleId;
                    window.location.href = `article.html?id=${id}`;
                }
            });
        });
    }
}

// Hero card (large featured)
function createHeroCard(article) {
    const formattedDate = formatDate(article.date);
    const tagsHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <div class="hero-image">
            <img src="${article.image}" alt="${article.title}">
            <span class="hero-badge">Featured</span>
        </div>
        <div class="hero-content">
            <div class="hero-date">${formattedDate}</div>
            <h2 class="hero-title">${article.title}</h2>
            <p class="hero-summary">${article.summary}</p>
            <div class="hero-tags">${tagsHTML}</div>
            <a href="article.html?id=${article.id}" class="hero-cta">
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    `;
}

// Article card (grid)
function createArticleCard(article) {
    const formattedDate = formatDate(article.date);
    const tagsHTML = article.tags.slice(0, 2).map(tag => `<span class="tag-sm">${tag}</span>`).join('');
    
    return `
        <div class="article-card" data-article-id="${article.id}">
            <div class="article-image-wrap">
                <img src="${article.image}" alt="${article.title}" class="article-image">
            </div>
            <div class="article-content">
                <div class="article-date">${formattedDate}</div>
                <h4 class="article-title">${article.title}</h4>
                <p class="article-summary">${article.summary}</p>
                <div class="article-meta">
                    <div class="article-tags">${tagsHTML}</div>
                    <button class="share-button" data-article-id="${article.id}">Share</button>
                </div>
            </div>
        </div>
    `;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Search
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.trim().toLowerCase();
            if (query.length === 0) {
                searchResults.innerHTML = '';
                return;
            }
            performSearch(query);
        }, 250);
    });
}

function performSearch(query) {
    const allArticles = loadArticles();
    const searchResults = document.getElementById('search-results');
    
    const results = allArticles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results" style="text-align:center;padding:40px;color:#6b7280;">No articles found</p>';
        return;
    }
    
    searchResults.innerHTML = `
        <div class="article-grid">
            ${results.map(article => createArticleCard(article)).join('')}
        </div>
    `;
    
    searchResults.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.articleId;
            window.location.href = `article.html?id=${id}`;
        });
    });
    
    searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Share Modal
function initializeShareModal() {
    const modal = document.getElementById('share-modal');
    const closeBtn = document.getElementById('close-modal');
    
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    modal.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            handleShare(this.dataset.platform);
        });
    });
}

function openShareModal(article) {
    const modal = document.getElementById('share-modal');
    currentShareUrl = `${window.location.origin}/article.html?id=${article.id}`;
    currentShareTitle = article.title;
    modal.classList.add('active');
}

function handleShare(platform) {
    const url = encodeURIComponent(currentShareUrl);
    const title = encodeURIComponent(currentShareTitle);
    
    if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
    } else if (platform === 'reddit') {
        window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
    } else if (platform === 'copy') {
        navigator.clipboard.writeText(currentShareUrl).then(() => {
            const btn = document.querySelector('.share-btn.copy');
            btn.innerHTML = '<span>✓</span> Copied!';
            setTimeout(() => btn.innerHTML = '<span>📋</span> Copy Link', 2000);
        });
    }
}

// Global share handler for dynamically added buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('share-button')) {
        e.stopPropagation();
        const articleId = e.target.dataset.articleId;
        const article = loadArticles().find(a => a.id == articleId);
        if (article) openShareModal(article);
    }
});

// Subscribe Modal
document.addEventListener('DOMContentLoaded', function() {
    const subscribeBtn = document.getElementById('header-subscribe-btn');
    const subscribeModal = document.getElementById('subscribe-modal');
    const closeSubscribe = document.getElementById('close-subscribe');
    
    if (subscribeBtn && subscribeModal) {
        subscribeBtn.addEventListener('click', function() {
            subscribeModal.classList.add('active');
        });
        
        closeSubscribe.addEventListener('click', function() {
            subscribeModal.classList.remove('active');
        });
        
        subscribeModal.addEventListener('click', function(e) {
            if (e.target === subscribeModal) {
                subscribeModal.classList.remove('active');
            }
        });
    }
});
