    // HTML模板字符串
    const HTML_CONTENT = `
    <html lang="zh-CN">
    <head>
    <title>代理服务器仪表盘</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://dashboard.webshare.io/favicon.ico" type="image/x-icon">
    <style>
        /* CSS样式组织结构:
        * 1. CSS变量:定义全局使用的颜色、间距等变量
        * 2. 基础样式:重置和基础样式定义  
        * 3. 布局样式:页面整体布局相关样式
        * 4. 组件样式:各个功能模块的样式
        * 5. 响应式:媒体查询
        */

        /* 1. CSS变量定义 */
        :root {
            --primary-color: #4a90e2;    
            --background-color: #f5f5f5;  
            --card-background: #ffffff;   
            --text-color: #333333;       
            --border-color: #dddddd;     
            --error-color: #dc3545;      
        }
        
        /* 2. 基础重置样式 */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        /* 3. 布局样式 */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        /* 4. 组件样式 */
        /* 4.1 Header区域 */        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px 0;
            background-color: var(--card-background);
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        /* 4.2 控制区域 */
        .controls {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 20px;
            padding: 0 15px;
            width: 100%;
            max-width: 600px;
            margin: 0 auto 20px;
        }
        
        .search-box {
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            width: 350px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .search-box:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }
        
        .refresh-btn {
            padding: 6px 12px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9em;
        }
        
        .refresh-btn:hover {
            background-color: #2980b9;
        }
        
        .refresh-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        .refresh-btn.retry {
            background-color: #dc3545;
        }
        
        .refresh-btn.retry:hover {
            background-color: #c82333;
        }

        /* 统计卡片区域、随机可用代理、代理服务列表样式 */
        .stats, .proxy-list-section, .random-proxies {
            background-color: var(--card-background);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            min-height: 200px;
            position: relative;
        }
        /* 统计内容样式 */
        #statsContent {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            justify-content: space-between;
        }
        
        .stat-card {
            padding: 20px;
            background: linear-gradient(145deg, #f8f9fa, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            transition: transform 0.2s;
            position: relative;
        }
        
        .stat-value {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            font-weight: bold;
            color: var(--primary-color);
            margin: 10px 0;
            min-height: 48px;
        }
        
        .stat-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: center;
        }
        
        /* 带宽显示样式 */
        .bandwidth-value {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            white-space: nowrap;
        }
        
.bandwidth-percent {
    position: absolute;  /* 绝对定位 */
    top: -10px;          /* 向上调整 */
    right: -40px;        /* 向右调整 */
    font-size: 0.5em;
    background: transparent;
    padding: 2px 8px;
    border-radius: 10px;
    color: #666;
}
        
        .billing-period {
            display: none;
            position: absolute;
            top: 88%;
            left: 50%;
            transform: translateX(-50%);
            background: #fff;
            color: #666;
            padding: 6px 12px;
            border-radius: 10px;
            font-size: 0.4em;
            white-space: nowrap;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            line-height: 1.4;
            font-weight: normal;
            border: 1px solid #e0e0e0;
        }
        
        .billing-period::before {
            content: '';
            position: absolute;
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 4px 4px 4px;
            border-style: solid;
            border-color: transparent transparent #fff transparent;
        }
        
        .billing-period::after {
            content: '';
            position: absolute;
            top: -7px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 6px 6px 6px;
            border-style: solid;
            border-color: transparent transparent #e0e0e0 transparent;
            z-index: -1;
        }
        
        .stat-card:hover .billing-period {
            display: block;
            animation: tooltipFadeIn 0.3s ease-in-out;
        }

        /* 动画定义 */
        @keyframes tooltipFadeIn {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-5px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }

        @keyframes cardFadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* 代理列表和随机代理样式 */
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .section-header h2 {
            color: var(--primary-color);
            margin: 0;
            font-size: 1.2em;
        }
            
                    /* 代理卡片区域样式 */
        .proxy-cards-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 20px;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .proxy-card {
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 20px;
            transition: all 0.3s ease;
            animation: cardFadeIn 0.3s ease;
        }

        .proxy-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .proxy-type {
            display: block;
            font-size: 14px;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .proxy-value {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Consolas', 'Monaco', monospace;
            color: #2c3e50;
        }
        /* 代理列表区域样式 */
        .proxy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            min-height: 400px;
            transition: all 0.3s ease;
            opacity: 1;
        }
/* 添加一个新的类用于无匹配状态 */
.proxy-grid.no-match-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

        /* 无匹配代理样式 */
.proxy-grid .no-match {
    width: 100%;
    text-align: center;
    padding: 40px 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 2px dashed var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

        .proxy-grid .no-match-icon {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            opacity: 0.7;
        }

        .proxy-grid .no-match-title {
            font-size: 1.5rem;
            color: var(--text-color);
            margin-bottom: 10px;
            font-weight: 600;
        }

        .proxy-grid .no-match-description {
            font-size: 1rem;
            color: #6c757d;
            margin-bottom: 20px;
            text-align: center;
            max-width: 400px;
        }

        .proxy-grid .no-match-actions {
            display: flex;
            gap: 15px;
        }

        .proxy-grid .no-match-btn {
            padding: 10px 20px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .proxy-grid .no-match-btn:hover {
            background-color: #357abd;
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .proxy-card h3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--primary-color);
            margin-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 5px;
        }
        
        .region-label {
            font-size: 0.8em;
            padding: 2px 8px;
            border: 1px solid #e6eef8;
            border-radius: 4px;
            color: #6e7c8c;
            margin-left: 10px;
            font-weight: normal;
            line-height: 1.4;
            background-color: #f8fafd;
        }
        
        .proxy-info {
            display: grid;
            gap: 8px;
        }
        
        .proxy-info p {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 8px 0;
        }
        
        .proxy-info strong {
            min-width: 70px;
        }

        /* 状态标签样式 */
        .state-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.9em;
            font-weight: 500;
            display: inline-block;
            min-width: 80px;
            text-align: center;
        }
        
        .state-badge.valid, .state-valid {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .state-badge.invalid, .state-invalid {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        /* 可复制文本样式 */
        .copyable {
            cursor: pointer;
            position: relative;
            padding: 12px;
            width: 100%;
            text-align: center;
            font-size: 13px;
            background-color: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            margin: 4px 0;
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            transition: all 0.3s ease;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            user-select: text;
            min-height: 44px;
            line-height: 1.4;
        }
        .copyable:hover {
            background-color: #e6f2ff;
            border-color: #4a90e2;
            box-shadow: 0 2px 4px rgba(74, 144, 226, 0.1);
        }
        
        .copyable:active {
            background-color: #e9ecef;
            transform: none;
        }
        /* 添加触摸结束后的状态 */
        .copyable:not(:active) {
            background-color: #f8f9fa;
            transform: none;
            border-color: #e0e0e0;
        }
        
        .copyable::after {
            content: '点击复制';
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            right: 50%;
            transform: translateX(50%);
            top: -30px;
            opacity: 0;
            transition: opacity 0.2s;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .copyable:not(.copied):not(.copying):hover::after {
            opacity: 1;
        }
        
        .copyable.copied {
            background-color: #f8f9fa;
            border-color: #7fc990;
        }
        
        .copyable.copy-failed {
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }
        
        /* Toast提示样式 */
        .toast {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 15px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            text-align: center;
            min-width: 140px;
            max-width: 80%;
            word-break: break-word;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .toast.success {
            background: rgba(40, 167, 69, 0.95);
        }
        
        .toast.error {
            background: rgba(220, 53, 69, 0.95);
        }
        
        .toast.show {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .error {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding: 20px;
            text-align: center;
            color: #dc3545;
        }
        
        /* 加载状态遮罩 */
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.8);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            border-radius: 8px;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .loading-overlay::after {
            content: '';
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* 5. 响应式布局 */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
        
            .controls {
                flex-direction: column;
                align-items: stretch;
                gap: 15px;
                padding: 0 10px;
            }
        
            .search-box {
                width: 100%;
            }
        
            #statsContent {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }
        
            .proxy-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
        
            .proxy-cards-container {
                grid-template-columns: 1fr;
            }
            .bandwidth-percent {
                position: static;    /* 移动端改为正常文档流 */
                margin-left: 5px;
                display: inline-block;
                vertical-align: super;
            }
            
            .bandwidth-value {
                flex-wrap: wrap;
                justify-content: center;
            }
            .billing-period {
                font-size: 0.5em;
            }
        }
    </style>
    </head>
    <body>
    <div class="container">
        <header>
            <h1>代理服务器列表</h1>
            <div class="controls">
                <input type="text" class="search-box" id="searchBox" placeholder="🔍 搜索IP、国家、城市、端口">
                <button class="refresh-btn" onclick="fetchProxies()">刷新数据</button>
            </div>
        </header>

        <!-- 统计信息区域 -->
        <div class="stats" id="statsSection">
            <div class="section-header">
                <h2>统计信息概览</h2>
                <button class="refresh-btn" onclick="fetchStats()">刷新</button>
            </div>
            <div class="content-wrapper">
                <div id="statsContent">
                    <!-- 统计数据将在这里动态插入 -->
                </div>
            </div>
            <div class="loading-overlay"></div>
        </div>

        <!-- 随机代理区域 -->
        <div class="random-proxies" id="randomProxies">
            <div class="section-header">
                <h2>随机可用代理</h2>
                <button class="refresh-btn" onclick="fetchRandomProxy()">刷新</button>
            </div>
            <div class="content-wrapper">
                <div class="proxy-cards-container">
                    <!-- SOCKS5 代理卡片 -->
                    <div class="proxy-card">
                        <span class="proxy-type">SOCKS5 代理</span>
                        <div class="proxy-value copyable" id="randomSocksProxy" onclick="copyToClipboard(this.textContent, this)">
                            <span class="proxy-text"></span>
                        </div>
                    </div>
                
                    <!-- HTTP 代理卡片 -->
                    <div class="proxy-card">
                        <span class="proxy-type">HTTP 代理</span>
                        <div class="proxy-value copyable" id="randomHttpProxy" onclick="copyToClipboard(this.textContent, this)">
                            <span class="proxy-text"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="loading-overlay"></div>
        </div>

        <!-- 代理列表区域 -->
        <div class="proxy-list-section">
            <div class="section-header">
                <h2>代理服务列表</h2>
                <button class="refresh-btn" onclick="fetchProxyList()">刷新</button>
            </div>
            <div class="content-wrapper">
                <div id="proxyList" class="proxy-grid">
                    <!-- 代理列表将在这里动态插入 -->
                </div>
            </div>
            <div class="loading-overlay"></div>
        </div>
    </div>

    <script>
    // 存储代理数据
    let proxiesData = [];

    
    /**
     * 工具函数
     */

    // Toast提示框显示
    function showToast(message, type = 'success') {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = \`toast \${type} show\`;

        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 复制到剪贴板功能
    async function copyToClipboard(text, element) {
        if (!text || !element) {
            console.error('Invalid parameters for copyToClipboard');
            return;
        }

        try {
            // 首先尝试使用 navigator.clipboard
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // 降级方法使用 textarea
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                textArea.style.top = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                } catch (err) {
                    console.error('Copy failed:', err);
                    throw new Error('复制失败');
                } finally {
                    document.body.removeChild(textArea);
                }
            }

            // 复制成功处理
            element.classList.add('copied');
            showToast('复制成功！', 'success');
            setTimeout(() => element.classList.remove('copied'), 3000);

        } catch (error) {
            // 复制失败处理
            console.error('Copy failed:', error);
            element.classList.add('copy-failed');
            showToast('复制失败，请手动复制', 'error');
            setTimeout(() => element.classList.remove('copy-failed'), 3000);
        }
    }
    /**
     * 数据渲染函数 
     */

    // 更新统计信息
    function updateStats(data, isError = false) {
            const statsContainer = document.getElementById('statsContent');
            const refreshBtn = document.querySelector('#statsSection .refresh-btn');

            if (isError) {
                statsContainer.innerHTML = \`<div class="error">\${data}</div>\`;
                refreshBtn.textContent = '重试';
                refreshBtn.classList.add('retry');
                return;
            }

            try {
                statsContainer.innerHTML = \`
                    <div class="stat-card">
                        <div class="stat-value">\${data.stats.total_proxies}</div>
                        <div class="stat-label">总代理数量</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">\${data.stats.valid_proxies}</div>
                        <div class="stat-label">可用代理</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">
                            <div class="bandwidth-value">
                                \${data.stats.bandwidth_total} / \${data.subscription.bandwidth_limit}
                                <div class="bandwidth-percent">\${data.stats.bandwidth_percent}%</div>
                            </div>
                            <div class="billing-period">
                                计费周期：\${data.subscription.billing_period_start} - \${data.subscription.billing_period_end}
                            </div>
                        </div>
                        <div class="stat-label">带宽使用量</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">\${data.stats.requests_total}</div>
                        <div class="stat-label">总请求数</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">\${data.stats.requests_successful}</div>
                        <div class="stat-label">成功请求数</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">\${data.stats.requests_failed}</div>
                        <div class="stat-label">失败请求数</div>
                    </div>
                \`;
                refreshBtn.textContent = '刷新';
                refreshBtn.classList.remove('retry');
            } catch (error) {
                console.error('Error updating stats:', error);
                statsContainer.innerHTML = \`<div class="error">更新统计信息失败</div>\`;
                refreshBtn.textContent = '重试';
                refreshBtn.classList.add('retry');
            }
        }


        // 更新代理列表
        function updateProxyList(data, isError = false) {
            const container = document.getElementById('proxyList');
            const refreshBtn = document.querySelector('.proxy-list-section .refresh-btn');

            if (isError) {
                container.innerHTML = \`<div class="error">\${data}</div>\`;
                refreshBtn.textContent = '重试';
                refreshBtn.classList.add('retry');
            } else {
                container.innerHTML = data;
                refreshBtn.textContent = '刷新';
                refreshBtn.classList.remove('retry');
            }
        }
        // 显示随机代理
        function displayRandomProxy(proxyList) {
            // 过滤出可用的代理
            const validProxies = proxyList.filter(proxy => proxy.valid);
            if (validProxies.length === 0) {
                return null;
            }

            // 随机选择一个可用代理
            const randomIndex = Math.floor(Math.random() * validProxies.length);
            const randomProxy = validProxies[randomIndex];

            if (!randomProxy) {
                document.getElementById('randomProxies').innerHTML = \`
                    <div class="error">没有可用的代理服务器</div>
                \`;
                return;
            }

            // 生成 SOCKS5 代理格式
            const socksProxy = \`socks5://\${randomProxy.username}:\${randomProxy.password}@\${randomProxy.ip}:\${randomProxy.port}\`;
            // 生成 HTTP 代理格式
            const httpProxy = \`http://\${randomProxy.username}:\${randomProxy.password}@\${randomProxy.ip}:\${randomProxy.port}\`;

            document.getElementById('randomSocksProxy').textContent = socksProxy;
            document.getElementById('randomHttpProxy').textContent = httpProxy;
        }
    /**
     * 数据获取函数
     */

    // 获取统计信息
    async function fetchStats() {
        const refreshBtn = document.querySelector('#statsSection .refresh-btn');
        const statsContent = document.getElementById('statsContent');
        if (!refreshBtn || !statsContent) return;

        refreshBtn.disabled = true;
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();

            if (data.success) {
                updateStats(data);
            } else {
                throw new Error(data.error?.message || '获取统计信息失败');
            }
        } catch (error) {
            updateStats(error.message, true);
        } finally {
            refreshBtn.disabled = false;
        }
    }

    // 获取随机代理
    async function fetchRandomProxy() {
        const container = document.getElementById('randomProxies');
        const refreshBtn = container.querySelector('.refresh-btn');
        const proxyCards = container.querySelector('.proxy-cards-container');

        if (!refreshBtn || !proxyCards) return;

        // 禁用刷新按钮并显示加载状态
        refreshBtn.disabled = true;
        proxyCards.style.opacity = '0.5';

        try {
            const response = await fetch('/api/random-proxy');
            const data = await response.json();

            if (data.success) {
                // 更新 SOCKS5 代理
                const socksProxyElement = document.querySelector('#randomSocksProxy');
                if (socksProxyElement) {
                    socksProxyElement.textContent = data.proxy.socks5;
                    socksProxyElement.classList.remove('copied', 'copy-failed');
                }

                // 更新 HTTP 代理
                const httpProxyElement = document.querySelector('#randomHttpProxy');
                if (httpProxyElement) {
                    httpProxyElement.textContent = data.proxy.http;
                    httpProxyElement.classList.remove('copied', 'copy-failed');
                }

                // 重置刷新按钮状态
                refreshBtn.textContent = '刷新';
                refreshBtn.classList.remove('retry');

            } else {
                throw new Error(data.error?.message || '获取随机代理失败');
            }

        } catch (error) {
            // 错误处理
                container.innerHTML = \`
                    <div class="section-header">
                        <h2>随机可用代理</h2>
                        <button class="refresh-btn retry" onclick="fetchRandomProxy()">重试</button>
                    </div>
                    <div class="error">\${error.message}</div>
                \`;

        } finally {
            // 恢复UI状态
            refreshBtn.disabled = false;
            proxyCards.style.opacity = '1';

            // 添加过渡效果
            proxyCards.style.transition = 'opacity 0.3s ease';
        }
    }

    // 获取代理列表
    async function fetchProxyList() {
        const refreshBtn = document.querySelector('.proxy-list-section .refresh-btn');
        const searchBox = document.getElementById('searchBox');
        refreshBtn.disabled = true;

        try {
            const response = await fetch('/api/proxies');
            const data = await response.json();

            if (data.success) {
                // 更新全局代理数据
                window.proxiesData = data.proxies;
                
                // 检查是否有搜索条件
                const searchTerm = searchBox.value.toLowerCase().trim();
                if (searchTerm) {
                    // 如果有搜索条件,应用过滤
                    const filteredProxies = data.proxies.filter(proxy => 
                        proxy.ip?.toLowerCase().includes(searchTerm) ||
                        proxy.country?.toLowerCase().includes(searchTerm) ||
                        proxy.city?.toLowerCase().includes(searchTerm) ||
                        proxy.port?.toString().includes(searchTerm)
                    );
                    renderProxyList(filteredProxies);
                } else {
                    // 无搜索条件显示全部
                    renderProxyList(data.proxies);
                }
            } else {
                throw new Error(data.error?.message || '获取代理列表失败');
            }
        } catch (error) {
            updateProxyList(error.message, true);
        } finally {
            refreshBtn.disabled = false;
        }
    }
    

            // 更新随机代理信息页面
    

    // 获取所有数据
    async function fetchProxies() {
        const statsSection = document.getElementById('statsSection'); 
        const proxyListSection = document.querySelector('.proxy-list-section'); 
        const randomProxiesSection = document.getElementById('randomProxies');
        const searchBox = document.getElementById('searchBox');

        // 显示加载状态
        const overlays = [
            statsSection?.querySelector('.loading-overlay'),
            proxyListSection?.querySelector('.loading-overlay'),
            randomProxiesSection?.querySelector('.loading-overlay')
        ].filter(Boolean);

        overlays.forEach(overlay => {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        });

        try {
            const response = await fetch('/api/proxies');
            const data = await response.json();

            if (data.success) {
                // 更新全局代理数据
                window.proxiesData = data.proxies;
                
                // 更新统计信息
                if (statsSection) {
                    updateStats({
                        stats: data.stats,
                        subscription: data.subscription
                    });
                }
                
                // 处理搜索和显示
                const searchTerm = searchBox.value.toLowerCase().trim();
                if (searchTerm) {
                    const filteredProxies = data.proxies.filter(proxy => 
                        proxy.ip?.toLowerCase().includes(searchTerm) ||
                        proxy.country?.toLowerCase().includes(searchTerm) ||
                        proxy.city?.toLowerCase().includes(searchTerm) ||
                        proxy.port?.toString().includes(searchTerm)
                    );
                    renderProxyList(filteredProxies);
                } else {
                    renderProxyList(data.proxies);
                }

                // 更新随机代理
                if (randomProxiesSection) {
                    displayRandomProxy(data.proxies);
                }
            } else {
                throw new Error(data.error?.message || '获取数据失败');
            }

        } catch (error) {
            console.error('Failed to fetch data:', error);
            showToast('获取数据失败，请重试', 'error');
        } finally {
            // 隐藏遮罩层
            overlays.forEach(overlay => {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            });
        }
    }

    // 渲染代理列表
    function renderProxyList(proxies) {
        const proxyListContainer = document.getElementById('proxyList');
        
        if (!Array.isArray(proxies)) {
            console.error('Invalid proxies data:', proxies);
            proxyListContainer.classList.add('no-match-state'); // 添加这行
            proxyListContainer.innerHTML = \`
                <div class="no-match">
                    <div class="no-match-icon">🤷‍♂️</div>
                    <div class="no-match-title">数据加载错误</div>
                    <div class="no-match-description">
                        抱歉，当前无法加载代理服务器数据。请稍后重试或检查网络连接。
                    </div>
                    <div class="no-match-actions">
                        <button class="no-match-btn" onclick="fetchProxies()">重新加载</button>
                    </div>
                </div>
            \`;
            return;
        }

        if (proxies.length === 0) {
            proxyListContainer.classList.add('no-match-state');
            proxyListContainer.innerHTML = \`
                <div class="no-match">
                    <div class="no-match-icon">🔍</div>
                    <div class="no-match-title">没有找到匹配的代理</div>
                    <div class="no-match-description">
                        根据您的搜索条件，未能找到任何代理服务器。请尝试调整搜索关键词。
                    </div>
                    <div class="no-match-actions">
                        <button class="no-match-btn" onclick="document.getElementById('searchBox').value=''; fetchProxyList();">重置搜索</button>
                        <button class="no-match-btn" onclick="fetchProxies()">刷新数据</button>
                    </div>
                </div>
            \`;
            return;
        } else {
            // 移除 no-match-state 类
            proxyListContainer.classList.remove('no-match-state');
        }

        const getStateLabel = (valid) => valid ? '可用' : '不可用';
        const getStateClass = (valid) => valid ? 'state-valid' : 'state-invalid';

            const proxyListHTML = proxies.map(proxy => \`
                <div class="proxy-card">
                    <h3>
                        <span>\${proxy.country} - \${proxy.city}</span>
                        <span class="region-label">地区</span>
                    </h3>
                    <div class="proxy-info">
                        <p><strong>IP:</strong> <span class="copyable" onclick="copyToClipboard('\${proxy.ip}', this)">\${proxy.ip}</span></p>
                        <p><strong>端口:</strong> <span class="copyable" onclick="copyToClipboard('\${proxy.port}', this)">\${proxy.port}</span></p>
                        <p><strong>用户名:</strong> <span class="copyable" onclick="copyToClipboard('\${proxy.username}', this)">\${proxy.username}</span></p>
                        <p><strong>密码:</strong> <span class="copyable" onclick="copyToClipboard('\${proxy.password}', this)">\${proxy.password}</span></p>
                        <p><strong>状态:</strong> <span class="state-badge \${getStateClass(proxy.valid)}">\${getStateLabel(proxy.valid)}</span></p>
                        <p><strong>检测时间:</strong> \${new Date(proxy.lastVerification).toLocaleString()}</p>
                    </div>
                </div>
            \`).join('');

        proxyListContainer.innerHTML = proxyListHTML;
    }

    /**
     * 事件处理
     */
    // 搜索框输入处理
    document.getElementById('searchBox').addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const statsSection = document.getElementById('statsSection');
        const randomProxiesSection = document.getElementById('randomProxies');
        const proxyList = document.getElementById('proxyList');
        
        // 处理统计和随机代理区域的显示
        if (searchTerm) {
            statsSection.style.opacity = '0';
            randomProxiesSection.style.opacity = '0';
            setTimeout(() => {
                statsSection.style.display = 'none';
                randomProxiesSection.style.display = 'none';
            }, 300);
        } else {
            statsSection.style.display = 'block';
            randomProxiesSection.style.display = 'block';
            setTimeout(() => {
                statsSection.style.opacity = '1';
                randomProxiesSection.style.opacity = '1';
            }, 50);
        }
        
        // 确保 proxiesData 存在且不为空
        if (!window.proxiesData || !Array.isArray(window.proxiesData)) {
            console.warn('代理数据未加载');
            return;
        }
        
        // 添加过渡效果
        proxyList.style.opacity = '0';
        
        setTimeout(() => {
            // 搜索过滤逻辑
            const filteredProxies = window.proxiesData.filter(proxy => {
                return proxy.ip?.toLowerCase().includes(searchTerm) ||
                    proxy.country?.toLowerCase().includes(searchTerm) ||
                    proxy.city?.toLowerCase().includes(searchTerm) ||
                    proxy.port?.toString().includes(searchTerm);
            });
            
            renderProxyList(filteredProxies);
            
            // 淡入新内容
            proxyList.style.opacity = '1';
        }, 300);
        
    }, 300)); // 300ms 的防抖延迟

    // 页面加载完成后获取初始数据
    window.addEventListener('DOMContentLoaded', () => {
        // 清空搜索框
        document.getElementById('searchBox').value = '';
        // 获取初始数据
        fetchProxies();
    });
    </script>
    </body>
    </html>
    `;

    /**
     * 配置常量
     */
    const CONFIG = {
    API_BASE_URL: 'https://proxy.webshare.io/api/v2/proxy',
    PAGE_SIZE: 25,
    TIMEOUT: 10000,
    CACHE_TTL: {
        PLAN: 86400,        // 计划详情缓存24小时
        SUBSCRIPTION: 3600,  // 订阅信息缓存1小时
        STATS: 300,         // 统计数据缓存5分钟
        PROXIES: 60         // 代理列表缓存1分钟
    }
    };

    /**
     * 错误类型枚举
     */
    const ERROR_TYPES = {
        TIMEOUT: 'TIMEOUT',           // 请求超时
        API_ERROR: 'API_ERROR',       // API调用错误
        NETWORK_ERROR: 'NETWORK_ERROR', // 网络错误
        AUTH_ERROR: 'AUTH_ERROR',     // 认证错误
        CACHE_ERROR: 'CACHE_ERROR'    // 缓存错误
    };

    /**
     * CORS响应头
     */
    const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    };

    /**
    * 工具函数
    */

    // 格式化字节大小
    function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 格式化日期时间
    function formatDateTime(dateString) {
    const date = new Date(dateString);
    const chinaDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
    const pad = (num) => String(num).padStart(2, '0');

    const year = chinaDate.getFullYear();
    const month = pad(chinaDate.getMonth() + 1);
    const day = pad(chinaDate.getDate());

    return `${year}-${month}-${day}`;
    }

    /**
    * 带超时的 fetch 函数
    */
    const fetchWithTimeout = async (url, options, timeout = CONFIG.TIMEOUT) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            switch (response.status) {
                case 401:
                    throw { type: ERROR_TYPES.AUTH_ERROR, message: '认证失败，请检查API密钥' };
                case 429:
                    throw { type: ERROR_TYPES.API_ERROR, message: '请求过于频繁，请稍后重试' };
                default:
                    throw { type: ERROR_TYPES.API_ERROR, message: `API请求失败: ${response.status}` };
            }
        }

        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw { type: ERROR_TYPES.TIMEOUT, message: '请求超时，请重试' };
        }
        throw error;
    }
    };

    /**
    * 带重试机制的 fetch 函数
    */
    const fetchWithRetry = async (url, options, maxRetries = 3) => {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fetchWithTimeout(url, options);
        } catch (error) {
            lastError = error;
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }

    throw lastError;
    };
    /**
    * 缓存管理类
    * 处理数据的缓存存储和获取
    */
    class CacheManager {
    constructor(env) {
        this.cache = caches.default;
        this.env = env;
    }

    // 获取缓存数据
    async get(key) {
        try {
            const cacheKey = this._generateCacheKey(key);
            const response = await this.cache.match(cacheKey);
            if (response) {
                const data = await response.json();
                if (this._isExpired(data)) {
                    await this.delete(key);
                    return null;
                }
                return data.value;
            }
            return null;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }

    // 设置缓存数据
    async set(key, value, ttl) {
        try {
            const cacheKey = this._generateCacheKey(key);
            const cacheData = {
                value,
                timestamp: Date.now(),
                ttl
            };
            const response = new Response(JSON.stringify(cacheData), {
                headers: { 'Cache-Control': `public, max-age=${ttl}` }
            });
            await this.cache.put(cacheKey, response);
        } catch (error) {
            console.error('Cache set error:', error);
        }
    }

    // 删除缓存数据
    async delete(key) {
        try {
            const cacheKey = this._generateCacheKey(key);
            await this.cache.delete(cacheKey);
        } catch (error) {
            console.error('Cache delete error:', error);
        }
    }

    // 生成缓存键
    _generateCacheKey(key) {
        return new Request(`https://cache/${this.env.API_KEY}/${key}`);
    }

    // 检查缓存是否过期
    _isExpired(data) {
        return Date.now() - data.timestamp > data.ttl * 1000;
    }
    }

    /**
    * API数据获取类
    * 处理所有与API相关的数据请求
    */
    class ApiDataFetcher {
    constructor(env, cacheManager) {
        this.env = env;
        this.cache = cacheManager;
        this.headers = {
            'Authorization': `Token ${this.env.API_KEY}`,
            'Accept': 'application/json'
        };
    }

    // 获取订阅数据
    async getSubscriptionData() {
        const cacheKey = 'subscription';
        let data = await this.cache.get(cacheKey);

        if (!data) {
            const response = await fetchWithRetry(
                'https://proxy.webshare.io/api/v2/subscription/',
                { headers: this.headers }
            );
            data = await response.json();
            await this.cache.set(cacheKey, data, CONFIG.CACHE_TTL.SUBSCRIPTION);
        }

        return data;
    }

    // 获取计划数据
    async getPlanData(planId) {
        const cacheKey = `plan_${planId}`;
        let data = await this.cache.get(cacheKey);

        if (!data) {
            const response = await fetchWithRetry(
                `https://proxy.webshare.io/api/v2/subscription/plan/${planId}/`,
                { headers: this.headers }
            );
            data = await response.json();
            await this.cache.set(cacheKey, data, CONFIG.CACHE_TTL.PLAN);
        }

        return data;
    }

    // 获取统计数据
    async getStatsData(startDate, endDate) {
        const cacheKey = `stats_${startDate}_${endDate}`;
        let data = await this.cache.get(cacheKey);

        if (!data) {
            const response = await fetchWithRetry(
                `https://proxy.webshare.io/api/v2/stats/aggregate/?timestamp__gte=${startDate}&timestamp__lte=${endDate}`,
                { headers: this.headers }
            );
            data = await response.json();
            await this.cache.set(cacheKey, data, CONFIG.CACHE_TTL.STATS);
        }

        return data;
    }

    // 获取代理列表
    async getProxyList() {
        const cacheKey = 'proxy_list';
        let data = await this.cache.get(cacheKey);

        if (!data) {
            const response = await fetchWithRetry(
                `${CONFIG.API_BASE_URL}/list/?mode=direct&page=1&page_size=${CONFIG.PAGE_SIZE}`,
                { headers: this.headers }
            );
            data = await response.json();
            await this.cache.set(cacheKey, data, CONFIG.CACHE_TTL.PROXIES);
        }

        return data;
    }
    }

    /**
    * 主要请求处理函数
    */

    // 处理代理列表请求
    async function handleProxiesRequest(request, env) {
    try {
        const cacheManager = new CacheManager(env);
        const apiFetcher = new ApiDataFetcher(env, cacheManager);

        // 并行获取数据
        const [subscription, proxyList] = await Promise.all([
            apiFetcher.getSubscriptionData(),
            apiFetcher.getProxyList()
        ]);

        // 获取计划详情
        const planData = await apiFetcher.getPlanData(subscription.plan);

        // 获取统计数据
        const statsData = await apiFetcher.getStatsData(
            subscription.start_date,
            subscription.end_date
        );

        // 计算带宽使用百分比
        const bandwidthPercent = ((statsData.bandwidth_total / (planData.bandwidth_limit * 1024 * 1024 * 1024)) * 100).toFixed(2);

        // 构建响应数据
        const response = {
            success: true,
            total: proxyList.count || 0,
            subscription: {
                bandwidth_limit: formatBytes(planData.bandwidth_limit * 1024 * 1024 * 1024),
                bandwidth_limit_bytes: planData.bandwidth_limit * 1024 * 1024 * 1024,
                billing_period_start: formatDateTime(subscription.start_date),
                billing_period_end: formatDateTime(subscription.end_date)
            },
            stats: {
                total_proxies: proxyList.count || 0,
                valid_proxies: (proxyList.results || []).filter(proxy => proxy.valid).length,
                bandwidth_total: formatBytes(statsData.bandwidth_total),
                bandwidth_total_bytes: statsData.bandwidth_total,
                bandwidth_percent: bandwidthPercent,
                requests_total: statsData.requests_total.toLocaleString(),
                requests_successful: statsData.requests_successful.toLocaleString(),
                requests_failed: statsData.requests_failed.toLocaleString()
            },
            proxies: (proxyList.results || []).map(proxy => ({
                ip: proxy.proxy_address,
                port: proxy.port,
                username: proxy.username,
                password: proxy.password,
                country: proxy.country_code,
                city: proxy.city_name,
                valid: proxy.valid,
                lastVerification: proxy.last_verification
            }))
        };

        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS
            }
        });

    } catch (error) {
        return handleError(error);
    }
    }

    // 处理统计信息请求
    async function handleStatsRequest(request, env) {
    try {
        const cacheManager = new CacheManager(env);
        const apiFetcher = new ApiDataFetcher(env, cacheManager);

            // 并行获取所需数据
        const [subscription, proxyList] = await Promise.all([
            apiFetcher.getSubscriptionData(),
            apiFetcher.getProxyList()
        ]);

            // 获取计划详情
        const planData = await apiFetcher.getPlanData(subscription.plan);

            // 获取统计数据
        const statsData = await apiFetcher.getStatsData(
            subscription.start_date,
            subscription.end_date
        );

            // 计算带宽使用百分比
        const bandwidthPercent = ((statsData.bandwidth_total / (planData.bandwidth_limit * 1024 * 1024 * 1024)) * 100).toFixed(2);

            // 构建响应数据
        const response = {
            success: true,
            stats: {
                total_proxies: proxyList.count || 0,
                valid_proxies: (proxyList.results || []).filter(proxy => proxy.valid).length,
                bandwidth_total: formatBytes(statsData.bandwidth_total),
                bandwidth_total_bytes: statsData.bandwidth_total,
                bandwidth_percent: bandwidthPercent,
                requests_total: statsData.requests_total.toLocaleString(),
                requests_successful: statsData.requests_successful.toLocaleString(),
                requests_failed: statsData.requests_failed.toLocaleString()
            },
            subscription: {
                bandwidth_limit: formatBytes(planData.bandwidth_limit * 1024 * 1024 * 1024),
                bandwidth_limit_bytes: planData.bandwidth_limit * 1024 * 1024 * 1024,
                billing_period_start: formatDateTime(subscription.start_date),
                billing_period_end: formatDateTime(subscription.end_date)
            }
        };

        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS
            }
        });

    } catch (error) {
        return handleError(error);
    }
    }
    // 处理随机代理请求
    async function handleRandomProxyRequest(request, env) {
    try {
        const cacheManager = new CacheManager(env);
        const apiFetcher = new ApiDataFetcher(env, cacheManager);

        // 获取代理列表
        const proxyList = await apiFetcher.getProxyList();

        // 过滤出可用的代理
        const validProxies = (proxyList.results || []).filter(proxy => proxy.valid);

        if (validProxies.length === 0) {
            throw {
                type: ERROR_TYPES.API_ERROR,
                message: '没有可用的代理服务器'
            };
        }

        // 随机选择一个代理
        const randomProxy = validProxies[Math.floor(Math.random() * validProxies.length)];

        // 构造代理字符串
        const socks5 = `socks5://${randomProxy.username}:${randomProxy.password}@${randomProxy.proxy_address}:${randomProxy.port}`;
        const http = `http://${randomProxy.username}:${randomProxy.password}@${randomProxy.proxy_address}:${randomProxy.port}`;

        const response = {
            success: true,
            proxy: {
                socks5,
                http
            }
        };

        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS
            }
        });

    } catch (error) {
        return handleError(error);
    }
    }

    // 错误处理函数
    function handleError(error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
        success: false,
        error: {
            type: error.type || ERROR_TYPES.NETWORK_ERROR,
            message: error.message || '未知错误',
            detail: error.detail || error.stack,
            timestamp: new Date().toISOString()
        }
    }), {
        status: error.type === ERROR_TYPES.AUTH_ERROR ? 401 : 500,
        headers: {
            'Content-Type': 'application/json',
            ...CORS_HEADERS
        }
    });
    }

    /**
     * Worker主处理函数
     * 处理所有incoming请求的路由分发
     */
    export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 处理预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        // API路由处理
        switch (url.pathname) {
            case '/api/proxies':
                return await handleProxiesRequest(request, env);
            case '/api/stats':
                return await handleStatsRequest(request, env);
            case '/api/random-proxy':
                return await handleRandomProxyRequest(request, env);
            default:
                // 返回HTML页面
                return new Response(HTML_CONTENT, {
                    headers: {
                        'Content-Type': 'text/html;charset=UTF-8',
                    },
                });
        }
    }
    };
