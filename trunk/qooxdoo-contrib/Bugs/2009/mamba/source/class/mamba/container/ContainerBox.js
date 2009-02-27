
/**
 * Initializes the height of the container boxes.
 */
qx.Class.define("mamba.container.ContainerBox",
{
  statics :
  {
    /**
     * TODOC
     *
     * @return {void} 
     */
    init : function()
    {
      var lastLeftJQ  = $("#container-box-left > div:last");
      var lastRightJQ = $("#container-box-right > div:last");

      if (lastLeftJQ.length != 0 && lastLeftJQ.length != 0) {
        this._lastLeftContainerJQ  = lastLeftJQ;
        this._lastRightContainerJQ = lastRightJQ;

        // This page has container boxes -> Align their bottom border
        this._alignBottom();

        // Align again when the page was resized
        if (mamba.DomUtil.isIE) {
          window.attachEvent("onresize", this._createResizeHandler());
        } else {
          window.addEventListener("resize", this._createResizeHandler(), false);
        }
      }
    },

    _createResizeHandler : function() {
      var self = this;
      return function() {
        self.alignContainerBoxes();
      }
    },

    alignContainerBoxes: function() {
      if (this._lastLeftContainerJQ != null) {
        this._lastLeftContainerJQ.height("auto");
        this._lastRightContainerJQ.height("auto");
  
        var self = this;
        window.setTimeout(function() {
          self._alignBottom();
        });
      }
    },

    _alignBottom : function() {
      var leftJQ  = this._lastLeftContainerJQ;
      var rightJQ = this._lastRightContainerJQ;

      var leftTop  = leftJQ[0].offsetTop;
      var rightTop = rightJQ[0].offsetTop;
      var leftBottom  = leftTop  + leftJQ[0].offsetHeight;
      var rightBottom = rightTop + rightJQ[0].offsetHeight;
      var borderAndPadding = 22; // 2 * 10 padding + 2 * 1 border

      // Workaround: IE adds 3 extra pixels. I don't know where they come from.
      //             They don't come from border, padding or margin.
      var correction = (jQuery.boxModel ? 0 : -3);

      if (leftBottom < rightBottom) {
        leftJQ.height(rightBottom - leftTop + correction - borderAndPadding);
      } else {
        rightJQ.height(leftBottom - rightTop + correction - borderAndPadding);
      }
    }
  }
});

oninit(function(){
  mamba.container.ContainerBox.init();
});
