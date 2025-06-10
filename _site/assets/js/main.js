// Main JavaScript for QA Hive Lab blog

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Reading time calculation
    calculateReadingTime();
    
    // Search functionality (if needed)
    initSearch();
    
    // Theme toggle (future feature)
    initThemeToggle();
});

// Mobile menu functionality
function initMobileMenu() {
    const navTrigger = document.getElementById('nav-trigger');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (navTrigger && menuIcon) {
        menuIcon.addEventListener('click', function() {
            navTrigger.checked = !navTrigger.checked;
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const nav = document.querySelector('.site-nav');
            if (!nav.contains(event.target) && navTrigger.checked) {
                navTrigger.checked = false;
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.site-nav .page-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navTrigger.checked = false;
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Calculate and display reading time
function calculateReadingTime() {
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;
    
    const text = postContent.textContent || postContent.innerText;
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Update existing reading time elements
    const readingTimeElements = document.querySelectorAll('.reading-time');
    readingTimeElements.forEach(element => {
        if (!element.textContent.includes('min read')) {
            element.textContent = `${readingTime} min read`;
        }
    });
}

// Basic search functionality (can be enhanced)
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 3) {
            hideSearchResults();
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(event.target)) {
            hideSearchResults();
        }
    });
}

function performSearch(query) {
    // This is a basic client-side search
    // In a real implementation, you might want to use a search service like Algolia
    
    const posts = document.querySelectorAll('.post-card');
    const searchResults = document.querySelector('#search-results');
    
    if (!searchResults) return;
    
    const results = [];
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title')?.textContent || '';
        const excerpt = post.querySelector('.post-excerpt')?.textContent || '';
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent).join(' ');
        
        const searchText = `${title} ${excerpt} ${tags}`.toLowerCase();
        
        if (searchText.includes(query.toLowerCase())) {
            results.push({
                title: title,
                excerpt: excerpt.substring(0, 150) + '...',
                url: post.querySelector('.post-title a')?.href || '#',
                tags: Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent)
            });
        }
    });
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.querySelector('#search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <p>No results found for "${query}"</p>
            </div>
        `;
    } else {
        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <h4><a href="${result.url}">${highlightQuery(result.title, query)}</a></h4>
                <p>${highlightQuery(result.excerpt, query)}</p>
                <div class="search-result-tags">
                    ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        searchResults.innerHTML = `
            <div class="search-results-header">
                <p>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</p>
            </div>
            ${resultsHTML}
        `;
    }
    
    searchResults.style.display = 'block';
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function hideSearchResults() {
    const searchResults = document.querySelector('#search-results');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Theme toggle functionality (for future dark mode support)
function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update toggle button text/icon
        updateThemeToggleButton(newTheme);
    });
    
    // Initialize toggle button
    updateThemeToggleButton(currentTheme);
}

function updateThemeToggleButton(theme) {
    const themeToggle = document.querySelector('#theme-toggle');
    if (!themeToggle) return;
    
    if (theme === 'dark') {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy code block functionality
function initCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.textContent = 'Copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyButton.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
                copyButton.textContent = 'Failed';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

// Initialize copy buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCodeCopyButtons();
});

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('#scroll-to-top');
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Analytics tracking (if Google Analytics is configured)
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track outbound links
function initOutboundLinkTracking() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('outbound_link_click', {
                link_url: this.href,
                link_text: this.textContent.trim()
            });
        });
    });
}

// Initialize all tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
    initOutboundLinkTracking();
}); 