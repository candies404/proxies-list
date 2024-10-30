// HTML模板字符串
const HTML_CONTENT = `
<html lang="zh-CN">
<head>
    <title>代理服务列表</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://dashboard.webshare.io/favicon.ico" type="image/x-icon">
    <style>
        /* CSS变量定义 - 用于主题颜色统一管理 */
        :root {
            --primary-color: #4a90e2;    /* 主色调 */
            --background-color: #f5f5f5;  /* 背景色 */
            --card-background: #ffffff;   /* 卡片背景色 */
            --text-color: #333333;       /* 文字颜色 */
            --border-color: #dddddd;     /* 边框颜色 */
        }
        /* 基础样式重置 */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        /* 页面基础布局样式 */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        /* 头部区域样式 */
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
        /* 内容样式 */
        .controls {
            display: flex;
            gap: 20px;  /* 增加间距从10px到20px */
            justify-content: center;
            margin-bottom: 20px;
            padding: 0 15px;
            width: 100%;
            max-width: 600px;
            margin: 0 auto 20px;
        }
        .refresh-btn {
            padding: 8px 16px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .refresh-btn:hover {
            background-color: #357abd;
        }
        /* 统计卡片区域样式 */
        .stats {
            background-color: var(--card-background);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .stat-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 15px;
            background: linear-gradient(145deg, #f8f9fa, #ffffff);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            transition: transform 0.2s;
        }

        .stat-card:hover {
            transform: translateY(-2px);
        }

        .stat-value {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
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
        }
        /* 代理列表网格布局样式 */
        .proxy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }

        .proxy-card {
            background-color: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }

        .proxy-card:hover {
            transform: translateY(-2px);
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

        .loading {
            text-align: center;
            padding: 40px;
            font-size: 1.2em;
            color: var(--primary-color);
        }

        .error {
            color: #dc3545;
            text-align: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            margin: 20px 0;
        }

        .search-box {
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            width: 300px;
            font-size: 16px;
            outline: none;  /* 移除点击时的默认边框 */
            transition: background-color 0.2s, border-color 0.2s;
        }
        .search-box:focus {
            border-color: var(--border-color);  /* 保持相同的边框颜色 */
            background-color: #f8f9fa;  /* 轻微改变背景色来表示焦点状态 */
        }
        /* 可复制文本样式 */
        .copyable {
            cursor: pointer;
            position: relative;
            padding: 4px 8px;
            background-color: #f5f5f5;
            border-radius: 4px;
            transition: background-color 0.2s;
            display: inline-block;
            min-width: 120px;
            text-align: center;
            border: 1px solid #e0e0e0;
            font-family: monospace;
        }

        .copyable:hover {
            background-color: #e0e0e0;
            border-color: #ccc;
        }

        .copyable:active {
            background-color: #d0d0d0;
        }
        /* 复制提示样式 */
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

        /* 未复制时hover显示"点击复制" */
        .copyable:not(.copied):hover::after {
            opacity: 1;
            content: '点击复制';
        }

        /* 复制后hover显示"已复制！" */
        .copyable.copied:hover::after {
            opacity: 1;
            content: '已复制！';
            background: rgba(40, 167, 69, 0.9);
        }

        .state-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.9em;
            font-weight: 500;
            display: inline-block;
            min-width: 80px;
            text-align: center;
        }

        .state-valid {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .state-invalid {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .list-state {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 1.2em;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 48px;
            background-color: #e9ecef;
            color: #495057;
            border: 1px solid #ced4da;
            width: 100%;
        }
        /* 列表状态样式 */
        .list-state-pending {
            background-color: #fff3cd;
            color: #856404;
            border: 1px solid #ffeeba;
        }

        .list-state-processing {
            background-color: #cce5ff;
            color: #004085;
            border: 1px solid #b8daff;
        }

        .list-state-completed {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        /* 响应式布局样式 */
        @media (max-width: 768px) {
            .controls {
                flex-direction: column;                
                align-items: stretch;
                gap: 20px;  /* 保持相同的间距 */
                padding: 0 10px;
            }
            
            header {
                padding: 15px;
                margin-bottom: 20px;
            }
            
            .controls {
                flex-direction: column;
                align-items: stretch;
                gap: 15px;
                padding: 0 10px;
            }
            
            .refresh-btn {
                padding: 12px 16px;  /* 增加按钮高度便于触摸 */
                font-size: 16px;
            }
            
            .stats {
                grid-template-columns: 1fr;  /* 统计卡片单列显示 */
                gap: 15px;
                padding: 15px;
            }
            
            .proxy-grid {
                grid-template-columns: 1fr;
                gap: 15px;
                padding: 0 10px;
            }
            
            .proxy-card {
                padding: 15px;
            }
            
            /* 优化可复制文本在移动端的显示 */
            .copyable {
                padding: 8px 12px;
                min-width: 140px;
                font-size: 14px;
            }
        }
        /* 添加小屏幕设备的额外优化 */
        @media (max-width: 480px) {
            .proxy-info p {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
            
            .copyable {
                width: 100%;
                min-width: unset;
            }
            
            .stat-card {
                padding: 12px;
            }
        }
    </style>
</head>
<body>
     <!-- 主容器 -->
    <div class="container">
        <header>
            <h1>代理服务器列表</h1>
            <!-- 控制区域：搜索框和刷新按钮 -->
            <div class="controls">
                <input type="text" class="search-box" id="searchBox" placeholder="搜索代理...">
                <button class="refresh-btn" onclick="fetchProxies()">刷新数据</button>
            </div>
        </header>
        <!-- 统计信息展示区域 -->
        <div id="stats" class="stats"></div>
        <!-- 代理列表展示区域 -->
        <div id="proxyList" class="proxy-grid">
            <div class="loading">加载中...</div>
        </div>
    </div>

    <script>
        let proxiesData = [];
        // 复制到剪贴板功能
        async function copyToClipboard(text, element) {
            try {
                await navigator.clipboard.writeText(text);
                // 添加copied类
                element.classList.add('copied');
                
                // 添加鼠标移出事件监听器
                const handleMouseLeave = () => {
                    element.classList.remove('copied');
                    element.removeEventListener('mouseleave', handleMouseLeave);
                };
                
                element.addEventListener('mouseleave', handleMouseLeave);
                
            } catch (err) {
                console.error('复制失败:', err);
            }
        }
        /*
        保持原始的状态值不翻译
        function getListStateLabel(state) {
            const states = {
                'pending': '等待中',
                'processing': '处理中',
                'completed': '已完成'
            };
            return states[state] || state;
        }
        */
        // 获取代理数据
        async function fetchProxies() {
            try {
                document.getElementById('proxyList').innerHTML = '<div class="loading">加载中...</div>';
                document.getElementById('stats').innerHTML = \`
                    <div class="stat-card">
                        <div class="stat-value">--</div>
                        <div class="stat-label">总代理数量</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">--</div>
                        <div class="stat-label">可用代理</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value list-state">--</div>
                        <div class="stat-label">列表状态</div>
                    </div>
                \`;
                
                const response = await fetch('/api/proxies');
                const data = await response.json();
                
                if (data.success) {
                    proxiesData = data.proxies;
                    const availableProxies = proxiesData.filter(p => p.valid).length;
                    
                    document.getElementById('stats').innerHTML = \`
                        <div class="stat-card">
                            <div class="stat-value">\${data.total}</div>
                            <div class="stat-label">总代理数量</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">\${availableProxies}</div>
                            <div class="stat-label">可用代理</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value list-state list-state-\${data.listState}">\${data.listState}</div>
                            <div class="stat-label">列表状态</div>
                        </div>
                    \`;

                    renderProxyList(proxiesData);
                } else {
                    throw new Error('获取数据失败');
                }
            } catch (error) {
                document.getElementById('proxyList').innerHTML = \`
                    <div class="error">
                        获取代理服务器信息失败: \${error.message}
                    </div>
                \`;
            }
        }
        // 渲染代理列表
        function renderProxyList(proxies) {
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

            document.getElementById('proxyList').innerHTML = proxyListHTML || '<div class="error">没有找到匹配的代理</div>';
        }
        // 搜索功能实现
        document.getElementById('searchBox').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProxies = proxiesData.filter(proxy => 
                proxy.ip.toLowerCase().includes(searchTerm) ||
                proxy.country.toLowerCase().includes(searchTerm) ||
                proxy.city.toLowerCase().includes(searchTerm)
            );
            renderProxyList(filteredProxies);
        });
        // 页面加载完成后自动获取数据
        window.addEventListener('load', fetchProxies);
    </script>
</body>
</html>`;

