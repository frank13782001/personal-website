// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // 不再需要切换图标，fa-adjust 在亮色和暗色模式下都适用
        });
    }
    
    // 导航项激活状态
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const heroSection = document.querySelector('.hero');
    
    // 初始化：默认只显示首页内容，隐藏其他板块
    function initSections() {
        // 显示英雄/首页部分
        if (heroSection) {
            heroSection.style.display = 'block';
        }
        
        // 隐藏所有带ID的部分（即导航目标部分）
        document.querySelectorAll('section[id]').forEach(section => {
            section.style.display = 'none';
        });
    }
    
    // 页面加载时初始化
    initSections();
    
    // 点击个人头像或网站标题返回首页
    const profileLink = document.querySelector('.profile a');
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有导航链接的激活状态
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // 显示英雄/首页部分
            if (heroSection) {
                heroSection.style.display = 'block';
            }
            
            // 隐藏所有带ID的部分
            document.querySelectorAll('section[id]').forEach(section => {
                section.style.display = 'none';
            });
        });
    }
    
    // 点击导航链接时切换板块
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为
            
            // 移除所有链接的激活状态
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // 为当前点击的链接添加激活状态
            this.classList.add('active');
            
            // 获取目标元素ID
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 隐藏英雄/首页部分
            if (heroSection) {
                heroSection.style.display = 'none';
            }
            
            // 隐藏所有带ID的板块
            document.querySelectorAll('section[id]').forEach(section => {
                section.style.display = 'none';
            });
            
            // 显示目标板块
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
    
    // 根据当前滚动位置更新激活状态
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // 获取所有section元素
        const sections = document.querySelectorAll('section[id]');
        
        // 检查英雄部分是否可见
        const heroVisible = heroSection && heroSection.style.display !== 'none';
        
        // 如果英雄部分可见，不设置任何导航项为激活状态
        if (heroVisible) {
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            return;
        }
        
        sections.forEach(section => {
            // 只处理当前可见的部分
            if (section.style.display === 'block') {
                const sectionTop = section.offsetTop - headerHeight - 10; // 添加一点偏移量
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // 移除所有链接的激活状态
                    navLinks.forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // 为当前section对应的链接添加激活状态
                    const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', updateActiveNavLink);
    
    // 不再初始加载时更新
    
    // 复制功能
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            // 使用现代的 Clipboard API
            return navigator.clipboard.writeText(text);
        } else {
            // 使用传统方法
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            return new Promise((resolve, reject) => {
                if (document.execCommand('copy')) {
                    resolve();
                } else {
                    reject();
                }
                document.body.removeChild(textArea);
            });
        }
    }
    
    // 显示复制成功提示
    function showCopyToast(element) {
        // 创建提示元素
        const toast = document.createElement('div');
        toast.textContent = '已复制';
        toast.style.cssText = `
            position: absolute;
            background: #f5f5f5;
            color: #666;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border: 1px solid #e0e0e0;
        `;
        
        // 获取元素位置
        const rect = element.getBoundingClientRect();
        toast.style.left = (rect.left + rect.width / 2) + 'px';
        toast.style.top = (rect.top + window.scrollY - 35) + 'px';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // 1.5秒后移除
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-10px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 1500);
    }
    
    // 微信复制功能
    const wechatCopyBtn = document.querySelector('.copy-wechat');
    if (wechatCopyBtn) {
        wechatCopyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.getAttribute('data-text');
            copyToClipboard(text).then(() => {
                showCopyToast(this);
            }).catch(() => {
                showCopyToast(this);
            });
        });
    }
    
    // 邮箱复制功能
    const emailCopyBtn = document.querySelector('.copy-email');
    if (emailCopyBtn) {
        emailCopyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.getAttribute('data-text');
            copyToClipboard(text).then(() => {
                showCopyToast(this);
            }).catch(() => {
                showCopyToast(this);
            });
        });
    }
});

// 文章展开/收起功能
function toggleArticle(button) {
    const articleItem = button.closest('.article-item');
    const preview = articleItem.querySelector('.article-preview');
    const full = articleItem.querySelector('.article-full');
    
    if (full.style.display === 'none' || full.style.display === '') {
        // 展开
        preview.style.display = 'none';
        full.style.display = 'block';
        button.textContent = '收起';
    } else {
        // 收起
        preview.style.display = 'block';
        full.style.display = 'none';
        button.textContent = '更多';
    }
}
