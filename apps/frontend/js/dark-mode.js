// Dark Mode Management

// Initialize dark mode from localStorage or system preference
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved preference, or system preference if not set
    const isDark = savedMode === null ? prefersDark : savedMode === 'true';
    
    setDarkMode(isDark);
}

// Toggle dark mode
function toggleDarkMode() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    setDarkMode(!isDark);
}

// Set dark mode
function setDarkMode(isDark) {
    const html = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (isDark) {
        html.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        localStorage.setItem('darkMode', 'true');
    } else {
        html.classList.remove('dark-mode');
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        localStorage.setItem('darkMode', 'false');
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initDarkMode();
        setupDarkModeToggle();
    });
} else {
    initDarkMode();
    setupDarkModeToggle();
}

// Add event listener to dark mode toggle button
function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.onclick = toggleDarkMode;
    }
}

// Listen for system preference changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only apply system preference if user hasn't manually set a preference
        if (!localStorage.getItem('darkMode')) {
            setDarkMode(e.matches);
        }
    });
}
