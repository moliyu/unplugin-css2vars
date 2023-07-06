import { createUnplugin } from 'unplugin'

import type { Options } from './types'

export default createUnplugin<Options | undefined>((options) => {
  let exclude: RegExp[] = []
  if (options?.exclude)
    exclude = options.exclude

  return {
    name: 'unplugin-starter',
    transformInclude(id) {
      if (exclude.some(reg => reg.test(id)))
        return
      return /\.(vue|css|less|sass)$/.test(id)
    },
    transform(code) {
      if (options?.colorMap) {
        Object.entries(options.colorMap).forEach((item) => {
          const [key, color] = item
          if (code.includes(color)) {
            let reg: RegExp
            if (color.startsWith('#'))
              reg = new RegExp(color, 'g')
            else
              reg = new RegExp(`\\b${color}\\b`, 'g')
            code = code.replace(reg, `var(${key}, ${color})`)
          }
        })
      }
      return code
    },
  }
})
