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

    // Function to send the contact form without leaving the page
    const initContactForm = () => {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const button = document.getElementById('contact-submit');
        const status = document.getElementById('contact-status');
        const buttonText = button.textContent.trim();

        const showStatus = (message, isError) => {
            status.textContent = message;
            status.classList.remove('hidden', 'text-green-700', 'text-red-600');
            status.classList.add(isError ? 'text-red-600' : 'text-green-700');
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            button.disabled = true;
            button.textContent = 'Sending...';
            status.classList.add('hidden');

            try {
                // FormSubmit's AJAX endpoint is the form action with /ajax/ inserted
                const ajaxUrl = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
                const response = await fetch(ajaxUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(new FormData(form)))
                });
                const result = await response.json().catch(() => ({}));

                if (!response.ok || String(result.success) !== 'true') {
                    throw new Error(result.message || 'Request failed');
                }

                form.reset();
                showStatus('Thank you! Your message has been sent. We will get back to you soon.', false);
            } catch (error) {
                console.error('Contact form error:', error);
                showStatus('Sorry, your message could not be sent. Please call 9901210975 or email unmana.mentalhealth@gmail.com.', true);
            } finally {
                button.disabled = false;
                button.textContent = buttonText;
            }
        });
    };

    initContactForm();

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
