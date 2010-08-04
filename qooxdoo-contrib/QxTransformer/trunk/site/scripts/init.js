(function() {
    $(document).ready(function(){

        //bind listeners to demoblocks
        var demoInfo = $(".demoblock .controls .info")
        demoInfo.toggle(
            function(){
                $(".infoblock", $(this).parents(".demoblock")).show();
            },
            function(){
                $(".infoblock", $(this).parents(".demoblock")).hide();
            }
        );
        $(demoInfo[0]).click();
        
        var downloadInfo = $(".downloadblock .controls .info")
        downloadInfo.toggle(
            function(){
                $(".infoblock", $(this).parents(".downloadblock")).show();
            },
            function(){
                $(".infoblock", $(this).parents(".downloadblock")).hide();
            }
        );
        $(downloadInfo[0]).click();
        
        var userName = "qxtransformer";
        var numTweets = 5;
        $.getScript("http://twitter.com/javascripts/blogger.js");
        window.twitterCallback = function(data) {
            alert(data);
        };
        
        $.getScript("http://twitter.com/statuses/user_timeline/"+userName+".json?callback=twitterCallback2&count="+numTweets, function(){
            $("#twitter_update_list").newsticker();
        });
        
        /* light box initialization */
        $('div.gallery > a').lightBox();
        
        var demoScreens = $(".demoblock .controls .screens");
        demoScreens.click(function() {
            var gallery = $(".gallery a", $(this).parents(".demoblock"));
            if (gallery.length>0) {
                $(gallery[0]).click();
            }
        });
        
    });
})();