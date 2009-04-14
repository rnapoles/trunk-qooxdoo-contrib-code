      qx.Class.define("bug730.Menu",
      {
        extend : qx.ui.menu.Menu,

        members :
        {

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


          // overridden
          // show vertical scroll bars if needed
          _beforeAppear : function()
          {
            //Enforce max height
            var menuHeight = this._measuredHeight;
            if (!menuHeight) {
              return this.base(arguments);;
            }

            var availableHeight = qx.ui.core.ClientDocument.getInstance().getInnerHeight();

            if ( menuHeight > availableHeight)
            {
              this.setOverflow("scrollY");
              this.setHeight(availableHeight);
            }
            else
            {
//              this.setHeight("auto");
              this.setOverflow("hidden");
            }

            this.base(arguments);
          }

        }
      });