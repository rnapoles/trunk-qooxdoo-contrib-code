qx.Class.define("testmem.test.AbstractDisplay",
{
  extend : qx.dev.unit.TestCase,
  type : "abstract",

  members :
  {
    _count : 0,
    
    _size : 0,
    
    testVisibility : function()
    {
      var id = "contentVisibility_" + (this._count * this._count);
      var key = "visibility";
      
      this.info("Test " + key + " started!");
      this.__create(id);
      
      var that = this;
      this.wait(1000, function()
      {
         that.__run(id, key, "hidden");
      });
    },
    
    testDisplay : function()
    {
      var id = "contentDisplay_" + (this._count * this._count);
      var key = "display";
      
      this.info("Test " + key + " started with " + this._count * this._count + " elements!");
      this.__create(id);
      
      var that = this;
      this.wait(1000, function()
      {
        that.__run(id, key, "none");
      });
    },

    __create : function(id)
    {
      var contentNode = document.createElement("div");
      contentNode.setAttribute("id", id);
      document.body.appendChild(contentNode);
      
      for (var y = 0; y < this._count; y++)
      {
        for (var x = 0; x < this._count; x++)
        {
          var element = document.createElement("div");
          element.style.backgroundColor = ((x+y) % 2 == 0) ? "red" : "blue";
          element.style.position = "absolute";
          element.style.width = this._size + "px";
          element.style.height = this._size + "px";
          element.style.top = (x * this._size) + "px";
          element.style.left = (y * this._size) + "px";
  
          contentNode.appendChild(element);
        }
      }
    },
    
    __destroy : function(id) {
      var contentNode = document.getElementById(id);
      contentNode.parentNode.removeChild(contentNode);
    },
    
    // hide and show all elements
    /*__run : function(id, key, value)
    {
      var contentNode = document.getElementById(id);
      
      this.info("Start show/hide with " + key + " on DOM.");
      var start = new Date();
      for (var i = 0, l = contentNode.childNodes.length; i < l; i++)
      {
        var element = contentNode.childNodes[i];
        element.style[key] = value;
      }
      
      var that = this;
      this.wait(1, function()
      {
        that.info("Duration (hide): " + (new Date() - start - 1) + "ms");
        
        var start2 = new Date();
        for (var i = 0, l = contentNode.childNodes.length; i < l; i++)
        {
          var element = contentNode.childNodes[i];
          element.style[key] = "";
        }
        
        that.wait(1, function()
        {
          that.info("Duration (show): " + (new Date() - start2 - 1) + "ms");
          that.__destroy(id);
          
          that.wait(1, function()
          {
            that.info("Test " + key + " finished!");
          });
        });
      });
    }*/
    
    // hide and show only the parent element
    __run : function(id, key, value)
    {
      var contentNode = document.getElementById(id);
      
      this.info("Start show/hide with " + key + " on DOM.");
      var start = new Date();
      contentNode.style[key] = value;
      
      var that = this;
      this.wait(1, function()
      {
        that.info("Duration (hide): " + (new Date() - start - 1) + "ms");
        
        var start2 = new Date();
        contentNode.style[key] = "";
        that.wait(1, function()
        {
          that.info("Duration (show): " + (new Date() - start2 - 1) + "ms");
          that.__destroy(id);
          
          that.wait(1, function()
          {
            that.info("Test " + key + " finished!");
          });
        });
      });
    }
  }
});
