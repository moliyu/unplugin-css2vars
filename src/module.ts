declare module 'virtual:theme' {
  /**
   * ### example
   * changeColor({
   *  'theme-color': '#eeeeee'
   * })
   */
  function changeColor(colors: Record<string, string>, mixColor: string): void
}
