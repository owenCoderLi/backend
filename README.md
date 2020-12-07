# 约调研后台管理系统

## 如何开始

```javascript
cd project
// 安装依赖
yarn install || npm install(推荐使用yarn, npm有源限制或切换本地的cnpm)
// 运行模式
yarn dev || yarn start:dev  -- 本地运行(mock/环境)
yarn start:test -- 本地运行(非mock环境)
yarn eslint -- 项目eslint规范检测(部署测试环节)
yarn tsc -- TypeScript静态编译
yarn build -- 项目打包
```

## 项目结构

```javascript
  ├── README.md
  ├── config
  │   ├── config.ts // 项目基础配置
  │   ├── defaultSettings.ts // 项目静态配置
  │   ├── proxy.ts // 接口配置代理
  │   └── routes.ts // 路由管理
  ├── mock // 模拟数据
  ├── public // 静态资源
  ├── src
  │   ├── access.ts // 权限管理中心
  │   ├── app.tsx // 入口文件
  │   ├── components // 全局组件目录
  │   ├── e2e // 布局组件测试
  │   ├── global.tsx
  │   ├── pages // 路由对应页面目录
  │   │   └── document.ejs
  │   ├── services // TypeScript声明环境与API方法
  │   ├── typings.d.ts // TypeScript全局声明
  │   └── utils // 工具方法
  │       ├── utils.less
  │       └── utils.ts
  ├── tests // 测试方法
  ├── tsconfig.json // TypeScript配置
```