// ===== 全局交互效果脚本 =====

// 鼠标跟随效果
class MouseFollower {
    constructor() {
        this.follower = null;
        this.init();
    }
    
    init() {
        // 创建鼠标跟随元素
        this.follower = document.createElement('div');
        this.follower.className = 'mouse-follower';
        document.body.appendChild(this.follower);
        
        // 绑定事件
        document.addEventListener('mousemove', this.updatePosition.bind(this));
        document.addEventListener('mousedown', this.activate.bind(this));
        document.addEventListener('mouseup', this.deactivate.bind(this));
    }
    
    updatePosition(e) {
        this.follower.style.left = e.clientX - 10 + 'px';
        this.follower.style.top = e.clientY - 10 + 'px';
    }
    
    activate() {
        this.follower.classList.add('active');
    }
    
    deactivate() {
        this.follower.classList.remove('active');
    }
}

// K线蜡烛图装饰
class CandlestickDecoration {
    constructor() {
        this.container = null;
        this.candlesticks = [];
        this.init();
    }
    
    init() {
        this.container = document.createElement('div');
        this.container.className = 'candlestick-decoration';
        document.body.appendChild(this.container);
        
        this.createCandlesticks();
        this.animateCandlesticks();
    }
    
    createCandlesticks() {
        const count = Math.floor(window.innerWidth / 50);
        
        for (let i = 0; i < count; i++) {
            const candlestick = document.createElement('div');
            candlestick.className = 'candlestick';
            candlestick.style.left = (i * 50 + Math.random() * 30) + 'px';
            candlestick.style.bottom = '0px';
            candlestick.style.height = (20 + Math.random() * 40) + 'px';
            
            this.container.appendChild(candlestick);
            this.candlesticks.push(candlestick);
        }
    }
    
    animateCandlesticks() {
        setInterval(() => {
            this.candlesticks.forEach(candlestick => {
                const newHeight = 20 + Math.random() * 60;
                candlestick.style.height = newHeight + 'px';
            });
        }, 2000);
    }
}

// 点击波纹效果
class RippleEffect {
    static init() {
        document.addEventListener('click', this.createRipple.bind(this));
    }
    
    static createRipple(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = e.clientX - 25 + 'px';
        ripple.style.top = e.clientY - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        ripple.style.animation = 'rippleExpand 0.6s ease-out';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// 滚动视差效果
class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        this.elements = document.querySelectorAll('.parallax');
        window.addEventListener('scroll', this.updateParallax.bind(this));
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// 数字动画效果
class NumberAnimation {
    static animateNumber(element, start, end, duration = 1000) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            element.textContent = Math.floor(current).toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
}

// 页面加载动画
class PageLoader {
    static init() {
        // 添加页面加载动画
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        });
        
        elements.forEach(element => {
            element.style.animationPlayState = 'paused';
            observer.observe(element);
        });
    }
}

// 实时数据更新效果
class LiveDataEffect {
    static updateWithAnimation(element, newValue, isPositive = true) {
        element.style.transform = 'scale(1.1)';
        element.style.color = isPositive ? 'var(--success-color)' : 'var(--danger-color)';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
        }, 150);
        
        setTimeout(() => {
            element.style.color = '';
        }, 1000);
    }
}

// CSS动画样式注入
const animationStyles = `
    @keyframes rippleExpand {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px var(--accent-color);
        }
        50% {
            box-shadow: 0 0 20px var(--accent-color), 0 0 30px var(--accent-color);
        }
    }
    
    .glow {
        animation: glow 2s ease-in-out infinite;
    }
`;

// 初始化所有效果
document.addEventListener('DOMContentLoaded', function() {
    // 注入动画样式
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
    
    // 初始化各种效果
    new MouseFollower();
    new CandlestickDecoration();
    RippleEffect.init();
    new ParallaxEffect();
    PageLoader.init();
    
    // 为所有按钮添加波纹效果
    document.querySelectorAll('.btn, .card, .nav-links a').forEach(element => {
        element.classList.add('ripple');
    });
    
    // 为数据元素添加动画类
    document.querySelectorAll('.price-value, .overview-value').forEach(element => {
        element.classList.add('pulse');
    });
    
    // 为卡片添加浮动效果
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('float');
        }, index * 100);
    });
});

// 导出类供其他脚本使用
window.GlobalEffects = {
    MouseFollower,
    CandlestickDecoration,
    RippleEffect,
    ParallaxEffect,
    NumberAnimation,
    PageLoader,
    LiveDataEffect
};