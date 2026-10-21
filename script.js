const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? '切换至浅色模式' : '切换至深色模式');
}

// 本地存储不可用时，保留默认主题，其余页面功能仍可使用。
try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') applyTheme(theme);
} catch {
    // 保留默认主题。
}

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try {
        localStorage.setItem('theme', theme);
    } catch {
        // 当前页面仍应用所选主题。
    }
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function setMenu(open) {
    menuToggle.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
}

menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
    }
});

window.matchMedia('(min-width: 769px)').addEventListener('change', () => setMenu(false));

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50 ? 'var(--shadow)' : 'none';
}, { passive: true });

// 动画作为渐进增强；无 JavaScript 或无观察器支持时内容默认可见。
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-content, .skill-card, .portfolio-card, .blog-card, .contact-info, .section-title').forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

document.getElementById('copyrightYear').textContent = new Date().getFullYear();
