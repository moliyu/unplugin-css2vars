# unplugin-css2vars

提取项目中的css替换为css变量

# example

```ts
Css2Vars({
  colorMap: [
    { color: '#409eff', name: 'theme-color', range: [90, 80, 70], mixColor: '#ffffff' }, // range生成对应的色阶
    { color: '#ff0000', name: 'red-color' },
  ],
  exclude: [/\.test\.vue/] // 配置排除文件 RegExp | string []
}),
// 将会注入
<style type="text/css" theme="custom">
--theme-color: #409eff;
--theme-color90: #53a8ff;
--theme-color80: #66b1ff;
--theme-color70: #79bbff;
--red-color: #ff0000;
</style>
```

# Tip

1. 最好不要直接匹配`red`,`yellow`这样的单词颜色，这可能会误伤你的代码
2. webpack最好排除文件index.html


## Install

```bash
yarn add unplugin-css2vars -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Css2Vars from 'css2vars/vite'

export default defineConfig({
  plugins: [
    Css2Vars({
      colorMap: [
        { color: '#409eff', name: 'theme-color', range: [90, 80, 70], mixColor: '#ffffff' },
        { color: '#ff0000', name: 'red-color' },
      ],
      exclude: [/\.test\.vue/] // 配置排除文件 RegExp | string []
    }),
  ],
})

// main.ts
import 'virtual:theme'

// changeColor
import { changeColor } from 'virtual:theme'

changeColor({
  'theme-color': 'red',
  'red-color': '#eeeeee'
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Css2Vars from 'css2vars/rollup'

export default {
  plugins: [
    Css2Vars({
      colorMap: [
        { color: '#409eff', name: 'theme-color', range: [90, 80, 70] },
        { color: '#ff0000', name: 'red-color' },
      ],
      exclude: [/\.test\.vue/]
    }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('css2vars/webpack').default({
      colorMap: [
        { color: '#409eff', name: 'theme-color', range: [90, 80, 70] },
        { color: '#ff0000', name: 'red-color' },
      ],
      exclude: [/\.test\.vue/]
    })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['css2vars/nuxt', {
      colorMap: [
        { color: '#409eff', name: 'theme-color', range: [90, 80, 70] },
        { color: '#ff0000', name: 'red-color' },
      ],
      exclude: [/\.test\.vue/]
    }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('css2vars/webpack')({
        colorMap: {
          '--red-color': 'red',
          '--theme-color': '#409eff',
          '--black': '#333333',
        },
        exclude: [/\.test\.vue/]
      }),
    ],
  },
}
```



