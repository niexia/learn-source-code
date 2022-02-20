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
    repo: 'niexia/learn-source-code',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [{
        text: 'Vue 2',
        link: '/vue/'
      },
      {
        text: 'Vue 3',
        link: '/vue-next/'
      },
      {
        text: 'React',
        link: '/react/'
      },
      {
        text: '个人博客',
        link: 'https://niexia.github.io/'
      },
    ],
    sidebarDepth: 2,
    sidebar: {
      '/vue/': getVueSidebar(),
      '/vue-next/': getVueNextSidebar(),
      '/react/': getReactSidebar()
    },
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

function getVueSidebar() {
  return [{
    title: "数据驱动",
    collapsable: false,
    children: [
      '/vue/instance/',
      '/vue/instance/Vue是什么',
      '/vue/instance/newVue初始化'
    ]
  }, {
    title: "响应式",
    collapsable: false,
    children: []
  }, {
    title: "虚拟DOM",
    collapsable: false,
    children: []
  }, {
    title: "模板编译篇",
    collapsable: false,
    children: []
  }, {
    title: "生命周期篇",
    collapsable: false,
    children: []
  }, {
    title: "实例方法篇",
    collapsable: false,
    children: []
  }, {
    title: "全局API篇",
    collapsable: false,
    children: []
  }, {
    title: "过滤器篇",
    collapsable: false,
    children: []
  }, {
    title: "指令篇",
    collapsable: false,
    children: []
  }, {
    title: "内置组件篇",
    collapsable: false,
    children: []
  }];
}

function getVueNextSidebar() {
  return [{
    title: '核心实现和优化',
    collapsable: false,
    sidebarDepth: 2,
    children: [
      '/vue-next/core/vnode-to-dom'
    ]
  }, {
    title: 'Composition API',
    collapsable: false,
    sidebarDepth: 2,
    children: []
  }, {
    title: '常用功能设计',
    collapsable: false,
    sidebarDepth: 2,
    children: []
  }, {
    title: '总结对比',
    collapsable: false,
    sidebarDepth: 2,
    children: []
  }]
}

function getReactSidebar() {
  return [{
    title: "开始",
    collapsable: false,
    children: [
      '/react/getting-start/基础',
    ]
  }, {
    title: "组件",
    collapsable: false,
    children: [
      '/react/components/深入了解组件'
    ]
  }, {
    title: "redux",
    collapsable: false,
    children: [
      '/react/redux/深入redux'
    ]
  }, {
    title: "hook",
    collapsable: false,
    children: [
      '/react/hook/hook'
    ]
  }, {
    title: "响应式",
    collapsable: false,
    children: [
      '/react/reactive/响应式'
    ]
  }]
}