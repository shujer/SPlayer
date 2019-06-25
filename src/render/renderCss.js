import { getRange } from '../utils/bar'

export default class RenderCss {
  constructor (el, style, data, duration) {
    this.el = el
    this.style = style
    this.data = data
    this.duration = duration
  }

  initialize () {
    let WIDTH = this.el.clientWidth

    let HEIGHT = this.el.clientHeight * 0.8

    let num = this.data.length

    if (num <= 0) return

    let { range, minHeight } = getRange(this.data)

    // bar width
    let itemWidth =
      this.style.itemStyle.width === 'auto'
        ? WIDTH / num
        : this.style.itemStyle.width

    // space between bar
    let space =
      itemWidth * Number(this.style.itemStyle.space.replace('%', '')) * 0.01

    let count = 0

    this.el.style.backgroundColor = this.style.normal.backgroundColor
    this.el.style.overflow = 'hidden'

    let dom = document.createDocumentFragment()
    while (count < num) {
      let item = document.createElement('div')
      let label = document.createElement('div')
      let itemHeight = ((this.data[count] - minHeight) / range) * HEIGHT + 14

      // label style
      label.innerText = this.data[count]
      label.style.fontSize = '12px'
      label.style.textAlign = 'center'
      label.style.height = '14px'
      label.style.backgroundColor = this.style.normal.backgroundColor
      label.style.color = this.style.normal.color
      label.style.width = '100%'

      // bar item style
      item.classList.add('splayer-css-item')
      item.appendChild(label)
      item.style.backgroundColor = this.style.itemStyle.backgroundColor
      item.style.position = 'absolute'
      item.style.bottom = '0'
      item.style.width = `${itemWidth - space}px`
      item.style.height = `${itemHeight > 2 ? itemHeight : 2}px`
      item.style.display = `inline-block`
      item.style.transition = `transform ${this.duration}ms ease-out`
      item.style.transform = `translate3d(${itemWidth * count +
        space * 0.5}px, 0, 0)`
      dom.appendChild(item)
      count++
    }
    this.el.appendChild(dom)
    this.el.style.position = 'relative'
    this.items = [...this.el.children]

    // enlarge when hover
    this.el.addEventListener('mouseover', e => {
      if (e.target.className === 'splayer-css-item') {
        e.target.style.transform += `scale3d(1.05, 1.1, 1) translateY(-5%)`
      }
    })

    this.el.addEventListener('mouseout', e => {
      if (e.target.className === 'splayer-css-item') {
        e.target.style.transform = e.target.style.transform.replace(
          `scale3d(1.05, 1.1, 1) translateY(-5%)`,
          ''
        )
      }
    })
  }

  swap ({ step, flag }) {
    let [i, j] = step
    this.items.forEach(item => {
      item.style.backgroundColor = this.style.itemStyle.backgroundColor
      item.style.zIndex = 1
    })
    let pi = this.items[i].style.transform
    let pj = this.items[j].style.transform
    this._setEmphasis(this.items[i], pj, flag)
    this._setEmphasis(this.items[j], pi, flag)
    if (flag) [this.items[i], this.items[j]] = [this.items[j], this.items[i]]
  }

  _setEmphasis (el, transform, flag) {
    if (flag) {
      el.style.transform = transform
    }
    el.style.backgroundColor = this.style.itemStyle.emphasisColor
    el.style.zIndex = this.data.length
  }
}
