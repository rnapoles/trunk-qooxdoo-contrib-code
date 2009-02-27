qx.Class.define("mamba.nxfix.ErrorBox",
{
  statics :
  {
    // ID is set in nxfix/xsl/tmpl_nxbox.xsl
    ELEMENT_ID_ERROR_LINKS : "#nxErrorLinks",
    CSS_SELECTOR_ERROR : "error",


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this._jLinks = $(this.ELEMENT_ID_ERROR_LINKS + " > a");
      if (this._jLinks.length === 0) return;

      this._linkClass2input = {};

      // [ { element : xxx, labelId : xxx }, ... ]
      this._linkList = [];

      var eLink, jInput, self = this;

      this._jLinks.each(function(i)
      {
        self._setLabel(this);
        jInput = self._addInput(this);
        self._setOnClickLinkHandler(this, jInput);
      });

      this._sortLinks();
      this._setOnKeydownInputHandlers();

      $(this.ELEMENT_ID_ERROR_LINKS).css("visibility", "visible");
    },


    /**
     * TODOC
     *
     * @param eLink {var} TODOC
     * @return {var} TODOC
     */
    _addInput : function(eLink)
    {
      var id = eLink.href.substring(eLink.href.lastIndexOf("#") + 1);

      // Must use jQuery to get element because of IE7 bug that would
      // retrieve the anchor link instead of the field element because
      // its NAME attribute has the ID as value!
      // Clumsy select call because of point char in ID.
      var jInput = $("[id=" + id + "]");
      this._linkClass2input[eLink.className] = jInput;
      return jInput;
    },


    /**
     * TODOC
     *
     * @param eLink {var} TODOC
     * @return {void}
     */
    _setLabel : function(eLink)
    {
      // Have to search over ID attribute explicitly because of point char in ID.
      var jLabel = $("[id=" + eLink.className + "]");
      var label = $.trim(jLabel.text());
      eLink.innerHTML = label;

      this._linkList.push(
      {
        element : eLink,
        labelId : eLink.className
      });
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _sortLinks : function()
    {
      if (this._linkList.length < 2) return;

      var html = document.body.innerHTML;
      var indexMap = {};
      var sortList = [];

      var index;

      for (var i=0, l=this._linkList.length; i<l; i++)
      {
        index = html.lastIndexOf(this._linkList[i].labelId);
        indexMap[index] = this._linkList[i];
        sortList.push(index);
      }

      sortList.sort(function(a, b) {
        return a - b;
      });

      var parent = $(this.ELEMENT_ID_ERROR_LINKS);
      parent.empty();

      for (var i=0, l=sortList.length; i<l; i++)
      {
        parent.append(indexMap[sortList[i]].element);

        if (i < l - 1) {
          parent.append(", ");
        }
      }
    },


    /**
     * TODOC
     *
     * @param eLink {var} TODOC
     * @param jInput {var} TODOC
     * @return {void}
     */
    _setOnClickLinkHandler : function(eLink, jInput)
    {
      eLink.onclick = function()
      {
        window.setTimeout(function() {
          jInput[0].focus();
        }, 100);
      };
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _setOnKeydownInputHandlers : function()
    {
      var jLink;
      var self = this;

      for (var lClass in this._linkClass2input)
      {
        jLink = $("[class=" + lClass + "]:first");

        // Must set handler in closure function to use the proper eLink
        setHandler(this._linkClass2input[lClass], jLink);
      }

      function setHandler(jInput, jLink)
      {
        jInput.keydown(function()
        {
          // Reset default style
          $(this).removeClass(self.CSS_SELECTOR_ERROR);

          // Remove link
          jLink.css("display", "none");

          // jLink.fadeOut(1000);
          // Remove comma
          var sibling = jLink[0].previousSibling;

          if (!sibling) {
            sibling = jLink[0].nextSibling;
          }

          if (sibling && sibling.nodeType === 3)
          {
            // var fadeOutWrapper = document.createElement("div");
            // fadeOutWrapper.style.display = "inline";
            // $(sibling).wrap(fadeOutWrapper);
            // $(fadeOutWrapper).fadeOut(1000);
            $(sibling).remove();
          }
        });
      }
    }
  }
});

oninit(function() {
  mamba.nxfix.ErrorBox.init();
});