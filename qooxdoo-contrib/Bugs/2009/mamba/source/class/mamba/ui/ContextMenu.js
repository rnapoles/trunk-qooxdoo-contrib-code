qx.Class.define("mamba.ui.ContextMenu",
{
  extend : qx.core.Object,

  construct : function(listId, toolbarId)
  {
    this._id = "contextmenu_" + listId;
    this._toolbarId = toolbarId;
    this._menuEl;
    this._firstMenuItems = [];

    this._create(listId);
  },

  members :
  {
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getId : function() {
      return this._id;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    checkVisibility : function()
    {
      var toolbar = mamba.ui.ToolbarManager.get(this._toolbarId);
      var toolbarButton;

      for (var i=0, l=this._firstMenuItems.length; i<l; i++)
      {
        toolbarButton = toolbar.getButton(this._firstMenuItems[i].getAttribute("buttonid"));
        toolbarButton.isEnabled() ? $(this._firstMenuItems[i]).show() : $(this._firstMenuItems[i]).hide();
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     * @throws TODOC
     */
    _create : function () {
      var self = this;

      var menuEl = this._menuEl = $('<div class="fys"><div class="fys-menu"><ul></ul></div></div>');      
      
      $(menuEl).attr("id", this._id); 
      
      var ulEl = $("ul", menuEl);

      var menuIdPrefix = mamba.ui.ToolbarManager.getIdPrefixes().menu;

      $("#" + this._toolbarId + " .toolbar-buttons .text-button").each(function(i)
      {
    	var liEl = $("<li>");
    	
        $(ulEl).append(liEl);
        self._firstMenuItems.push(liEl.get(0));

        if(this.id)
        {
          $(liEl).attr("id", "context_" + this.id)
          		.attr("buttonid", this.id)
          		.append("<a>" + $(this).text() + "</a>");
        } else
        {
          $(liEl).append("<a>Missing button ID for button in toolbar</a>");
        }

        var hasSubmenu = self._createSubmenu(liEl, menuIdPrefix + this.id.substring(7));

        if (!hasSubmenu)
        {
          $(liEl).click(function()
          {
            var toolbar = mamba.ui.ToolbarManager.get(self._toolbarId);              
            toolbar.getButton(this.getAttribute("buttonid")).execute();
          });
        }
      });

      $("#" + this._toolbarId).parent().append(menuEl);
      
      // Calc menu's widths. Only needed for IE because of hasLayout behavior triggered by
      // .fys-menu div with position:absolute 
      $(".fys-menu").each(function () {
	    var max = 0;
	    $(">ul>li>a", this).each(function () {
	      if ($(this).width() > max) max = $(this).width();
	    });
	    max += 30; // [TBD: do the real calc, padding, margin, all that BS]
	    $(this).css("width", max + "px");
	  });
	  
      
      // Hide open submenus
      $(".fys-menu .fys-menu .fys-menu").hide(); // Needed for IE, won't hide otherwise
      $(".fys-menu .fys-menu").hide();
        
      $(".fys-menu li").hover(
        function () {
          $(this).addClass("fys-hoverItem");

          // Hide open sibling menu 
          $(">li .fys-menu:visible", $(this).parent()).hide();
        
          if ($(this).attr("hasSubmenu") == "true") {
            $(">.fys-menu", this).show().css({
              left : $(this).position().left + $(this).outerWidth() + 1,
              top : $(this).position().top - 4
            });
          }
        }, 
        function () {
          $(this).removeClass("fys-hoverItem");
        
          $(">li .fys-menu:visible", $(this).parent()).hide();
        }
      );
    
      // Add submenu marker class
      $(".fys-menu .fys-menu").parent().addClass("submenu-marker").attr("hasSubmenu", "true");

      $(menuEl).css("position", "absolute").css("display", "block").hide();
    },


    /**
     * TODOC
     *
     * @param parent {var} TODOC
     * @param menuId {var} TODOC
     * @return {boolean} TODOC
     */
    _createSubmenu : function(parent, menuId) {
      var self = this;
	
	  // The toolbar button's submenu
	  var jTSubmenu = $("#" + menuId + " ul");
	
	  if (jTSubmenu.length > 0)
	  {
	    var menuEl = $("<div class='fys-menu'><ul></ul></div>");
	  	
	  	var submenu = $("ul", menuEl).get(0);
	      	
	    var tMenuItems = jTSubmenu.get(0).childNodes;
	    var tMenuItem, menuItem, nodeName, tButtons, tButton, id;
	
	    for (var i=0, l=tMenuItems.length; i<l; i++)
	    {
	      menuItem = $("<li>");//document.createElement("li");
	
	      id = tMenuItems[i].getAttribute("name");
	
	      // We need a reference to the original list item containing the INPUT or A
	      // element which triggers the user action.
	      // Because we can't asign an ID to a pustefix ELINK, we are using the name
	      // attribute of the LI element.
	      $(menuItem).attr("liId", id);
	      $(menuItem).attr("id", "context_" + id);
	
	      tButtons = tMenuItems[i].childNodes;
	
	      for (var j=0, m=tButtons.length; j<m; j++)
	      {
	        tButton = tButtons[j];
	        nodeName = tButton.nodeName.toLowerCase();
	        if (nodeName === "a") 
	        {
	          $(menuItem).append("<a>" + $(tButton).text() + "</a>");
	        } else if (nodeName === "input" && tButton.type === "submit") {
	        	$(menuItem).append("<a>" + $(tButton).val() + "</a>");
	        } else {
	          continue;
	        }
	
	        $(menuItem).click(function()
	        {
	          var id = this.getAttribute("liId");
	          var jButton = $("#" + id);
	
	          // Just in case there are more buttons with the same ID, we want to
	          // execute
	          if (jButton.length === 1) {
	            jButton.trigger("click");
	          } else
	          {
	            var liEL = $("[name='" + id + "']").get(0);
	
	            var children = liEL.childNodes;
	
	            for (var i=0, l=children.length; i<l; i++)
	            {
	              // A elements don't have an ID, but INPUTs of type button do have one
	              if (children[i].nodeName.toLowerCase() === "a" || children[i].id === id)
	              {
	                // Trigger doesn't work on <a> elements
	                //$(children[i]).trigger("click");
	                window.location.href = $(children[i]).attr("href");
	                return;
	              }
	            }
	          }
	        });
	
	        $(submenu).append(menuItem);
	        break;
	      }
	    }
	
	    $(parent).append(menuEl);
	    return true;
	  }
	  return false;

    }
  }
});