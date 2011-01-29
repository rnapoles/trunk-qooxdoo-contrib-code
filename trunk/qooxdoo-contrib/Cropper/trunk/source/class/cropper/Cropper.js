/* ************************************************************************

   Copyright:
     2009 OETIKER+PARTNER AG http://www.oetiker.ch
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tobias Oetiker (oetiker)

************************************************************************ */

/**
 * Add cropping ability to any widget. When you click on the image
 * an overlay covers the image and you can select the area to crop.
 * When the crop area has been selected and cropSelected event is generated
 * reporting the size of the area.
 */
qx.Class.define("cropper.Cropper", {
    extend : qx.ui.container.Composite,
    include : qx.ui.core.MPlacement,


    /**
     * @param target {Widget} The widget containing the croppable material
     */
    construct : function(target) {
        var layout = new qx.ui.layout.Basic();
        this.base(arguments,layout);
        this.__target = target;    
        var root = this.getApplicationRoot();

        this.set({
            zIndex     : 1e7,
            visibility : 'hidden'
        });

        this.__tiles = this.__tileBuilder();
        root.add(this);
        target.addListener("mousedown", this.__startCrop, this);
        this.addListener("mousemove", this.__moveCrop, this);
        this.addListener("losecapture", this.__endCrop, this);        
        root.addListener("keydown", this.__startMove, this);
        root.addListener("keyup", this.__endMove, this);
    },

    properties : {

        /** Should the cropping activate when the mounse is clicked on the image */
        cropActive : {
            check : 'Boolean',
            init  : true
        },


        /** 
         * The widget supports three types of cropping.
         *
         * 'full' select an arbitrary area
         * 'x' select an area flexible in the x axis
         * 'y' select an area flexible in the y axis
         */
        cropType : {
            check : [ 'full', 'x', 'y' ],
            init  : 'full'
        },

        /** Left Padding of the corpping area */
        cropPaddingLeft : {
            check : 'Integer',
            init  : 0
        },

        /** Right Padding of the corpping area */
        cropPaddingRight : {
            check : 'Integer',
            init  : 0
        },

        /** Top Padding of the corpping area */
        cropPaddingTop : {
            check : 'Integer',
            init  : 0
        },

        /** Bottom Padding of the corpping area */
        cropPaddingBottom : {
            check : 'Integer',
            init  : 0
        },

        /** Left Margin of the corpping area */
        cropMarginLeft : {
            check : 'Integer',
            init  : 0
        },

        /** Right Margin of the corpping area */
        cropMarginRight : {
            check : 'Integer',
            init  : 0
        },

        /** Top Margin of the corpping area */
        cropMarginTop : {
            check : 'Integer',
            init  : 0
        },

        /** Bottom Margin of the corpping area */
        cropMarginBottom : {
            check : 'Integer',
            init  : 0
        }
    },

    events : {
        /**
         * Fired after the crop area has been selected. The passed data is a map containing the
         * left, top, width and height of the crop area relative to the padded area.
         */
        cropSelected : 'qx.event.type.Data'
    },

    members : {
        __overWidth : null,
        __overHeight : null,
        __target: null,
        __grid : null,
        __crop : null,
        __cropping : false,
        __location : null,
        __startX : null,
        __startY : null,
        __tiles : null,
        __cropMinX : null,
        __cropMaxX : null,
        __cropMinY : null,
        __cropMaxY : null,
        __cropType : null,
        __moveMode : false,

        /**
         * Prepare the tiles for the croping widget and add them to the overlay
         *
         * @param overlay {container} container for the tiles
         * @return {tileMap} a map of tiles.
         */
        __tileBuilder : function() {
            var t = {
                left   : this.__makeTile(),
                top    : this.__makeTile(),
                bottom : this.__makeTile(),
                right  : this.__makeTile(),
                frame  : this.__makeFrame()
            };

            for (var i in t) {
                this.add(t[i]);
            }

            return t;
        },


        /**
         * Update the position of the crop area
         * 
         * Corner coordinates
         *
         * @param x0 {Number} left
         * @param y0 {Number} top
         * @param x1 {Number} right
         * @param y1 {Number} bottom
         */
        __updatePositions : function(x0, y0, x1, y1) {
            var t = this.__tiles;

            function p(wg, l, t, w, h) {
                wg.setLayoutProperties({
                    left : l,
                    top  : t
                });

                wg.set({
                    width  : w,
                    height : h
                });
            }

            switch(this.__cropType)
            {
                case 'x':
                    y0 = this.__cropMinY;
                    y1 = this.__cropMaxY;
                    break;

                case 'y':
                    x0 = this.__cropMinX;
                    x1 = this.__cropMaxX;
                    break;
            }

            if (x0 > x1) {
                var x = x0;
                x0 = x1;
                x1 = x;
            }

            if (y0 > y1) {
                var y = y0;
                y0 = y1;
                y1 = y;
            }

            if (x1 > this.__cropMaxX) {
                x1 = this.__cropMaxX;
            }

            if (x0 < this.__cropMinX) {
                x0 = this.__cropMinX;
            }

            if (y1 > this.__cropMaxY) {
                y1 = this.__cropMaxY;
            }

            if (y0 < this.__cropMinY) {
                y0 = this.__cropMinY;
            }

            this.__crop = {
                top    : y0,
                left   : x0,
                width  : x1 - x0,
                height : y1 - y0
            };

            p(t.left, 0, 0, x0, this.__overHeight);
            p(t.right, x1, 0, this.__overWidth - x1, this.__overHeight);
            p(t.top, x0, 0, x1 - x0, y0);
            p(t.bottom, x0, y1, x1 - x0, this.__overHeight - y1);
            p(t.frame, x0, y0, x1 - x0, y1 - y0);
        },


        /**
         * Create a tile
         *
         * @return {Widget} square and faire
         */
        __makeTile : function() {
            var widget = new qx.ui.core.Widget().set({
                backgroundColor : '#000000',
                opacity         : 0.2,
                allowGrowY      : true,
                allowGrowX      : true
            });

            return widget;
        },


        /**
         * Create the crop frame
         *
         * @return {Widget} a frame
         */
        __makeFrame : function() {
            var dotted = new qx.ui.decoration.Single(1, 'dotted', '#ddd');

            var widget = new qx.ui.core.Widget().set({
                allowGrowY : true,
                allowGrowX : true,
                decorator  : dotted
            });

            return widget;
        },

        __startMove : function(e){
            if (!this.__cropping) {   
                return;   
            };
            if(e.getKeyIdentifier() == 'Space'){
                this.__moveMode = true;
            };
        },

        __endMove : function(e){            
            if (!this.__cropping) {   
                return;   
            };
            if(e.getKeyIdentifier() == 'Space'){
                this.__moveMode = false;
            };
        },

        /**
         * Show the croping overlay
         *
         * @param e {MouseEvent}
         */
        __startCrop : function(e) {
            if (!this.getCropActive()) {
                return;
            }

            var location = this.getLayoutLocation(this.__target);
            this.__location = location;
            location.left += this.getCropMarginLeft();
            location.top += this.getCropMarginTop();
            location.right -= this.getCropMarginRight();
            location.bottom -= this.getCropMarginBottom();

            this.__overWidth = location.right - location.left;
            this.__overHeight = location.bottom - location.top;
            this.__cropMaxX = this.__overWidth - this.getCropPaddingRight();
            this.__cropMinX = this.getCropPaddingLeft();
            this.__cropMinY = this.getCropPaddingTop();
            this.__cropMaxY = this.__overHeight - this.getCropPaddingBottom();
            this.__startX = e.getDocumentLeft() - location.left;
            this.__startY = e.getDocumentTop() - location.top;
            this.__cropType = this.getCropType();

            if (this.__startX < this.__cropMinX || this.__startX > this.__cropMaxX || this.__startY < this.__cropMinY || this.__startY > this.__cropMaxY) {
                return;
            }


            this.setLayoutProperties({
                top  : location.top,
                left : location.left
            });

            this.__updatePositions(this.__startX, this.__startY, this.__startX, this.__startY);

            this.set({
                width      : location.right - location.left,
                height     : location.bottom - location.top,
                visibility : 'visible'
            });

            this.capture();
            this.__cropping = true;
        },


        /**
         * Move the crop frame
         *
         * @param e {MouseEvent}
         */
        __moveCrop : function(e) {
            if (!this.__cropping) {
                return;
            }

            var location = this.__location;
            var x = e.getDocumentLeft() - location.left;
            var y = e.getDocumentTop() - location.top;

            if (this.__moveMode){
                this.__startX = x + (this.__startX < x ? -1 : 1 ) *  this.__crop.width;
                this.__startY = y + (this.__startY < y ? -1 : 1 ) *  this.__crop.height;
            }
            this.__updatePositions(this.__startX, this.__startY, x, y);
        },


        /**
         * End the croping and fire the cropSelected event.
         *
         * @param e {MouseEvent}
         */
        __endCrop : function(e) {
            this.setVisibility('hidden');
            this.__cropping = false;
            this.__moveMode = false;
            this.__crop.left -= this.getCropPaddingLeft();
            this.__crop.top -= this.getCropPaddingTop();
            this.__crop.maxHeight = this.__cropMaxY - this.__cropMinY;
            this.__crop.maxWidth = this.__cropMaxX - this.__cropMinX;
            this.fireDataEvent('cropSelected', this.__crop);
        }
    }
});
