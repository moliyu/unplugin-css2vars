# unplugin-css2vars

提取项目中的css替换为css变量



## Install

```bash
yarn add unplugin-css2vars -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Css2Vars from 'unplugin-starter/vite'

export default defineConfig({
  plugins: [
    Css2Vars({
      colorMap: {
        '--red-color': 'red',
        '--theme-color': '#409eff',
        '--black': '#333333',
      },
      exclude: [/\.test\.vue/]
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Css2Vars from 'unplugin-starter/rollup'

export default {
  plugins: [
    Css2Vars({
      colorMap: {
        '--red-color': 'red',
        '--theme-color': '#409eff',
        '--black': '#333333',
      },
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
    require('unplugin-starter/webpack')({
      colorMap: {
        '--red-color': 'red',
        '--theme-color': '#409eff',
        '--black': '#333333',
      },
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
    ['unplugin-starter/nuxt', {
      colorMap: {
        '--red-color': 'red',
        '--theme-color': '#409eff',
        '--black': '#333333',
      },
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
      require('unplugin-starter/webpack')({
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



