qx.Class.define("mamba.ui.Pager",
{
  extend : qx.core.Object,

  construct : function(pages, interval, currentPage)
  {
    this.pagerPageNumber = "div.pager_pagenumber";
    this.pages = pages;
    this.interval = interval;
    this.currentPage = currentPage;
    this._init();
  },

  members :
  {
    /**
     * TODOC
     *
     * @return {void} 
     */
    _init : function() {
      this._insertPageNumbers();
    },

    /*
         * _insertPageNumbers
         * gets <input>-Tags needes from template pager_displayamount
         * clones and inserts nodes into pager
         */

    /**
     * TODOC
     *
     * @return {void} 
     */
    _insertPageNumbers : function()
    {
      var jPagerNumberButton = $(this.pagerPageNumber);

      for (var i=this.pages; i>0; i--)
      {
        if (this.pages <= 8)
        {  // Show all
          this._createButton(i, jPagerNumberButton);
        }
        else if (this.currentPage < 7)  // Show first 7 pages and the last one
        {
          if (i < 8 || i == this.pages) {
            this._createButton(i, jPagerNumberButton);
          } else if (i == 8) {
            this._createDots(jPagerNumberButton);
          }
        }
        else if (this.currentPage > this.pages - 6)  // Show the last 7 pages and the first one
        {
          if (i > this.pages - 7 || i == 1) {
            this._createButton(i, jPagerNumberButton);
          } else if (i == 8) {
            this._createDots(jPagerNumberButton);
          }
        }
        else  // Show the middle 5 pages and the last and first ones
        {
          if ((i >= this.currentPage - 2 && i <= this.currentPage + 2) || i == 1 || i == this.pages) {
            this._createButton(i, jPagerNumberButton);
          } else if (i == 2 || i == this.pages - 1) {
            this._createDots(jPagerNumberButton);
          }
        }
      }

      /*
              Disabled current page button
            */

      // var jPage = $("span.pager_pagenumber:eq("+this.currentPage+")");
      var jPage = $("input.pager_sbmt[@value=" + this.currentPage + "]");

      // jPage.children()[0].disabled = true;
      jPage.attr("disabled", true);

      /*
              remove the first span
              <span class="pager_pagenumber">
            */

      var jPlink = $("div.pager_pagenumber:eq(0)");
      jPlink.empty();
    },


    /**
     * TODOC
     *
     * @param index {var} TODOC
     * @param jPNB {var} TODOC
     * @return {void} 
     */
    _createButton : function(index, jPNB)
    {
      var clonedEl = jPNB.clone();
      var children = clonedEl.children();

      children[0].alt = index;
      children[0].value = index;
      children[2].value = index;

      // children[1].value=this.interval;
      // Replace Pustefix Button name
      var name = children[0].name.substring(7, children[0].name.length - 1);  // ID after __SBMT:
      var newName = name + index;
      var regExp = new RegExp(name, "gi");
      children[0].name = children[0].name.replace(regExp, newName);
      children[1].name = children[1].name.replace(regExp, newName);
      children[2].name = children[2].name.replace(regExp, newName);
      children[3].name = children[3].name.replace(regExp, newName);

      clonedEl.insertAfter(jPNB);
    },


    /**
     * TODOC
     *
     * @param jPNB {var} TODOC
     * @return {void} 
     */
    _createDots : function(jPNB)
    {
      var clonedEl = jPNB.clone();

      clonedEl.removeClass("pager_pagenumber");
      clonedEl.html("...");
      clonedEl.insertAfter(jPNB);
    }
  }
});

oninit(function()
{
  if (typeof pagevarPages != "undefined")
  {
    var pages = pagevarPages;
    var interval = pagevarInterval;
    var currentPage = pagevarCurrentPage;
    new mamba.ui.Pager(pages, interval, currentPage);
  }
});