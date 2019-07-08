import checkType from './utils/type.js'
import sortTypes from './const/sortType'
import RenderCss from './render/renderCss.js'
import RenderCanvas from './render/renderCanvas.js'
import style from './const/itemStyle'
import algorithmn from './utils/alg.js'
/**
 * 计划完成：
 * 1. 绘制形式：css绘制 / canvas 绘制
 * 2. 自定义算法暴露接口：swap
 * 3. 排序算法：冒泡、选择、插入、快排
 * 4. 自定义样式：间隔、颜色、溢出滚动
 */
export default class SPlayer {
  constructor ({
    el,
    data = [],
    sortType,
    customSort,
    duration = 1000,
    renderer = 'css',
    itemStyle = {}
  }) {
    if (
      !el ||
      !checkType.isArray(data) ||
      (!sortTypes.includes(sortType) && !checkType.isFunction(customSort))
    ) {
      throw Error('param missing')
    }
    this.el = el
    this.data = [...data]
    this.sortType = checkType.isFunction(customSort)
      ? 'custom'
      : sortType || 'bubble'
    this.duration = duration
    this.renderer = renderer
    this.oldstack = []
    this.stack = []
    this.RenderUtils =
      this.renderer === 'css'
        ? new RenderCss(
          this.el,
          { ...style, ...itemStyle },
          [...this.data],
          duration
        )
        : new RenderCanvas(
          this.el,
          { ...style, ...itemStyle },
          [...this.data],
          duration
        )
    this._init()
  }

  _init () {
    this.RenderUtils.initialize()
    this.stack = algorithmn[this.sortType]([...this.data])
  }

  // step in every duration
  start () {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      let hasNext = this.step()
      if (hasNext) {
        this.timer = setTimeout(() => {
          this.start()
        }, this.duration)
      }
    }, this.duration)
  }

  reset () {
    clearTimeout(this.timer)
    while (this.oldstack.length) {
      this.stack.unshift(this.oldstack.pop())
    }
    this.RenderUtils.initialize()
  }

  stop () {
    clearTimeout(this.timer)
  }

  // change view step by step
  step () {
    let step = this.stack.shift()
    if (!step) {
      return false
    }
    this.oldstack.push(step)
    this.RenderUtils.swap(step)
    return true
  }

  // cancel last step
  undo () {
    let step = this.oldstack.pop()
    if (!step) {
      return false
    }
    this.stack.unshift(step)
    this.RenderUtils.swap(step)
    return true
  }
}
