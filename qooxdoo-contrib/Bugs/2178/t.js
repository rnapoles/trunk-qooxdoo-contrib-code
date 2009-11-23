dojo._disconnect = function(obj, event, handle, listener){
		([dojo._listener, del, node_listener][listener]).remove(obj, event, handle);
	}

[0, 0].sort(function(){
	baseHasDuplicate = false;
	return 0;
});
