# Read Vue 2

先从 Vue 2 开始 :flight_departure:

### 源码目录

看的是 [`vue 2.6.11`](https://github.com/vuejs/vue/releases/tag/v2.6.11) 的代码，vue 的的项目结构如下。

```sh
|-dist                     # 打包构建之后生成的文件
|-examples                 # 使用例子
|-flow                     # flow 类型生命文件
|-scripts                  # 构建脚本和配置文件
|-src                      # 项目源码
    |-compiler             # 编译相关
    |-core                 # 核心代码
        |-components       # 内置组件 keep-alive
        |-global-api       # 全局 api
        |-instance         # 组件实例相关
        |-observer         # 变化检测响应式相关
        |-util             # 一些方法 next-tick 等
        |-vdom             # 实现 virtual dom 相关
    |-platforms            # 不同平台的支持（web, weex）
    |-server               # 服务端渲染
    |-sfc                  # .vue 文件的解析
    |-shared               # 项目共用的方法
|-test                     # 项目的测试代码
```

### 学习安排

看一个项目代码的时候，最好是能找到一条主线，先把大体流程结构摸清楚，再深入到细节。所以这里主要按照下边这个过程进行学习，通过前面的数据驱动、组件和响应式可以了解 vue 是怎么工作的，接下来比较细化的去看对应功能和 API 的实现方式。

- 数据驱动：怎么由一个 vue 文件生产看到的页面？
- 组件：vue 文档强调组件的重要性，那组件是什么？
- 响应式：`this.foo = bar` 更新一个值之后页面怎么做到更新的？
- 实例方法：`$set, $on, $watch`...方法是怎么实现的？
- 全局API：`nextTick` 到底什么时候执行？
- 生命周期：`created` 的时候为什么访问不到 DOM？
- 指令：`v-model` 是如何实现的？
- 过滤器：可被用于一些常见的文本格式化，如何实现呢？
- 内置组件：动态组件用到的 `component` 到底是一个什么样的组件？
- 编译：打包的时候 vue-loader 最终会把 `.vue` 变成什么样呢？
- 总结：源码的功能实现思维导图，整理相关方法的写法

### 文章参考

- [Vue 官方文档](https://cn.vuejs.org/v2/guide/)
- [Vue API](https://cn.vuejs.org/v2/api/)
- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
- [Vue.js 源码解析](https://github.com/answershuto/learnVue)
- [Vue2.1.7源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)
- [逐行剖析 Vue.js 源码](https://github.com/NLRX-WJC/Learn-Vue-Source-Code)