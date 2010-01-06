$(function(){
	// initialization of tag search form
	$('#tag_search_field').keydown(function(e){
		//Enter
		if(e.keyCode==13) {
			var val = $.trim(this.value);
			if(val!='') 
				highlightTags(val, $(this).parents('.search_panel'));
			else
				unHighlightTags();
		}
		//ESC
		else if(e.keyCode==27)
			unHighlightTags();

	});
	// initialization of tag search form
	$('#tag_search_btn').click(function(){
		var val = $.trim($('#tag_search_field').val());
		if(val!='') {
			highlightTags(val, $(this).parents('.search_panel'));
		}
		else
			unHighlightTags();
			
		return false;
	});
	
	$('#tag_search_btn').focus(function(){return false;});
	
	function highlightTags(val, searchPanel) {
		var total = $("#nav_pane ul li").addClass('disabled').length;
		var found = $("#nav_pane ul li:contains('"+val+"')").removeClass('disabled').length;
		
		var hint = $('div.hint', searchPanel);
		hint.children().text('Found '+ found+" tags out of "+total+".");
		hint.fadeTo(200,0.9, function() {
			setTimeout(function() {
				hint.fadeTo(200,0);
			}, 500);
		});
	}
	function unHighlightTags() {
		$("#nav_pane ul li").removeClass('disabled')
	}

});

$(function(){
	$('#content_pane ul.nav a').click(function(){
		var href = this.href;
		$('#content_pane div.nav-panes > div').hide();
		$('#'+href.split('#')[1], '#content_pane div.nav-panes').show();
		
		$('#content_pane ul.nav li').removeClass('active')
		$(this).parent().addClass('active')
		
		return false;
	});
	
	$('#content_pane ul.nav a:first').click();
});

$(function(){
	// initialization of tag search form
	$('#attr_search_field').keydown(function(e){
		//Enter
		if(e.keyCode==13) {
			var val = $.trim(this.value);
			if(val!='') 
				highlightAttrs(val, $(this).parents('.search_panel'));
			else
				unHighlightAttrs();
		}
		//ESC
		else if(e.keyCode==27)
			unHighlightAttrs();
	});
	// initialization of tag search form
	$('#attr_search_btn').click(function(){
		var val = $.trim($('#attr_search_field').val());
		if(val!='')  
			highlightAttrs(val, $(this).parents('.search_panel'));
		else
			unHighlightAttrs();
		
		return false;
	});
	
	function highlightAttrs(val, searchPanel) {
		var total = $("#attributes dl dt").addClass('disabled').next().addClass('disabled').length;
		var found = $("#attributes dl dt span.attr:contains('"+val+"')").parent().removeClass('disabled').next().removeClass('disabled').length;
		
		var hint = $('div.hint', searchPanel);
		hint.children().text('Found '+ found+" attributes out of "+total+".");
		hint.fadeTo(200,0.9, function() {
			setTimeout(function() {
				hint.fadeTo(200,0);
			}, 500);
		});
	}
	function unHighlightAttrs() {
		$("#attributes dl dt").removeClass('disabled').next().removeClass('disabled');
	}

});
