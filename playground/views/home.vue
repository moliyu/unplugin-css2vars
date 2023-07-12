<script setup>
import { changeColor } from 'virtual:theme'

window._changeColor = changeColor

function change(colorKey, color) {
  changeColor({ [colorKey]: color })
}
</script>

<template>
  <div class="test">
    test1
  </div>
  <div class="purple">
    紫颜色
  </div>
  <div style="color:#409eff">
    内联测试
  </div>
  <div class="test2">
    test2
  </div>
  <div style="color: #ff0000">
    redcolor
  </div>
  <div class="test4">
    test4
  </div>
  <button @click="change('theme-color', 'yellow')">
    change theme to yellow
  </button>
  <button @click="change('red-color', 'orange')">
    change redcolor to blue
  </button>
</template>

<style scoped>
.test {
  color: #409eff;
}
.test2 {
  background: var(--test-color);
}
.test4 {
  color: #ffffff;
}
.purple {
  color: #66b1ff;
}
</style>
