
/**
 * Mamba Help script
 *
 * Help defines behaviour for the help dialog
 * requires:
 * htdocs/script/jqModal.js
 * htdocs/script/jqDnR.js
 */
qx.Class.define("mamba.ui.Help",
{
  statics :
  {

    /* HTML Elements */
    openButton : "#openhelp",
	helpButton: "div#helpbutton",
	helpDialog : "div#helpdialog",

    /**
     * basic initialization
     *
     * @return {void}
     */
    init : function()
    {
	  this._attachToggleEvents();
      this._showHelpButton();
    },

    /**
     * Handle all kinds of hide and show logic
     *
     * @return {void}
     */
   _attachToggleEvents : function()
    {
		$(this.openButton).bind("click", function(e){
		  $('#helpdialog').jqmShow();
    	});

		this._setIconStateStyle();

		/*  toggle help topics and icons */
		$("div#helpdialog h3").bind("click", function(e) {
          $(this).next().toggle();

          var aJQ = $(this).find('a');
          var src =aJQ.css('background-image');
		  aJQ.removeClass();
		  if(src.indexOf("icon-plus") != -1){
		    aJQ.addClass("btn-help-icon-minus");
		  }else{
		    aJQ.addClass("btn-help-icon-plus");
		  }
		});

		/* mini/maximize dialog content */
		$("#minimize").bind("click", function(e) {
		  $(".body").toggle();
	    });
		},

		/**
     * show the help button after init
     *
     * @return {void}
     */
    _setIconStateStyle : function() {
      $("a.btn-help-icon").hover(
	    function(){
		  var src = $(this).css('background-image');
   	  	  $(this).removeClass();

    	  if(src.indexOf("plus") != -1){
		  	$(this).addClass("btn-help-icon-plus-over");
		  }else{
		  	$(this).addClass("btn-help-icon-minus-over");
		  }
	    },
		function(){
		  var src = $(this).css('background-image');
 	  	  $(this).removeClass();

	 	  if(src.indexOf("plus") != -1){
		 	$(this).addClass("btn-help-icon-plus");
		  }else{
		  	$(this).addClass("btn-help-icon-minus");
		  }
	  }
 	  );
	  /*
	  .focus(function(){
	  	var src = $(this).css('background-image');
	 	if(src.indexOf("plus") != -1){
         imgJQ.css({"background-image": "url(img-mamba/buttons/help/btn_help_plus_pressed.png);"});
		}else{
		    imgJQ.css({"background-image": "url(img-mamba/buttons/help/btn_help_minus_pressed.png);"});
		}
	  }
	  ).blur(function(){
	  	var src = $(this).css('background-image');
	 	if(src.indexOf("plus") != -1){
         imgJQ.css({"background-image": "url(img-mamba/buttons/help/btn_help_plus.png);"});
		}else{
		    imgJQ.css({"background-image": "url(img-mamba/buttons/help/btn_help_minus.png);"});
		}
	  }
	  );
	  */

   },

    /**
     * show the help button after init
     *
     * @return {void}
     */
    _showHelpButton : function() {
      $(this.helpButton).show();
    }
  }
});
