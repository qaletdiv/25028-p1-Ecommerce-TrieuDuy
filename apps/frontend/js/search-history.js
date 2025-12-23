// Search History Management

const MAX_SEARCH_HISTORY = 5;
const SEARCH_HISTORY_KEY = 'searchHistory';

// Load search history from localStorage
function loadSearchHistory() {
    try {
        const history = localStorage.getItem(SEARCH_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch (e) {
        return [];
    }
}

// Save search history to localStorage
function saveSearchHistory(history) {
    try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error('Error saving search history:', e);
    }
}

// Add search term to history
function addToSearchHistory(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return;
    
    const trimmedTerm = searchTerm.trim();
    let history = loadSearchHistory();
    
    // Remove duplicate if exists
    history = history.filter(item => item.toLowerCase() !== trimmedTerm.toLowerCase());
    
    // Add to beginning
    history.unshift(trimmedTerm);
    
    // Keep only last 5 items
    if (history.length > MAX_SEARCH_HISTORY) {
        history = history.slice(0, MAX_SEARCH_HISTORY);
    }
    
    saveSearchHistory(history);
    renderSearchHistory();
}

// Remove search term from history
function removeFromSearchHistory(searchTerm) {
    let history = loadSearchHistory();
    history = history.filter(item => item !== searchTerm);
    saveSearchHistory(history);
    renderSearchHistory();
}

// Clear all search history
function clearSearchHistory() {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    renderSearchHistory();
}

// Render search history dropdown
function renderSearchHistory() {
    const dropdown = document.getElementById('searchHistoryDropdown');
    if (!dropdown) return;
    
    const history = loadSearchHistory();
    
    if (history.length === 0) {
        dropdown.innerHTML = '';
        dropdown.style.display = 'none';
        return;
    }
    
    dropdown.innerHTML = `
        <div class="search-history-header">
            <span>Lịch sử tìm kiếm</span>
            <button class="clear-history-btn" onclick="clearSearchHistory()" title="Xóa tất cả">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="search-history-items">
            ${history.map(term => `
                <div class="search-history-item">
                    <button class="history-item-btn" onclick="selectSearchHistory('${term.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-clock"></i>
                        <span>${escapeHtml(term)}</span>
                    </button>
                    <button class="remove-history-btn" onclick="removeFromSearchHistory('${term.replace(/'/g, "\\'")}'); event.stopPropagation();" title="Xóa">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// Select search history item
function selectSearchHistory(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        searchInput.focus();
        // Trigger search
        if (typeof showProductsPage === 'function') {
            showProductsPage(null);
        }
        if (typeof filterAndSortProducts === 'function') {
            filterAndSortProducts();
        }
    }
    hideSearchHistory();
}

// Show search history dropdown
function showSearchHistory() {
    const dropdown = document.getElementById('searchHistoryDropdown');
    if (dropdown) {
        renderSearchHistory();
        const history = loadSearchHistory();
        if (history.length > 0) {
            dropdown.style.display = 'block';
        }
    }
}

// Hide search history dropdown
function hideSearchHistory() {
    const dropdown = document.getElementById('searchHistoryDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize search history
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchInput && searchBar) {
        // Show history on focus
        searchInput.addEventListener('focus', showSearchHistory);
        
        // Hide history when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchBar.contains(e.target)) {
                hideSearchHistory();
            }
        });
        
        // Add to history on search - wrap existing search functionality
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            // Store original onclick if exists
            const originalOnClick = searchBtn.onclick;
            
            searchBtn.addEventListener('click', function(e) {
                const term = searchInput.value.trim();
                if (term) {
                    addToSearchHistory(term);
                }
                // Let existing handlers run
            });
        }
        
        // Add to history on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const term = searchInput.value.trim();
                if (term) {
                    addToSearchHistory(term);
                }
            }
        });
        
        // Also add to history when search is performed via main.js
        // Hook into filterAndSortProducts if it exists
        if (typeof filterAndSortProducts !== 'undefined') {
            const originalFilterAndSort = filterAndSortProducts;
            window.filterAndSortProducts = function() {
                const term = searchInput.value.trim();
                if (term) {
                    addToSearchHistory(term);
                }
                return originalFilterAndSort.apply(this, arguments);
            };
        }
    }
    
    // Initial render
    renderSearchHistory();
});

