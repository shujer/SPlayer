export default class RenderCanvas {
    constructor (itemWidth, stepWidth, data) {
      this.itemWidth = itemWidth || '10px'
      this.stepWidth = stepWidth || '15px'
      this.data = data
    }
  
    initialize (data) {}
  
    setItemStyle (style = '') {
      let items = document.querySelectorAll('splayer-css-item')
      items.forEach(item => {
        item.style = style
      })
    }
  }
  