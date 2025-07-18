// Smooth scroll e navegação
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header-sticky').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abrir o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Animação de entrada dos devices
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.device, .reveal, .card-deliverable, .benefit-card, .testimonial-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animação dos cards de entregáveis em cascata
    const deliverableCards = document.querySelectorAll('.card-deliverable');
    const deliverableObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    deliverableCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        deliverableObserver.observe(card);
    });

    // Efeito de typing no título hero (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = setInterval(() => {
                if (i < originalText.length) {
                    heroTitle.innerHTML += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);
                }
            }, 50);
        }, 500);
    }

    // Animação dos números de preço
    const priceAnimation = () => {
        const priceElement = document.querySelector('.amount');
        if (priceElement) {
            const finalPrice = parseInt(priceElement.textContent);
            let currentPrice = 0;
            const increment = finalPrice / 50;
            
            const animatePrice = setInterval(() => {
                currentPrice += increment;
                if (currentPrice >= finalPrice) {
                    currentPrice = finalPrice;
                    clearInterval(animatePrice);
                }
                priceElement.textContent = Math.round(currentPrice);
            }, 30);
        }
    };

    // Observar seção de preços para animar
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        const pricingObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    priceAnimation();
                    pricingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        pricingObserver.observe(pricingSection);
    }

    // Efeito hover nos cards com cursor personalizado
    const cards = document.querySelectorAll('.card-deliverable, .benefit-card, .testimonial-card, .individual-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Botões com efeito ripple
    const buttons = document.querySelectorAll('.btn-primary, .btn-purchase, .btn-individual, .btn-cta');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header-sticky');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = '#000000';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Contador de benefícios animado
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            
            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(updateCounter);
                }
                counter.textContent = Math.round(current);
            }, 20);
        });
    };

    // Mouse trail effect (opcional - efeito sutil)
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        // Manter apenas os últimos 10 pontos
        if (mouseTrail.length > 10) {
            mouseTrail.shift();
        }
    });

    // Performance optimization: throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        // Aqui você pode adicionar outros efeitos de scroll
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Console message para desenvolvedores
    console.log('🚀 Landing Page Mockups Pro - Desenvolvido com tecnologias modernas');
    console.log('💚 Verde principal: #C4F23F');
    console.log('⚫ Preto profundo: #000000');
    console.log('🎨 Design brutalista e tecnológico');

});

// CSS para o efeito ripple
const rippleCSS = `
.btn-primary, .btn-purchase, .btn-individual, .btn-cta {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.card-deliverable, .benefit-card, .testimonial-card, .individual-card {
    transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
`;

// Adicionar CSS personalizado
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);