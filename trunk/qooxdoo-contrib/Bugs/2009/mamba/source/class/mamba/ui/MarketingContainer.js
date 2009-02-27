/**
 * A marketing container showing multiple teasers.
 */
qx.Class.define("mamba.ui.MarketingContainer",
{
  extend : qx.core.Object,

  /**
   * Creates a container.
   *
   * @param containerJQ {jQuery} the parent element of the teaser elements
   */
  construct : function(containerJQ) {
    var prevBtn = mamba.ui.Button.getButtonForJQ(containerJQ.find("#prev"));
    prevBtn.addListener("click", this.showPrevious, this);

    var nextBtn = mamba.ui.Button.getButtonForJQ(containerJQ.find("#next"));
    nextBtn.addListener("click", this.showNext, this);

    this._teaserArr = [];
    var teaserJQ = containerJQ.children("div[@class='teaser']");
    for (var i = 0; i < teaserJQ.length; i++) {
      this.addTeaser(teaserJQ[i]);
    }

    this.showRandomTeaser();
  },

  members : {
    /**
     * Adds a teaser to the container.
     * <p>
     * The teaser element may have a data attribute defining a weight.
     * The weight may be any float. Default is 1.
     *
     * @param {Element} teaserEl the element showing the teaser.
     */
    addTeaser : function(teaserEl) {
      var teaserData = mamba.DomUtil.getElemData(teaserEl);

      var teaserInfo = {
        teaserJQ: $(teaserEl),
        weight: (teaserData.weight ? teaserData.weight : 1)
      };

      this._teaserArr.push(teaserInfo);
    },

    /**
     * Shows a random teaser considering the teaser weights.
     */
    showRandomTeaser: function() {
      var totalWeight = 0;
      for (var i = 0; i < this._teaserArr.length; i++) {
        totalWeight += this._teaserArr[i].weight;
      }

      var rnd = Math.random() * totalWeight;

      for (var i = 0; i < this._teaserArr.length; i++) {
        rnd -= this._teaserArr[i].weight;
        if (rnd <= 0) {
          this.showTeaser(i);
          break;
        }
      }
    },

    /**
     * Shows a certain teaser. If the index is out of bounds it will be wrapped.
     *
     * @param index {Integer} the index of the teaser to show
     */
    showTeaser: function(index) {
      if (index < 0) {
        index = this._teaserArr.length - 1;
      } else if (index >= this._teaserArr.length) {
        index = 0;
      }

      if (this._shownIndex != null) {
        this._teaserArr[this._shownIndex].teaserJQ.hide();
      }

      this._teaserArr[index].teaserJQ.show();
      this._shownIndex = index;

      // Re-align the container boxes
      mamba.container.ContainerBox.alignContainerBoxes();
    },

    /**
     * Shows the previous teaser.
     */
    showPrevious: function() {
      this.showTeaser(this._shownIndex - 1);
    },

    /**
     * Shows the next teaser.
     */
    showNext: function() {
      this.showTeaser(this._shownIndex + 1);
    }

  },

  statics: {
    /**
     * Creates a marketing container.
     *
     * @param containerId {String} the ID of the parent element of the teaser
     *        elements
     */
    create: function(containerId) {
      var containerJQ = $("#" + containerId);
      if (containerJQ.length != 0) {
        new mamba.ui.MarketingContainer(containerJQ);
      } else {
        throw new Error("Missing container element with id '" +containerId +"'");
      }
    }

  }

});