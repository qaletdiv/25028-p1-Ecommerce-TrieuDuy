// Dark Mode functionality

function initDarkMode() {
    // Check if dark mode is enabled in localStorage
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.documentElement.classList.add('dark-mode');
        toggleDarkModeIcons(true);
    } else {
        toggleDarkModeIcons(false);
    }
}

function setupDarkModeToggle() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function() {
        const isDarkMode = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode.toString());
        toggleDarkModeIcons(isDarkMode);
    });
}

function toggleDarkModeIcons(isDarkMode) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (sunIcon && moonIcon) {
        if (isDarkMode) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

