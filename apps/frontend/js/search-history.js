// Search History Management

const MAX_HISTORY_ITEMS = 10;

function loadSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

function saveSearchHistory(history) {
    localStorage.setItem('searchHistory', JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)));
}

function addToSearchHistory(searchTerm) {
    if (!searchTerm || !searchTerm.trim()) return;

    const term = searchTerm.trim().toLowerCase();
    let history = loadSearchHistory();

    // Remove if already exists
    history = history.filter(item => item.toLowerCase() !== term);
    
    // Add to beginning
    history.unshift(term);
    
    // Limit to MAX_HISTORY_ITEMS
    history = history.slice(0, MAX_HISTORY_ITEMS);
    
    saveSearchHistory(history);
    renderSearchHistory();
}

function removeFromSearchHistory(searchTerm) {
    let history = loadSearchHistory();
    history = history.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
    saveSearchHistory(history);
    renderSearchHistory();
}

function clearSearchHistory() {
    if (confirm('Xóa toàn bộ lịch sử tìm kiếm?')) {
        localStorage.removeItem('searchHistory');
        renderSearchHistory();
    }
}

function renderSearchHistory() {
    const dropdown = document.getElementById('searchHistoryDropdown');
    if (!dropdown) return;

    const history = loadSearchHistory();
    const searchInput = document.getElementById('searchInput');

    if (history.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    // Only show if search input is focused or has value
    if (searchInput && (searchInput === document.activeElement || searchInput.value.trim())) {
        dropdown.style.display = 'block';
        dropdown.innerHTML = `
            <div class="search-history-header">
                <span>Lịch sử tìm kiếm</span>
                <button class="clear-history-btn" onclick="clearSearchHistory()">Xóa</button>
            </div>
            ${history.map(term => `
                <div class="search-history-item">
                    <button class="history-item-btn" onclick="useSearchTerm('${term.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-clock"></i>
                        <span>${term}</span>
                    </button>
                    <button class="remove-history-btn" onclick="removeFromSearchHistory('${term.replace(/'/g, "\\'")}')">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            `).join('')}
        `;
    } else {
        dropdown.style.display = 'none';
    }
}

function useSearchTerm(term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        searchInput.focus();
        
        // Trigger search
        if (typeof filterAndSortProducts === 'function') {
            filterAndSortProducts();
        }
        
        // Navigate to products page if not already there
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage !== 'products.html') {
            window.location.href = 'products.html';
        }
    }
    
    renderSearchHistory();
}

// Setup event listeners for search history
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('focus', renderSearchHistory);
        searchInput.addEventListener('input', function() {
            if (this.value.trim()) {
                renderSearchHistory();
            } else {
                renderSearchHistory();
            }
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('searchHistoryDropdown');
            if (dropdown && !searchInput.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }
    
    // Initial render
    renderSearchHistory();
});

