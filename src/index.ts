import { createUnplugin } from 'unplugin'

import tinycolor from 'tinycolor2'
import type { Options } from './types'

const isReg = (s: unknown): s is RegExp => Object.prototype.toString.call(s) === '[object RegExp]'
const isWord = (color: string) => !color.startsWith('#') && !color.startsWith('rgb')

function inject(colorMap: Record<string, string>, theme: Options['colorMap']) {
  return `
  import tinycolor from 'tinycolor2'
  const theme = ${JSON.stringify(theme)}
  let styleMap = {}
  if (theme && theme.length) {
    theme.forEach((item) => {
      styleMap[item.name] = item
    })
  }
  const el = document.getElementsByTagName('html')[0]
  if (el) {
    Object.entries(${JSON.stringify(colorMap)}).forEach(([color, key]) => {
      el.style.setProperty('--'+key, color)
    })
  }
  export const changeColor = (colors, mixColor='#ffffff') => {
    if (typeof colors !== 'object') return
    Object.keys(colors).forEach(key => {
      if (styleMap[key]) {
        const color = colors[key]
        const colorItem = styleMap[key]
        const { range, name } = colorItem
        if (range && range.length) {
          range.forEach(r => {
            const c = tinycolor.mix(mixColor, color, r).toHexString()
            const varName = name + r
            el.style.setProperty('--' + varName, c)
          })
        }
        el.style.setProperty('--' + name, color)
      }
    })
  }
  `
}

export default createUnplugin<Options | undefined>((options) => {
  let exclude: RegExp
  const colorMap: Record<string, string> = {}
  const colorReg: Record<string, RegExp> = {}
  if (options?.exclude) {
    exclude = new RegExp(options.exclude.map((item) => {
      return isReg(item) ? item.source : item
    }).join('|'))
  }
  if (options?.colorMap) {
    options.colorMap.forEach((colorItem) => {
      const { color, name, range, mixColor = '#ffffff' } = colorItem
      const rgbColor = tinycolor(color).toString('rgb')
      const regStr = isWord(color) ? `(\\b${color}\\b)` : `(${color})`
      let regArr = [regStr, `${rgbColor}`]
      // 优先hex
      colorMap[rgbColor] = name
      colorMap[color] = name
      if (range && range.length) {
        regArr = regArr.concat(range.map((r) => {
          const hex = tinycolor.mix(mixColor, color, r).toString('hex')
          colorMap[hex] = name + r
          return `(${hex})`
        }))
      }
      colorReg[color] = new RegExp(regArr.join('|'), 'ig')
    })
  }

  const virtualModuleId = 'virtual:theme'
  const resolveId = `\0${virtualModuleId}`

  return [
    {
      name: 'css2Vars',
      enforce: 'pre',
      resolveId(id) {
        if (id.endsWith('virtual:theme'))
          return resolveId
      },
      load(id) {
        if (id === resolveId)
          return inject(colorMap, options?.colorMap)
      },
      loadInclude(id) {
        return id === resolveId
      },
      transformInclude(id) {
        if (exclude.test(id))
          return
        return /\.(vue|css|less|sass|html)$/.test(id)
      },
      transform(code) {
        if (options?.colorMap) {
          options.colorMap.forEach((item) => {
            const { color } = item
            const reg = colorReg[color]
            if (reg.test(code)) {
              code = code.replace(reg, (s) => {
                const varName = colorMap[s]
                return `var(--${varName})`
              })
            }
          })
        }
        return code
      },
    },
  ]
})
