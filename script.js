// Parallax and 3D Depth Effects for Devices Section
document.addEventListener('DOMContentLoaded', function() {
    const devicesSection = document.getElementById('devices-showcase');
    const devicesImage = document.querySelector('.devices-image');
    const devicesWrapper = document.querySelector('.devices-image-wrapper');
    
    // Performance optimization
    let ticking = false;
    let lastScrollY = 0;
    
    // Scroll handler with throttling for better performance
    function handleScroll() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function updateParallax() {
        const scrollY = lastScrollY;
        const devicesSectionRect = devicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate if section is in viewport and scroll progress
        const sectionTop = devicesSectionRect.top;
        const sectionBottom = devicesSectionRect.bottom;
        const sectionHeight = devicesSectionRect.height;
        
        // Check if section is visible
        const isVisible = sectionTop < windowHeight && sectionBottom > 0;
        
        if (isVisible) {
            // Calculate scroll progress (0 to 1)
            // Start animation when section is 20% visible from bottom
            const triggerPoint = windowHeight * 0.8;
            const scrollProgress = Math.max(0, Math.min(1, (triggerPoint - sectionTop) / (triggerPoint + sectionHeight * 0.5)));
            
            // Apply parallax effect with easing
            applyParallaxEffect(scrollProgress);
            
            // Add scrolled class for CSS transitions
            if (scrollProgress > 0.1) {
                devicesSection.classList.add('scrolled');
            } else {
                devicesSection.classList.remove('scrolled');
            }
        }
        
        ticking = false;
    }
    
    function applyParallaxEffect(progress) {
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // Calculate transform values
        const translateY = easeOut * -40; // Move up on scroll
        const scale = 1 + (easeOut * 0.12); // Scale up on scroll
        const rotateX = 2 - (easeOut * 1.5); // Reduce X rotation
        const rotateY = -1 + (easeOut * 0.7); // Reduce Y rotation
        const translateZ = -20 + (easeOut * 25); // Move forward
        
        // Apply smooth transforms
        const transform = `
            translateZ(${translateZ}px) 
            translateY(${translateY}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${scale})
        `;
        
        devicesImage.style.transform = transform;
        
        // Adjust filter effects
        const brightness = 1.1 + (easeOut * 0.15);
        const contrast = 1.1 + (easeOut * 0.1);
        devicesImage.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    }
    
    // Optimized scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        handleScroll();
        
        // Additional cleanup for mobile performance
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 150);
        
        document.body.classList.add('is-scrolling');
    }, { passive: true });
    
    // Handle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset transforms on resize
            updateParallax();
        }, 250);
    }, { passive: true });
    
    // Initialize
    updateParallax();
    
    // Intersection Observer for better performance (fallback)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '0px 0px -20% 0px'
        });
        
        observer.observe(devicesSection);
    }
    
    // Preload and optimize image
    function optimizeImage() {
        const img = devicesImage;
        
        // Add loading states
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            console.warn('Failed to load devices image');
            // Fallback behavior
            this.style.backgroundColor = '#2a2a2a';
        });
    }
    
    optimizeImage();
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Reduce motion for mobile devices
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            devicesSection.classList.add('reduced-motion');
        }
    }
    
    // Debug mode (remove in production)
    if (window.location.search.includes('debug=true')) {
        const debugInfo = document.createElement('div');
        debugInfo.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
        `;
        document.body.appendChild(debugInfo);
        
        function updateDebug() {
            const rect = devicesSection.getBoundingClientRect();
            debugInfo.innerHTML = `
                Scroll: ${Math.round(window.scrollY)}px<br>
                Section Top: ${Math.round(rect.top)}px<br>
                In View: ${rect.top < window.innerHeight && rect.bottom > 0}<br>
                Transform: ${devicesImage.style.transform}
            `;
        }
        
        window.addEventListener('scroll', updateDebug);
        updateDebug();
    }
});

// Additional optimizations and fallbacks
document.addEventListener('DOMContentLoaded', function() {
    // CSS Custom Properties support
    if (CSS.supports('transform', 'translateZ(0)')) {
        document.documentElement.classList.add('supports-3d');
    }
    
    // Reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    // High refresh rate detection
    if (window.screen && window.screen.colorDepth > 24) {
        document.documentElement.classList.add('high-color-depth');
    }
});

// Performance monitoring (optional)
if ('performance' in window && 'mark' in window.performance) {
    performance.mark('parallax-script-loaded');
}