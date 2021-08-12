/**
 * Alongpath component for A-Frame.
 * Move Entities along a predefined Curve
 */

AFRAME.registerComponent('alongpath-scroll', {
  schema: {
        curve: {default: '[curve]'},
  },
  init() {
    console.log("init")
    this.curve = document.querySelector(this.data.curve);
    document.addEventListener('scroll', (e) => {
      console.log("scroll")
      this.onscroll()
    })
  },
  onscroll() {
    console.log("doing scroll thing",this._get_scroll_percentage())
    const newPos = this.curve.components['curve'].curve.getPoint(this._get_scroll_percentage())
    this.el.setAttribute('position', newPos);
  },
 /**
   * Get current browser viewpane heigtht
   */
  _get_window_height: function() {
      return window.innerHeight || 
             document.documentElement.clientHeight ||
             document.body.clientHeight || 0;
  },

  /**
   * Get current absolute window scroll position
   */
  _get_window_Yscroll() {
      return window.pageYOffset || 
             document.body.scrollTop ||
             document.documentElement.scrollTop || 0;
  },

  /**
   * Get current absolute document height
   */
  _get_doc_height() {
      return Math.max(
          document.body.scrollHeight || 0, 
          document.documentElement.scrollHeight || 0,
          document.body.offsetHeight || 0, 
          document.documentElement.offsetHeight || 0,
          document.body.clientHeight || 0, 
          document.documentElement.clientHeight || 0
      );
  },

  /**
   * Get current vertical scroll percentage
   */
  _get_scroll_percentage() {
      return (
          (this._get_window_Yscroll() + this._get_window_height()) / this._get_doc_height()
      ) /** 100;*/
  },
})
