// Main JavaScript for Cryptonews.global

let currentShareUrl = '';
let currentShareTitle = '';

// Initialize the page
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
    
    // Split into recent (last 3) and past articles
    const recentArticles = allArticles.slice(0, 3);
    const pastArticles = allArticles.slice(3);
    
    // Display recent articles
    displayArticles(recentArticles, 'recent-articles');
    
    // Display past articles
    displayArticles(pastArticles, 'past-articles');
}

// Display articles in a specific container
function displayArticles(articles, containerId) {
    const container = document.getElementById(containerId);
    
    if (articles.length === 0) {
        container.innerHTML = '<p class="no-results">No articles found</p>';
        return;
    }
    
    container.innerHTML = articles.map(article => createArticleCard(article)).join('');
    
    // Add share button event listeners
    const shareButtons = container.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const articleId = this.dataset.articleId;
            const article = articles.find(a => a.id == articleId);
            openShareModal(article);
        });
    });
}

// Create HTML for an article card
function createArticleCard(article) {
    const formattedDate = formatDate(article.date);
    const tagsHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <div class="article-card" data-article-id="${article.id}">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <div class="article-date">${formattedDate}</div>
                <h4 class="article-title">${article.title}</h4>
                <p class="article-summary">${article.summary}</p>
                <div class="article-footer">
                    <div class="article-tags">${tagsHTML}</div>
                    <button class="share-button" data-article-id="${article.id}">Share</button>
                </div>
            </div>
        </div>
    `;
}

// Format date to be more readable
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Debounce search for better performance
        searchTimeout = setTimeout(() => {
            if (query.length === 0) {
                searchResults.innerHTML = '';
                return;
            }
            
            performSearch(query);
        }, 300);
    });
}

// Perform search and display results
function performSearch(query) {
    const allArticles = loadArticles();
    const searchResults = document.getElementById('search-results');
    
    // Search in title, summary, and tags
    const results = allArticles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const summaryMatch = article.summary.toLowerCase().includes(query);
        const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(query));
        
        return titleMatch || summaryMatch || tagsMatch;
    });
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p class="no-results">No articles found matching your search</p>';
        return;
    }
    
    searchResults.innerHTML = `
        <h3 class="section-title">Search Results (${results.length})</h3>
        <div class="article-grid">
            ${results.map(article => createArticleCard(article)).join('')}
        </div>
    `;
    
    // Add share button event listeners to search results
    const shareButtons = searchResults.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const articleId = this.dataset.articleId;
            const article = results.find(a => a.id == articleId);
            openShareModal(article);
        });
    });
    
    // Smooth scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize share modal
function initializeShareModal() {
    const modal = document.getElementById('share-modal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Share button handlers
    const shareButtons = modal.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            handleShare(platform);
        });
    });
}

// Open share modal
function openShareModal(article) {
    const modal = document.getElementById('share-modal');
    currentShareUrl = `${window.location.origin}?article=${article.id}`;
    currentShareTitle = article.title;
    modal.classList.add('active');
}

// Handle sharing to different platforms
function handleShare(platform) {
    const url = encodeURIComponent(currentShareUrl);
    const title = encodeURIComponent(currentShareTitle);
    
    switch(platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
            break;
        case 'reddit':
            window.open(`https://reddit.com/submit?url=${url}&title=${title}`, '_blank');
            break;
        case 'copy':
            navigator.clipboard.writeText(currentShareUrl).then(() => {
                // Change button text temporarily
                const copyBtn = document.querySelector('.share-btn.copy');
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✓</span> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
            break;
    }
}

// Add some subtle animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe article cards for animation
setTimeout(() => {
    document.querySelectorAll('.article-card').forEach(card => {
        observer.observe(card);
    });
}, 100);
