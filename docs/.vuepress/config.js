const path = require("path");

module.exports = {
  title: '源码学习',
  description: 'Vue | React 源码学习',
  base: '/learn-source-code/',
  dest: 'dist',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "public", "assets")
      }
    }
  },
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    repo: 'niexias/learn-source-code',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [{
      text: '个人博客',
      link: 'https://niexias.github.io/'
    }],
    sidebarDepth: 2,
    sidebar: [{
      title: "数据驱动",
      collapsable: false,
      children: [
        '/vue/instance/',
        '/vue/instance/Vue是什么'
      ]
    }, {
      title: "响应式",
      collapsable: false,
      children: [
      ]
    }, {
      title: "虚拟DOM",
      collapsable: false,
      children: [
      ]
    }, {
      title: "模板编译篇",
      collapsable: false,
      children: [
      ]
    }, {
      title: "生命周期篇",
      collapsable: false,
      children: [
      ]
    }, {
      title: "实例方法篇",
      collapsable: false,
      children: [
      ]
    }, {
      title: "全局API篇",
      collapsable: false,
      children: [
        ["globalAPI/", "全局API分析"]
      ]
    }, {
      title: "过滤器篇",
      collapsable: false,
      children: [
      ]
    }, {
      title: "指令篇",
      collapsable: false,
      children: [
      ]
    }, {
      title: "内置组件篇",
      collapsable: false,
      children: [
      ]
    }]
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "文档内容有更新，点击刷新立即查看新内容。",
          buttonText: "刷新"
        }
      }
    ]
  ] 
}