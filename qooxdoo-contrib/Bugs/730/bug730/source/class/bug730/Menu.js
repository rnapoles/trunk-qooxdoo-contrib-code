      qx.Class.define("bug730.Menu",
      {
        extend : qx.ui.menu.Menu,
        include : [qx.ui.core.MNativeOverflow],

        members :
        {
          __dimensions : null,

          /**
           * Measure and store the menu height. This method must be called if the menu
           * should have automatic vertical scrollbars. It must be called after the
           * menu is created and inserted into the document.
           */
          measureHeight : function()
          {
            //Hack: Show menu so real height is computed
            var oldHeight = this.getHeight();
//            this.setHeight("auto");

//            var oldRestrictValue = this.getRestrictToPageOnOpen();
//            this.setRestrictToPageOnOpen(false);

            //Move out of view so it is not rendered on screen
            //Method stolen from qooxdoo/Popup.js
            var hideOffsetLeft = 10000;
            var oldLeftValue = this.getLeft();
            this.setLeft(hideOffsetLeft);

            if (this.getElement() != null)
            {
              // The popup was already visible once before
              // -> Move it immediately before it gets visible again
              this.getElement().style.left = hideOffsetLeft;
            }

            this.show();

            //Flush queue so it is layouted
            qx.ui.core.Widget.flushGlobalQueues();

            var height = this.getHeightValue();

            //Hide again, on next open it will have correct size
            this.hide();
//            this.setRestrictToPageOnOpen(oldRestrictValue);
            this.setLeft(oldLeftValue);
            this.setHeight(oldHeight);

            this._measuredHeight = height;
          },

          __correctSizes : function(availableWidth, availableHeight)
          {
            
            var location = this.getContentLocation();
            var dimensions = qx.bom.element.Dimension.getSize(this.getContainerElement().getDomElement());
            
            availableHeight -= location.top;
            availableWidth -= location.left;
            
            if (dimensions.height > availableHeight)
            {
              this.__oldHeight = dimensions.height;
              this.setOverflowY("scroll");
              this.setHeight(availableHeight);
            }
            else
            {
              this.setHeight(this.__oldHeight);
              this.setOverflowY("hidden");
            }

          },

          // overridden
          // show vertical scroll bars if needed
          open : function()
          {
            this.base(arguments);
            
            var availableHeight = qx.bom.Viewport.getHeight();
            var availableWidth = qx.bom.Viewport.getWidth();
            
            var timer = qx.util.TimerManager.getInstance();

            timer.start(
              function(){
                this.__correctSizes(availableWidth, availableHeight);
              },
              0,
              this
            );

            this.base(arguments);
          }

        }
      });