// 常量配置
const CONFIG = {
    API_BASE_URL: 'https://proxy.webshare.io/api/v2/proxy',
    PAGE_SIZE: 25
};

// CORS 头配置
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
};

// Worker主处理函数
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 处理预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        // API请求处理
        if (url.pathname === '/api/proxies') {
            return await handleApiRequest(request, env);
        }

        // 返回HTML页面
        return new Response(HTML_CONTENT, {
            headers: {
                'Content-Type': 'text/html;charset=UTF-8',
            },
        });
    }
};

// API请求处理函数
async function handleApiRequest(request, env) {
    try {
        const API_KEY = env.API_KEY;
        const headers = {
            'Authorization': `Token ${API_KEY}`,
            'Accept': 'application/json'
        };

        // 并行请求数据
        const [listResponse, configResponse] = await Promise.all([
            fetch(`${CONFIG.API_BASE_URL}/list/?mode=direct&page=1&page_size=${CONFIG.PAGE_SIZE}`, { headers }),
            fetch(`${CONFIG.API_BASE_URL}/config/`, { headers })
        ]);

        // 检查响应状态
        if (!listResponse.ok || !configResponse.ok) {
            throw new Error('API请求失败');
        }

        // 解析响应数据
        const [listData, configData] = await Promise.all([
            listResponse.json(),
            configResponse.json()
        ]);

        // 格式化响应数据
        const formattedResponse = {
            success: true,
            total: listData.count,
            // 整个列表的状态
            listState: configData.state,
            proxies: listData.results.map(proxy => ({
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

        return new Response(JSON.stringify(formattedResponse), {
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS
            }
        });

    } catch (error) {
        console.error('API Error:', error);

        return new Response(JSON.stringify({
            success: false,
            error: {
                message: error.message,
                timestamp: new Date().toISOString()
            }
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                ...CORS_HEADERS
            }
        });
    }
}
