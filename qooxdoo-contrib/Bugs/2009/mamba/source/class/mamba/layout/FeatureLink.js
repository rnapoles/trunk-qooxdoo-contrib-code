
/**
 * Conventions for pre-/suffixes:
 *
 * "container" => the block element containing the feature link icon and label
 * "box"       => the block element's size including margin, padding and border
 * "j"         => prefix used for DOM elements wrapped by jQuery
 */
qx.Class.define("mamba.layout.FeatureLink",
{
  statics :
  {
    ID_FEATURELINK_CONTAINER : "#lFeatureLinks",
    CSS_SELECTOR_CONTAINER : ".featurelink",
    CSS_SELECTOR_CONTENT : ".content",
    CSS_SELECTOR_LABEL : ".label",

    // The feature link countainer has a minimum height, needed in order to
    // display all background images.
    MIN_CONTAINER_HEIGHT : 34,


    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      this._resizeCounter = 0;

      // Other feature links outside the feature link containers could be present, too.
      // For instance in the welcome splash. So we are looking for them explicitly
      // in the feature link container.
      this._jContainers = $(this.ID_FEATURELINK_CONTAINER + " " + this.CSS_SELECTOR_CONTAINER);

      // The page does not have feature links
      if (this._jContainers.length === 0) return;

      this._jLabels = $(this.ID_FEATURELINK_CONTAINER + " " + this.CSS_SELECTOR_LABEL);
      this._jContentBox = $(this.ID_FEATURELINK_CONTAINER + " " + this.CSS_SELECTOR_CONTENT);
      this._jFrame = $(this._jContainers.get(0).parentNode);


      var browserIsFF2 = $.browser.mozilla && $.browser.version.substring(0, 3) === "1.8";

      if($.browser.msie || browserIsFF2) {
        $(".featurelink img").css("float", "left");
      } else {
        this._jLabels.css("float", "right");
      }

      this._jContainers.css("visibility", "visible");

      // Max inner width and height of all containers with icon and without label,
      // which should be the dimension of all containers.
      this._dimNorm = this._getMaxDimension(this._jContainers);

      // Dimensions of container's margins, paddings and borders for width and height
      var dimStyle = this._getStyleDimensions(this._jContainers.get(0));

      // Dimensions of container's box width and height, with and without label
      this._dimBox = this._getBoxDimension(this._dimNorm, dimStyle);


      // Showing containers and setting correct margin, to simplify the calculation
      // of the container's box size in the function setting the final container
      // dimension.
      //
      // IE6 will call _setContainerSize() via the resize event handler, although
      // window has not been resized.
      if( !( $.browser.msie && $.browser.version === "6.0" ) ) {
        this._setContainerSize();
      }

      // Labels are floated to right side by CSS stylesheet to simulate the ideal
      // container width and height. But it has to be reset as soon as the
      // container's width gets set to an absolute value. Otherwise the label
      // would stick to the right end.
      if(!$.browser.msie && !browserIsFF2) {
        this._jLabels.css("float", "none");
      }

      var self = this;

      // jQuery's resize function sometimes results in permanent firing of resize
      // event in IE6. Using plugin therefore:
      // http://noteslog.com/post/how-to-fix-the-resize-event-in-ie/
      $(window).wresize(function() {
        self._onWindowResize();
      });
    },




    /*
       ----------------------------------------------------------------------------
       CONTAINER NORMALIZATION
       ----------------------------------------------------------------------------
    */



    /**
     * Sets dimensions for the feature link containers, adhering to the following
     * requirements:
     *
     * 1. Uniform width and height depending on the widest/heighest content of all
     *    containers.
     * 2. The containers should consume the whole available width of the feature link
     *    frame.
     * 3. If more than 2 rows are needed, the containers should shrink, still
     *    obeying conditions 1 and 2.
     *    The first step is shrinking by adding one line break at most. It's done
     *    automatically since the normalization sizes are retrieved for this case
     *    already.
     *    Hiding the label is the last step, explicitly implemented here.
     * 4. If there are more than three containers, they should group into two equal
     *    rows whenever possible.
     * 5. Three or less containers should align in a single row.
     *
     * @return {void}
     */
    _setContainerSize : function()
    {
      var c = this._jContainers;

      if (c.length == 0) {
        return;
      }

      var parentWidth = this._jFrame.width();

      // Inner size with/without label
      var dimNorm = this._dimNorm;

      // Box size with margin, border and padding
      var dimBox = this._dimBox;

      // Containers per row
      var rowLength = Math.min(Math.floor(parentWidth / dimBox.withBreakedLabel.width), c.length);

      // The number of rows needed to show all containers in norm width
      var rowCount = Math.ceil(c.length / rowLength);

      var labelMode;

      // Splitting into two rows if space is enough to put all containers into a
      // single one and there are more than 3 containers.
      if (rowCount === 1)
      {
        if (c.length > 3) {
          rowLength = Math.ceil(c.length / 2);
        }

        this._toggleLabel(true);
        labelMode = "withBreakedLabel";
      }

      // Distribute containers evenly over both rows or put one more in the top row.
      else if (rowCount === 2)
      {
        rowLength = Math.ceil(c.length / 2);
        this._toggleLabel(true);
        labelMode = "withBreakedLabel";
      }

      // Shrinking containers if more than two rows are needed.
      else
      {
        rowLength = Math.ceil(c.length / 2);

        // rowLength = Math.min(Math.floor(parentWidth / dimBox.withoutLabel.width), c.length);
        this._toggleLabel(false);
        labelMode = "withoutLabel";
      }

      // Extra space for each box because parent container is wider than needed.
      var additionalWidth = Math.floor((parentWidth - (dimBox[labelMode].width * rowLength)) / rowLength);
      var boxWidth = dimNorm[labelMode].width + additionalWidth;

      // console.log("dimNorm.withBreakedLabel.width = " +dimNorm.withBreakedLabel.width +", additionalWidth = " +additionalWidth +", boxWidth = " +boxWidth);
      // Resetting labelMode to get correct height
      if (labelMode === "withBreakedLabel" && dimNorm.withLabel.width <= boxWidth) {
        labelMode = "withLabel";
      }

      // Setting final dimensions
      c.css("width", boxWidth);

      this._jContentBox.css("height", Math.max(this.MIN_CONTAINER_HEIGHT, dimNorm[labelMode].height));
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _onWindowResize : function()
    {
      // if( $.browser.msie && ($.browser.version !== "6.0") )
      if ($.browser.msie)
      {
        this._resizeCounter++;
        var counter = this._resizeCounter;

        var self = this;

        window.setTimeout(function() {
          self._onWindowResizeIe(counter);
        }, 50);
      }
      else
      {
        this._setContainerSize();
      }
    },


    /**
     * TODOC
     *
     * @param eventCounter {var} TODOC
     * @return {boolean} TODOC
     */
    _onWindowResizeIe : function(eventCounter)
    {
      if (eventCounter === this._resizeCounter) {
        this._setContainerSize();
      }

      return false;
    },




    /*
       ----------------------------------------------------------------------------
       DIMENSIONS
       ----------------------------------------------------------------------------
    */


    /**
     * Retrieving the box width and height for each container based on the
     *  container dimensions with/without label and comprising the containers'
     *  padding, border and margin.
     *
     * @param dimNorm {var} TODOC
     * @param dimStyle {var} TODOC
     * @return {var} TODOC
     */
    _getBoxDimension : function(dimNorm, dimStyle)
    {
      var w = dimStyle.width;
      var h = dimStyle.height;

      var boxDim =
      {
        withLabel :
        {
          width  : dimNorm.withLabel.width + w,
          height : dimNorm.withLabel.height + h
        },

        withBreakedLabel :
        {
          width  : dimNorm.withBreakedLabel.width + w,
          height : dimNorm.withBreakedLabel.height + h
        },

        withoutLabel :
        {
          width  : dimNorm.withoutLabel.width + w,
          height : dimNorm.withoutLabel.height + h
        }
      };

      return boxDim;
    },


    /**
     * Retrieving sum of padding, border and margin for width and height
     *
     * @param element {var} TODOC
     * @return {Map} TODOC
     */
    _getStyleDimensions : function(element)
    {
      var jEl = $(element);

      return {
        width  : jEl.outerWidth(true) - jEl.width(),
        height : jEl.outerHeight(true) - jEl.height()
      };
    },


    /**
     * Retrieving the biggest values for the containers' inner width and height
     *  in case label is shown and label is hidden.
     *  The sizes are measured for the labels with line break, so these values
     *  represent the smallest possible max dimension.
     *
     * @param containers {var} TODOC
     * @return {var} TODOC
     */
    _getMaxDimension : function(containers)
    {
      var self = this;

      var dim =
      {
        withLabel        : null,
        withBreakedLabel : null,
        withoutLabel     : null
      };

      // Sole icon dimensions ====================================================
      this._toggleLabel(false);
      dim.withoutLabel = getMax(containers);

      // console.log("icon size");
      // console.dir(getMax(containers));
      this._toggleLabel(true);

      // Normal label dimensions =================================================
      dim.withLabel = getMax(containers);

      // Line break label dimensions =============================================
      // Getting labels with line break to measure the biggest container for
      // the minimal container size allowed with a shown label, which happens to
      // be a label with one line break.
      var originalLabelHtml = this._addLineBreak();

      // console.log("breaked size");
      // console.dir(getMax(containers));
      dim.withBreakedLabel = getMax(containers);

      // Break labels are not needed anymore. The line breaks will be inserted
      // by the browser if needed anyway.
      this._removeLineBreak(originalLabelHtml);

      return dim;

      function getMax(c)
      {
        var h = w = 0;

          for (var i=0, l=c.length; i<l; i++)
          {
            if (c[i].offsetWidth > w) {
              w = $(c[i]).width();
            }

            if (c[i].offsetHeight > h) {
              h = $(c[i]).height();
            }
          }

        return { width  : w, height : h };
      }
    },




    /*
       ----------------------------------------------------------------------------
       LABEL
       ----------------------------------------------------------------------------
       */

    /**
     * Updates labels with text containing at most one line break.
     *
     * @return {var} TODOC
     */
    _addLineBreak : function()
    {
      var originalHtml = [];

      var html, jLabel;

      for (var i=0, l=this._jLabels.length, jLabel; i<l; i++)
      {
        jLabel = $(this._jLabels[i]);
        html = jLabel.html();
        originalHtml.push(html);

        if (jLabel.find("br").length === 0) {
          jLabel.html(this._getLineBreakedText(jLabel.html()));
        }
      }

      return originalHtml;
    },


    /**
     * TODOC
     *
     * @param originalHtml {var} TODOC
     * @return {void}
     */
    _removeLineBreak : function(originalHtml)
    {
      for (var i=0, l=this._jLabels.length, jLabel; i<l; i++) {
        $(this._jLabels[i]).html(originalHtml[i]);
      }
    },


    /**
     * Inserts line break element into or near the middle of a string if it
     *  consists of more than a single word, assuming that the string does not
     *  contain any HTML elements.
     *
     * @param text {var} TODOC
     * @return {var} TODOC
     */
    _getLineBreakedText : function(text)
    {
      var newText = text;

      if (jQuery.trim(text).indexOf(" ") !== -1)
      {
        var middle = Math.floor(text.length / 2);
        var splitIndex;

        if (text.charAt(middle) !== " ")
        {
          var lText = text.substring(0, middle);
          var rText = text.substring(middle);

          var lSpaceIndex = lText.length - 1 - lText.lastIndexOf(" ");
          var rSpaceIndex = rText.indexOf(" ");

          if (lSpaceIndex < rSpaceIndex || rSpaceIndex == -1) {
            splitIndex = lText.lastIndexOf(" ");
          } else {
            splitIndex = lText.length + rText.indexOf(" ");
          }
        }
        else
        {
          splitIndex = middle;
        }

        newText = text.substring(0, splitIndex) + "<br/>" + text.substring(splitIndex + 1);
      }

      return newText;
    },


    /**
     * Toggling the feature link's label.
     *
     * @param show {var} TODOC
     * @return {void}
     */
    _toggleLabel : function(show)
    {
      var display = show ? "block" : "none";
      this._jLabels.css("display", display);
    }
  }
});

oninit(function() {
  mamba.layout.FeatureLink.init();
});