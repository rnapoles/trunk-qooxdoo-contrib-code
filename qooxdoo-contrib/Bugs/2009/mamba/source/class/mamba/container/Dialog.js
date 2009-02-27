qx.Class.define("mamba.container.Dialog",
{
  statics :
  {
    /* 0-100 (int) : 0 is off/transparent, 100 is opaque */
    OVERLAY_TRANSPARENCY: 60,

    init : function(id, options)
    {
      if(!options) {
        options = {}
      }

      if(options.modal) {
        options.overlay = this.OVERLAY_TRANSPARENCY;
      } else {
        // [TBD] does not work yet.
        options.overlay = 0;
        // in case options.modal is undefined
        options.modal = false;
      }

      $('#' +id).jqm(options);
    },

    show : function(id) {
     $('#' +id).jqmShow();
    },

    hide : function(id) {
      $('#' +id).jqmHide();
    }
  }
});
