document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 社交媒体"更多"按钮功能
    const socialMoreBtn = document.getElementById('social-more-btn');
    const socialMoreContent = document.getElementById('social-more-content');
    
    if (socialMoreBtn && socialMoreContent) {
        socialMoreBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                socialMoreContent.setAttribute('hidden', '');
            } else {
                socialMoreContent.removeAttribute('hidden');
            }
        });
    }

    // 返回顶部按钮功能
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        window.addEventListener('scroll', handleScroll);
        backToTopButton.addEventListener('click', scrollToTop);
        
        handleScroll();
    }

    // 滚动进度条
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    // 导航栏滚动效果
    const header = document.querySelector('header');
    
    if (header) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleHeaderScroll);
        handleHeaderScroll();
    }

    // 深色模式切换
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        const storedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 检查是否有保存的主题设置
        let isDark = false;
        if (storedTheme === 'dark') {
            isDark = true;
        } else if (storedTheme === 'light') {
            isDark = false;
        } else {
            // 没有保存的设置，使用系统偏好
            isDark = systemDark;
        }
        
        // 初始化主题状态
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeToggle.classList.add('dark');
            applyDarkMode(true);
        }

        themeToggle.addEventListener('click', () => {
            isDark = document.documentElement.classList.toggle('dark');
            themeToggle.classList.toggle('dark');
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            applyDarkMode(isDark);
        });
    }
    
    function applyDarkMode(isDark) {
        if (isDark) {
            document.documentElement.style.setProperty('--background-primary', '#000000');
            document.documentElement.style.setProperty('--background-secondary', '#121212');
            document.documentElement.style.setProperty('--background-tertiary', '#1c1c1e');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#aeaeb2');
            document.documentElement.style.setProperty('--text-tertiary', '#8e8e93');
            document.documentElement.style.setProperty('--border-color', '#3a3a3c');
        } else {
            document.documentElement.style.setProperty('--background-primary', '#ffffff');
            document.documentElement.style.setProperty('--background-secondary', '#f5f5f7');
            document.documentElement.style.setProperty('--background-tertiary', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#000000');
            document.documentElement.style.setProperty('--text-secondary', '#86868b');
            document.documentElement.style.setProperty('--text-tertiary', '#6e6e73');
            document.documentElement.style.setProperty('--border-color', '#d2d2d7');
        }
    }

    // 页面加载动画
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .app-showcase-card');
        
        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.85 && !el.classList.contains('animated')) {
                el.classList.add('animated');
                el.style.animationDelay = `${index * 0.1}s`;
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 二维码点击放大功能
    const qrItems = document.querySelectorAll('.qr-item');

    qrItems.forEach(qrItem => {
        const qrPreview = qrItem.querySelector('.qr-preview');
        
        qrItem.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 切换显示/隐藏
            const isVisible = qrPreview.style.opacity === '1';
            
            // 先隐藏所有其他的预览
            qrItems.forEach(item => {
                const preview = item.querySelector('.qr-preview');
                preview.style.transform = 'translateX(-50%) scale(0.8)';
                preview.style.opacity = '0';
                preview.style.visibility = 'hidden';
            });
            
            // 如果当前是隐藏的，就显示
            if (!isVisible) {
                qrPreview.style.transform = 'translateX(-50%) scale(1)';
                qrPreview.style.opacity = '1';
                qrPreview.style.visibility = 'visible';
            }
        });
    });

    // 点击页面其他地方关闭预览
    document.addEventListener('click', function() {
        qrItems.forEach(qrItem => {
            const qrPreview = qrItem.querySelector('.qr-preview');
            qrPreview.style.transform = 'translateX(-50%) scale(0.8)';
            qrPreview.style.opacity = '0';
            qrPreview.style.visibility = 'hidden';
        });
    });

    console.log('网站已加载完成');
});