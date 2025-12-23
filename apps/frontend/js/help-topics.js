// Help Topics Management

// Show help topic detail page
function showHelpTopic(topic) {
    // Hide support section
    const supportSection = document.getElementById('support');
    if (supportSection) supportSection.style.display = 'none';
    
    // Show corresponding help topic page
    const topicPages = {
        'ordering': 'helpOrdering',
        'shipping': 'helpShipping',
        'returns': 'helpReturns',
        'account': 'helpAccount'
    };
    
    const topicPageId = topicPages[topic];
    if (topicPageId) {
        const topicPage = document.getElementById(topicPageId);
        if (topicPage) {
            topicPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// Show help topics list (back button)
function showHelpTopics() {
    // Hide all help topic pages
    const topicPages = ['helpOrdering', 'helpShipping', 'helpReturns', 'helpAccount'];
    topicPages.forEach(pageId => {
        const page = document.getElementById(pageId);
        if (page) page.style.display = 'none';
    });
    
    // Show support section
    const supportSection = document.getElementById('support');
    if (supportSection) {
        supportSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}


