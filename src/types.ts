export interface ColorItem {
  color: string
  name: string
  range?: number[]
  mixColor?: string
}
export interface Options {
  colorMap?: ColorItem[]
  exclude?: Array<RegExp | string>
  // define your plugin options here
}
