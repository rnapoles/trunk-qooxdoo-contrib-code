/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * 
 */
qx.Class.define("contribdemobrowser.DemoBrowser",
{
  extend : demobrowser.DemoBrowser,

  construct : function()
  {
    this.base(arguments);
  },
  
  members :
  {
    /**
     * Creates the application header.
     */
    _createHeader : function()
    {
      var layout = new qx.ui.layout.HBox();
      var header = new qx.ui.container.Composite(layout);
      header.setAppearance("app-header");
    
      var title = new qx.ui.basic.Label("Contrib Demo Browser");
    
      header.add(title);    
      return header;
    },
    
    /**
     * Loads the sample preceding the currently selected one
     * 
     * @param {Event} e
     */
    playPrev : function(e)
    {
      var currSamp = this.tree.getSelection()[0];  // widget

      if (!currSamp) {
        return;
      }

      var otherSamp = null;
      var sample = currSamp;
      while (sample) {
        var prev = this.tree.getPreviousNodeOf(sample);
        if (prev instanceof qx.ui.tree.TreeFile) {
          otherSamp = prev;
          break;
        } else {
          sample = prev;
        }
      }

      if (otherSamp) {
        this.tree.setSelection([otherSamp]);
        this.runSample();
      } else {
        // Remove stop button, display run button
        this._stopbutton.setVisibility("excluded");
        this._runbutton.setVisibility("visible");
      }
    },
    
    /**
     * Loads the sample following the currently selected one
     * 
     * @param {Event} e
     */
    playNext : function(e)
    {
      var currSamp = this.tree.getSelection()[0];  // widget

      if (!currSamp) {
        return;
      }

      var otherSamp = null;
      var sample = currSamp;
      while (sample) {
        var next = this.tree.getNextNodeOf(sample);
        if (next instanceof qx.ui.tree.TreeFile) {
          otherSamp = next;
          break;
        } else {
          sample = next;
        }
      }

      if (otherSamp) {
        this.tree.setSelection([otherSamp]);
        this.runSample();
      } else {
        // Remove stop button, display run button
        this._stopbutton.setVisibility("excluded");
        this._runbutton.setVisibility("visible");
      }
    }
  }
});
