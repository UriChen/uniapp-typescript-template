
## 总览

uniapp + vue + typescript模板(自用)

## 功能

```txt

- vue全家桶最新版本集成
  - 所有依赖全部使用最新版本
  - typescript 最新版本
  - babel + browserslistrc 自动转换esnext语法
  - 最新语法提案支持(optional-chaining等)
  - vuex 模块动态注册

- API请求二次封装
  - axios
  - 请求错误统一处理
  - async await
  - await-to js

- 全局功能
  - 国际化多语言
  - 动态换肤
  - Svg 图标
  - 设置 config
  
- eslint 代码检查

- typedoc 自动生成文档

```

## 前序准备

你需要在本地安装 [nodejs](http://nodejs.org/), 包管理工具[yarn](https://www.yarnpkg.com/lang/en/)

本项目技术栈基于 [typescript](https://www.typescriptlang.org/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios)

使用[typedoc](http://typedoc.org/)自动生成项目文档

使用[eslint](https://eslint.bootcss.com/)作为代码检测工具

IDE工具强烈推荐使用[webstorm](https://www.jetbrains.com/webstorm/) 2019.3以上的版本 和[vscode](https://code.visualstudio.com/)

如果你第一次使用[webstorm](https://www.jetbrains.com/webstorm/),那么我推荐你导入我提供的配置文件(项目目录下的webstorm_settings.zip),以节省IDE配置时间

## 目录结构

```bash
├── mock                       # mock 服务器
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── components             # 全局组件
│   ├── config                 # 全局配置文件
│   ├── filters                # 全局过滤函数
│   ├── icons                  # svg 图标
│   ├── lang                   # 国际化
│   ├── layouts                # 全局布局
│   ├── mixins                 # mixins
│   ├── pages                  # 所有页面
│   ├── plugins                # 全局插件
│   ├── static                 # 静态资源
│   ├── store                  # 全局 vuex store
│   ├── styles                 # 全局样式
│   ├── types                  # ts类型定义
│   ├── utils                  # 全局方法
│   ├── App.vue                # 入口页面
│   ├── main.ts                # 入口文件
│   ├── mainfest.json          # uniapp配置文件
│   ├── pages.json             # 页面配置文件
│   └── sitemap.json           # sitemap.json
├── tests                      # 单元测试
├── .browserslistrc            # browserslistrc 配置文件
├── .editorconfig              # 编辑器相关配置
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置
├── babel.config.js            # babel-loader 配置
├── jest.config.js             # jest 单元测试配置
├── package.json               # package.json 依赖
├── postcss.config.js          # postcss 配置
├── tsconfig.json              # typescript 配置
├── typedoc.js                 # typedoc 配置
└── vue.config.js              # vue-cli 配置
```

## 如何设置以及启动项目

### 安装依赖

### 请使用yarn作为包管理
```bash
npm install yarn -g
```

```bash
yarn install
```

### 启动本地开发环境（自带热启动）

```bash
使用HBuildX IDE工具 => 运行
```

### 构建生产环境

```bash
使用HBuildX IDE工具 => 发布
```

### 代码格式检查以及自动修复

```bash
yarn lint
```

### 运行单元测试

```bash
yarn test:unit
```

### 自动生成 svg 组件(重要: 添加svg文件后请运行一次)

```bash
yarn svg
```

### 自动生成文档 ./docs

```bash
yarn doc
```

### 自定义 Vue 配置

请看 [Configuration Reference](https://cli.vuejs.org/config/).

## 项目负责人

urichen9606@gmail.com
