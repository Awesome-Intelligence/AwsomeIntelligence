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

    // Footer 社交按钮 - 二维码小浮窗（悬浮在按钮上方）
    const qrMap = {
        'wechat-official': { img: 'images/wechat-official-account.jpg', label: '微信公众号' },
        'wechat-channel':  { img: 'images/wechat-channel.jpg',           label: '视频号' },
        'xiaohongshu':     { img: 'images/xiaohongshu-qr.png',           label: '小红书' },
        'bilibili':        { img: 'images/bilibili-qr.png',              label: '哔哩哔哩' }
    };

    const qrTooltip = document.getElementById('qr-tooltip');
    const qrTooltipImg = document.getElementById('qr-tooltip-img');
    const qrTooltipLabel = document.getElementById('qr-tooltip-label');

    if (qrTooltip) {
        let activeBtn = null;

        const closeTooltip = () => {
            qrTooltip.classList.remove('active');
            qrTooltip.setAttribute('aria-hidden', 'true');
            if (activeBtn) {
                activeBtn.style.background = '';
                activeBtn = null;
            }
        };

        const positionTooltip = (btn) => {
            const rect = btn.getBoundingClientRect();
            const tooltipWidth = qrTooltip.offsetWidth;
            const gap = 10;
            // 居中于按钮上方
            let left = rect.left + rect.width / 2;
            // 防止溢出左边缘
            if (left - tooltipWidth / 2 < 8) left = tooltipWidth / 2 + 8;
            // 防止溢出右边缘
            if (left + tooltipWidth / 2 > window.innerWidth - 8) {
                left = window.innerWidth - tooltipWidth / 2 - 8;
            }
            qrTooltip.style.left = left + 'px';
            qrTooltip.style.bottom = (window.innerHeight - rect.top + gap) + 'px';
        };

        document.querySelectorAll('.social-circle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // 如果已激活同一个按钮，则关闭
                if (activeBtn === btn) {
                    closeTooltip();
                    return;
                }
                const key = btn.dataset.qr;
                const data = qrMap[key];
                if (!data) return;

                // 先关闭之前的
                if (activeBtn) {
                    activeBtn.style.background = '';
                }

                qrTooltipImg.src = data.img;
                qrTooltipImg.alt = data.label + '二维码';
                qrTooltipLabel.textContent = data.label;
                qrTooltip.classList.add('active');
                qrTooltip.setAttribute('aria-hidden', 'false');
                activeBtn = btn;
                btn.style.background = 'rgba(255, 255, 255, 0.18)';

                // 定位（等一帧让 tooltip 获得正确宽度）
                requestAnimationFrame(() => positionTooltip(btn));
            });
        });

        // 点击页面其他地方关闭
        document.addEventListener('click', (e) => {
            if (!qrTooltip.contains(e.target) && !e.target.closest('.social-circle')) {
                closeTooltip();
            }
        });

        // ESC 关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && qrTooltip.classList.contains('active')) {
                closeTooltip();
            }
        });

        // 滚动时关闭（避免定位错乱）
        window.addEventListener('scroll', () => {
            if (qrTooltip.classList.contains('active')) closeTooltip();
        }, { passive: true });
    }

    console.log('网站已加载完成');
});