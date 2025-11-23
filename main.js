document.addEventListener('DOMContentLoaded', () => {

    // Function to fetch and load HTML components
    const loadComponent = async (id, url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }
            const text = await response.text();
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = text;
            } else {
                console.warn();
            }
            return text; // Return the text to signal completion
        } catch (error) {
            console.error('Error loading component:', error);
        }
    };

    // Function to handle mobile menu logic
    const initMobileMenu = () => {
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when a link is clicked
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    };

    // Function to highlight the active navigation link
    const highlightActiveNav = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            
            // Special case for 'Contact Us' button
            if (link.href.includes('contact.html') && currentPage === 'contact.html' && !link.classList.contains('bg-brand-blue')) {
                 link.classList.add('active'); // Highlight text link
            }
            // For other links
            else if (linkPage === currentPage) {
                if (link.classList.contains('bg-brand-blue')) {
                    // It's the button, make it visually "more" active
                    link.classList.add('ring-2', 'ring-white', 'ring-offset-2', 'ring-offset-brand-blue');
                } else {
                    link.classList.add('active');
                }
            }
        });
    };

    // Function to set the current year in the footer
    const setFooterYear = () => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    // --- Main Execution ---
    // Load header and footer, then init scripts that depend on them
    const loadApp = async () => {
        // Load header and footer in parallel
        await Promise.all([
            loadComponent('header-placeholder', 'header.html'),
            loadComponent('footer-placeholder', 'footer.html')
        ]);

        // Now that header and footer are loaded, run the scripts
        initMobileMenu();
        highlightActiveNav();
        setFooterYear();
    };

    loadApp();
});
