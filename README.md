# 代理服务器列表展示

一个基于 Cloudflare Workers 的代理服务器列表展示页面，用于展示和管理 Webshare.io 的代理服务器信息。

## 功能特点

- 📋 展示代理服务器列表
- 🔍 实时搜索过滤功能
- 📊 显示代理状态统计
- 📱 响应式设计，支持移动端
- 📎 一键复制代理信息
- 🔄 实时刷新数据

## 部署

1. 注册/登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 `Workers & Pages`
3. 点击 `Create Worker`
4. 命名你的 Worker（如：`proxy-service`）
5. 在 Worker 中点击 `Quick Edit`
6. 粘贴 `_worker.js` 代码
7. 点击 `Save and Deploy`
8. 在 `Settings` -> `Variables` 中添加：
   ```
   名称：API_KEY
   值：your-webshare-api-token
   ```

## 页面截图
### PC端
![image](https://github.com/user-attachments/assets/fa243a0b-914e-41c8-baa9-35260385eb1e)
### 移动端
![0b487d456e61bad7c48000b4cf81c65](https://github.com/user-attachments/assets/84b5a3d1-4e2a-4cd6-9f95-f8fad86b49c9)

## 开发

### 1. 配置环境

创建 `wrangler.toml` 配置文件：

```toml
name = "proxy-service"
main = "_worker.js"
compatibility_date = "2024-10-22"

[vars]
API_KEY = "your-webshare-api-token"
```

### 2. 安装依赖

```bash
npm install -g wrangler
```

### 3. 本地开发

```bash
wrangler dev
```

### 4. 部署

```bash
wrangler deploy
```

## API 接口

### 获取代理列表

```http
GET /api/proxies
```

响应格式：
```json
{
    "success": true,
    "total": 25,
    "listState": "completed",
    "proxies": [
        {
            "ip": "xxx.xxx.xxx.xxx",
            "port": "xxxxx",
            "username": "username",
            "password": "password",
            "country": "US",
            "city": "New York",
            "valid": true,
            "lastVerification": "2024-xx-xx"
        }
    ]
}
```

## 页面功能

1. **统计信息**
    - 总代理数量
    - 可用代理数量
    - 列表状态

2. **搜索功能**
    - 支持按 IP 搜索
    - 支持按国家搜索
    - 支持按城市搜索

3. **代理信息展示**
    - IP 地址
    - 端口
    - 用户名
    - 密码
    - 地理位置
    - 可用状态
    - 最后验证时间

4. **交互功能**
    - 点击复制信息
    - 刷新数据
    - 响应式布局

## 注意事项

1. 需要有效的 Webshare.io API Key [点击获取](https://dashboard.webshare.io/userapi/keys)
2. 部署时请确保环境变量正确配置

## 技术栈

- Cloudflare Workers
- 原生 JavaScript
- HTML5 + CSS3
- Webshare.io API

## 开发说明

- `_worker.js`: 主要的 Worker 文件，包含所有代码
- HTML 模板和样式都内联在 JavaScript 中
- 使用原生 JavaScript，无需额外依赖
- 支持 CORS，可跨域访问

## 许可证

[MIT License](./LICENSE)

