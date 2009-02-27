
/**
 * Mamba global warning scripts
 */
qx.Class.define("mamba.GlobalWarning",
{
  statics :
  {
    DIALOG_ID : "globalwarning",
    changed : false,


    /**
     * TODOC
     *
     * @param obFields {var} TODOC
     * @return {void}
     */
    init : function(obFields)
    {
      this.reset();

      if (obFields.length != 0) {
        this.observeInputFields(obFields);
      } else {
        this.observeAll();
      }

      this.__registerEvents();

      mamba.container.Dialog.init(this.DIALOG_ID, { modal : true, trigger : false });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    __registerEvents : function()
    {
      var self = this;

      $("a[href:not(contains('#'))]").click(function()
      {
        if (self.changed == true)
        {
          self.confirm(this.href);
          return false;
        }
      });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    reset : function() {
      this.changed = "false";
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    observeAll : function()
    {
      var self = this;
      $('input').bind("change", function(e) {
        self.changed = true;
      });
    },


    /**
     * TODOC
     *
     * @param obFieldNames {var} TODOC
     * @return {void}
     */
    observeInputFields : function(obFieldNames)
    {
      var self = this;

      for (var i=0, l=obFieldNames.length; i<l; i++)
      {
        $('[name=' + obFieldNames[i] + ']').bind("change", function(e) {
          self.changed = true;
        });
      }
    },


    /**
     * TODOC
     *
     * @param callback {var} TODOC
     * @return {void}
     */
    confirm : function(callback)
    {
      var self = this;

      mamba.container.Dialog.show(this.DIALOG_ID);

      $("#"+this.DIALOG_ID).find('div[class:contains(globalwarningbutton_)]').click(function()
      {
        if ($(this).hasClass('globalwarningbutton_yes')){
          (typeof callback == 'string') ? window.location.href = callback : callback();
        }

        mamba.container.Dialog.hide(self.DIALOG_ID);
      });
    }
  }
});

oninit(function()
{
  if (typeof jqmGlobalWarning != "undefined") {
    mamba.GlobalWarning.init(jqmGlobalWarning);
  }
});