// 回测相关函数
function startBacktest() {
    alert('开始回测...');
    // 这里添加实际的回测逻辑
    console.log('回测已启动');
}

function resetConfig() {
    if(confirm('确定要重置配置吗？')) {
        // 重置表单
        document.querySelectorAll('input, select').forEach(input => {
            if(input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
        alert('配置已重置');
    }
}

// 实时交易相关函数
function switchTimeframe(timeframe) {
    // 移除所有active类
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // 添加active类到当前按钮
    event.target.classList.add('active');
    console.log('切换到时间框架:', timeframe);
}

function startStrategy() {
    alert('策略已启动');
    console.log('交易策略启动');
}

function pauseStrategy() {
    alert('策略已暂停');
    console.log('交易策略暂停');
}

function stopStrategy() {
    if(confirm('确定要停止策略吗？')) {
        alert('策略已停止');
        console.log('交易策略停止');
    }
}

// 注册相关函数
function sendVerifyCode() {
    const phone = document.querySelector('input[type="tel"]').value;
    if(!phone) {
        alert('请先输入手机号');
        return;
    }
    alert('验证码已发送到 ' + phone);
    
    // 倒计时效果
    const btn = event.target;
    let countdown = 60;
    btn.disabled = true;
    btn.textContent = countdown + 's';
    
    const timer = setInterval(() => {
        countdown--;
        btn.textContent = countdown + 's';
        if(countdown <= 0) {
            clearInterval(timer);
            btn.disabled = false;
            btn.textContent = '发送验证码';
        }
    }, 1000);
}

// 用户中心相关函数
function showSection(sectionName) {
    // 隐藏所有section
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // 移除所有active类
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 显示目标section
    const targetSection = document.getElementById(sectionName);
    if(targetSection) {
        targetSection.style.display = 'block';
    }
    
    // 添加active类到当前链接
    event.target.classList.add('active');
}

// 通用工具函数
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);