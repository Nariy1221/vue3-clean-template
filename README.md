# Vue3 + TS + Vite6 + Pinia 项目干净模版

一个干净的模版，留了部分文件作为参考，封装了常用的工具，适合在此基础上进一步构建前端应用。欢迎批评指正！

## 一、核心技术栈和工具

1. **开发框架**：
    - **Vue 3**：使用 Vue 3.5 作为核心框架，结合响应式状态管理工具 Pinia 和 Vue Router，构建可扩展的单页应用程序 (SPA)。
    - **Vue Router 4**：实现高效的路由管理。
    - **Element Plus**：前端UI框架。
2. **构建工具**：
    - **Vite6**：采用极速开发服务器和现代化打包工具，支持模块化开发，包含 Vue 和 Vue JSX 的官方插件。
    - **Terser** 和 **@vitejs/plugin-legacy**：提供代码压缩和旧浏览器兼容支持。
3. **类型安全**：
    - **TypeScript**：全面支持 TypeScript 开发，通过 `vue-tsc` 实现类型检查，确保代码的可靠性。
4. **代码质量**：
    - **ESLint** 和 **Prettier**：提供代码规范校验和自动格式化支持，配合 Husky 实现提交前的代码检查。
    - **Vue 专用 ESLint 插件**：如 `eslint-plugin-vue` 和 `@vue/eslint-config-prettier`，确保 Vue 代码风格一致。
5. **单元测试**：
    - **Vitest**：快速、高效的单元测试框架，与 Vue Test Utils 集成，支持 Vue 组件的单元测试。
    - **JSDOM**：提供浏览器环境模拟，便于测试 DOM 交互。
6. **开发体验**：
    - **Vite Devtools**：提升开发调试效率的工具插件，提供更直观的 Vue 开发体验。
    - **Mitt**：轻量级事件总线库，用于事件处理和跨组件通信。
7. **工具链支持**：
    - **Husky**：用于设置 Git hooks，保障团队协作时的代码质量。
    - **npm-run-all2**：实现多任务并行或串行运行，简化开发脚本管理。
8. **现代化兼容性**：
    - **Core-js** 和 **Regenerator-runtime**：确保支持新旧浏览器特性。

## 二、封装

1. **Axios**：封装 Axios 实例，提供统一的请求配置和拦截器，支持请求重试和错误处理。位置：`/src/api/request.ts`
2. **动态路由**：根据views下的`*.vue`文件自动添加路由。位置：`/src/router/index.ts`
3. **全局配置**：提供全局配置，可在任意vue文件中引入。位置：`/src/config/index.ts`,`/.env`
4. **工具函数**：包含时间、单位、颜色等通用工具。位置：`/src/utils/util.ts`
5. **事件总线**：vue3中废弃，通过mitt插件实现同样效果。位置：`/src/libs/eventBus.ts`

## 三、项目启动

### 3.1 安装依赖

