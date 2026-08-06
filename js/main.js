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