# learn source code

是一个前端开发。

学习 vue ，是从官方文档开始的，非常的详细。工作中也使用了挺多了，但是有时候遇到问题的时候排查时比较麻烦，或者对于一些用法选择上不知道怎么评估是否合理，另外也比较好奇，想了解基本实现原理，多读代码。

所以这个文档主要是记录自己的学习过程，以及一些了解。其实自己从头开始，感觉不知道怎么下手，有点拖。所以是从看一些社区的文章开始的，也是从这个时候开始想进一步去学习源码，加深自己的理解，希望也能给大家带来一点帮助。

react 自己还没开始在工作中使用，看了文档，忘了差不多了... 记性太差还是得整理才可以。再找个开源的项目学习吧，熟悉使用之后也学习和整理相关的核心源码学习笔记。

### 学习安排

- 数据驱动：怎么有一个 vue 文件生产看到的页面？
- 组件：vue 文档强调组件的重要性，那组件是什么？
- 响应式：`this.foo = bar` 更新一个值之后页面怎么做到更新的？
- 实例方法：`$set, $on, $watch`...方法是怎么实现的？
- 全局API：`nextTick` 到底什么时候执行？
- 生命周期：`created` 的时候为什么访问不到 DOM？
- 指令：`v-model` 是如何实现的？
- 过滤器：可被用于一些常见的文本格式化，如何实现呢？
- 内置组件：动态组件用到的 `component` 到底是一个什么样的组件？
- 编译：打包的时候 vue-loader 最终会把 `.vue` 变成什么样呢？

### 文章参考

- [Vue 官方文档](https://cn.vuejs.org/v2/guide/)
- [Vue API](https://cn.vuejs.org/v2/api/)
- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
- [Vue.js 源码解析](https://github.com/answershuto/learnVue)
- [逐行剖析 Vue.js 源码](https://github.com/NLRX-WJC/Learn-Vue-Source-Code)