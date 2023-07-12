import { createUnplugin } from 'unplugin'
import tinycolor from 'tinycolor2'
import type { Options } from './types'

const isReg = (s: unknown): s is RegExp => Object.prototype.toString.call(s) === '[object RegExp]'
const isWord = (color: string) => !color.startsWith('#') && !color.startsWith('rgb')

function inject(colorMap: Record<string, string | string[]>, theme: Options['colorMap']) {
  return `
  import tinycolor from 'tinycolor2'
  const theme = ${JSON.stringify(theme)}
  let styleMap = {}
  if (theme && theme.length) {
    theme.forEach((item) => {
      styleMap[item.name] = item
    })
  }
  const el = document.createElement('style')
  el.setAttribute('type', 'text/css')
  el.setAttribute('theme', 'custom')
  let styleObj = {}
  Object.entries(${JSON.stringify(colorMap)}).forEach(([color, key]) => {
    if (Array.isArray(key)) {
      key.forEach(k => {
        styleObj['--' + k] = color
      })
    } else {
      styleObj['--' + key] = color
    }
  })
  const setColor = () => {
    const style = Object.entries(styleObj).reduce((res, item) => {
      const [key, value] = item
      res += \`\${key}:\${value}\;\n\`
      return res
    }, '')
    el.innerHTML = \`
    html {
      \${style}
    }
    \`
  }
  setColor()
  document.body.appendChild(el)
  export const changeColor = (colors, mixColor='#ffffff') => {
    if (typeof colors !== 'object') return
    Object.keys(colors).forEach(key => {
      const color = colors[key]
      if (styleMap[key]) {
        const colorItem = styleMap[key]
        const { range, name } = colorItem
        if (range && range.length) {
          range.forEach(r => {
            const c = tinycolor.mix(mixColor, color, r).toHexString()
            const varName = name + r
            styleObj['--' + varName] = c
          })
        }
      }
      styleObj['--' + key] = color
    })
    setColor()
  }
  `
}

function generateMap(map: Record<string, string | string[]>, key: string, value: string) {
  if (map[key]) {
    if (typeof map[key] === 'string')
      map[key] = [map[key] as string]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    map[key].push(value)
  }
  else {
    map[key] = value
  }
}

export default createUnplugin<Options | undefined>((options) => {
  let exclude: RegExp
  const colorMap: Record<string, string | string[]> = {}
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
      generateMap(colorMap, rgbColor, name)
      generateMap(colorMap, color, name)
      if (range && range.length) {
        regArr = regArr.concat(range.map((r) => {
          const hex = tinycolor.mix(mixColor, color, r).toString('hex')
          colorMap[hex] = name + r
          return `(${hex})`
        }))
      }
      if (!colorReg[color])
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
        return /\.(vue|css|less|sass|scss)/.test(id)
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