需要提前安装[node 18](https://nodejs.org/zh-cn)以上版本的环境

```sh
npm config set registry https://registry.npmmirror.com
npm install
// 如果比较慢可以使用cnpm
npm install -g cnpm --registry=http://registry.npmmirror.com
cnpm install
```

出现旧版本或错误依赖，可以使用`npm cache clean --force` 清除缓存

### 3.2 使用开发环境启动项目

```sh
npm run dev
```

### 3.3 项目打包

根目录会生成dist文件

```sh
npm run build
```

### 3.4 打包结果预览

打包后的结果是没办法直接预览的，需要使用以下命令运行

```sh
npm run preview
// 或者添加一个简单的 HTTP 静态服务器来简化开发者预览体验
npm install -g serve
serve -s dist
```

### 3.5 使用 Vitest 单元测试

```sh
npm run test:unit
```

### 3.6 使用 ESLint 进行代码规范校验

```sh
npm run lint
```

## 四、项目本地部署

### 4.1 Ubuntu上安装NGINX

```sh
sudo apt update
sudo apt install nginx
```

### 4.2 启动 Nginx 服务

启动 Nginx 服务并设置开机自启动

```sh
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4.3 创建 Nginx 配置文件

```sh
sudo nano /etc/nginx/sites-available/vue_project
```

在 Ubuntu 上，配置文件通常位于 `/etc/nginx/sites-available/` 目录中

### 4.4 配置 Nginx 以服务 Vue 项目

```conf
server {
    listen 8080; # 监听的端口号
    server_name your_domain_or_ip; #使用的域名或IP地址

    root /var/www/vue_project/dist; # 网站根目录
    index index.html;  # 入口文件

    location / {
        try_files $uri $uri/ /index.html; # 解决刷新404的问题
    }
```

访问将以`your_domain_or_ip:8080`访问

### 4.5 启动服务

```sh
sudo ln -s /etc/nginx/sites-available/vue_project /etc/nginx/sites-enabled/
```

### 4.6 测试 Nginx 配置

```sh
sudo nginx -t
```

没有问题则需要重载

```sh
sudo systemctl reload nginx
```

运行`nginx -c /etc/nginx/nginx.conf` 与`nginx -s reload` 重新加载配置

### 4.7 检查服务运行状态

```sh
sudo systemctl status nginx
```

### 4.8 日志查看与问题排查

```sh
# 查看访问日志
sudo tail -f /var/log/nginx/access.log

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

## 五、目录结构

```sh
├─dist // 构建输出目录，存放项目构建后的文件，如压缩后的JavaScript、CSS和HTML文件。
├─node_modules // Node.js项目的依赖库文件夹，存放通过npm或pnpm安装的所有依赖包。
├─public // 公共静态资源目录，存放不会被Webpack处理的静态资源文件，如favicon.ico、robots.txt等。
│  └─static // 存放静态资源文件，如图片、样式表和脚本等，这些文件会被复制到输出目录。
├─src // 源代码目录，存放项目的所有源文件。
│   ├─api // 存放API调用相关的模块，通常包含与后端服务通信的函数或服务。
│   ├─assets // 存放静态资源文件，如图片、字体、样式表等，这些文件会被Webpack处理。
│   ├─components // 存放项目中用到的Vue组件，通常是可复用的UI组件。
│   ├─config // 存放项目配置文件，如环境变量配置、API端点配置等。
│   ├─libs // 存放项目中用到的库或工具函数，这些可能是项目特定的或者第三方的。
│   ├─locales // 存放本地化资源文件，用于支持多语言功能。
│   ├─router // 存放Vue Router的配置文件，定义了应用的路由规则。
│   ├─stores // 存放状态管理文件，通常是使用Vuex进行状态管理。
│   ├─utils // 存放工具函数或帮助函数，这些函数在项目中被广泛使用。
│   └─views // 存放页面级别的组件，通常是应用的主要视图或布局。
│       ├─AboutView // 关于页面的组件。
│       ├─HomeView // 首页页面的组件。
│       ├─ ... // 其他页面组件。
│       ├─LoginView // 登录页面的组件。
│       ├─NotFoundView // 404页面的组件。
│       └─components // 存放NotFoundView页面特有的私有组件。
│       └─testView // 测试页面的组件。
│           └─components // 存放testView页面特有的私有组件。
├─.env // 环境变量配置文件，用于定义不同环境下的环境变量。
├─package.json // Node.js项目的配置文件，定义了项目的依赖、脚本和元数据。
├─pnpm-lock.yaml // pnpm的锁文件，记录了项目的精确依赖树，用于确保安装的一致性。
├─vite.config.ts // Vite的配置文件，用于配置项目的构建和开发服务器。
├─vitest.config.ts // Vitest的配置文件，用于配置项目的单元测试。
├─tsconfig.node.json // TypeScript的Node.js环境配置文件。
├─tsconfig.vitest.json // TypeScript的Vitest环境配置文件。
├─tsconfig.app.json // TypeScript的应用程序配置文件，定义了TypeScript编译选项。
├─eslint.config.js // ESLint的配置文件，定义了代码风格和规则。
├─index.html // 应用的入口HTML文件，通常是构建输出的入口点。
├─.prettierrc.json // Prettier的配置文件，定义了代码格式化规则。
├─env.d.ts // TypeScript的环境变量类型定义文件。
└─README.md // 项目说明文件，通常包含项目的介绍、安装指南和使用说明。
```

## 六、感谢

[Django-vue3-admin](https://github.com/huge-dream/django-vue3-admin)

[Vue3 入门指南与实战案例](https://vue3.chengpeiquan.com/)

[TypeScript 入门教程](https://ts.xcatliu.com/)

