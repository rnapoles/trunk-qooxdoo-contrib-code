qx.Class.define("guiBuilder.CodeEditor",
{  
  extend : qx.ui.form.TextArea,

  properties : 
  { 
 
    language : 
    { 
      check : "String",
      init  : "javascript"
    }
    
  },

  construct: function(useTimerForChanges) { 
    this.base(arguments);

    this._tempValue = '';
    this._toAddValue = '';
    
    this._useTimerForChanges = true;
    if (useTimerForChanges === false)
      this._useTimerForChanges = false;
    
    this._scrollLeft = false;
    this._scrollTop  = false;
    
    this._changeTimer = new qx.client.Timer();
    this._changeTimer.setInterval(500);
    this._changeTimer.addEventListener("interval", function(e)
      {
        if (!this._realId)
          return;

        var code = 'var editor = '+this._realId+'.editor;';
        eval(code);    
        
        if (editor == undefined)
          return;

        var code = "var codePress = "+this._realId;
        eval(code);       
        
        // we need to execute this only the first time, and _scrollLeft helps here
        if (this._scrollLeft === false)
        {
          codePress.style.height = "100%";
          codePress.style.width = "100%";
        }  
                         
        var frameWindow = qx.html.Iframe.getWindow(codePress);                         
        this._scrollLeft = frameWindow.pageXOffset;
        this._scrollTop  = frameWindow.pageYOffset;

        if (this._toAddValue != '')
        {      
          if (editor != undefined)
          {                 
            var code = this._realId+".setCode(this._toAddValue);";
            eval(code);                     

            this._tempValue = this._toAddValue;            
            this._toAddValue = '';              
          }
        }
        
        if (this._useTimerForChanges === false)
          return;
                    
        if (this.getValue() != this._tempValue)
        {
          if (this._openFile.getModified() === false)
          {
            this._openFile.setModified(true);
            var newTitle = this._openFile.getFileName()+' [*]';
            this._button.setLabel(newTitle);
            
            var mainForm = guiBuilder.MainForm.getInstance();
            mainForm._mainToolBarSave.setEnabled(true);      
          }  
        }
          
      }, this)

    this.addEventListener("disappear", function(e)
      {                           
        this._changeTimer.stop();      
      }, this);      
   
    this.addEventListener("appear", function(e)
      {            
        if (this._scrollLeft !== false)
        {
          var code = "var codePress = "+this._realId;
          eval(code);                        
          var frameWindow = qx.html.Iframe.getWindow(codePress);                   
          frameWindow.scrollTo(this._scrollLeft, this._scrollTop);
        }
      
        this._changeTimer.start();
      
        if (this._isDrawnCodePress)
          return false;
        
        var id = 'codeEditor'+Math.floor(Math.random()*10000);
                
        this._inputElement.id = id;
        this._inputElement.attributes['id'].value =id;      
        
        this._inputElement.className = 'codepress javascript';
        this._inputElement.attributes['class'].value = 'codepress '+this.getLanguage();      
        
        this._inputElement.value = this._tempValue;

        try 
        {       
          CodePress.run();          
        } catch(e) {
          this.debug(e);
          alert(e);
        }

        this._realId = id; 
          
        this._isDrawnCodePress = true;
      });          
  },
  
  members :   
  {

    getValue : function()
    {
      if (!this._realId)
        return '';

      var code = "var codeStr = "+this._realId+".getCode();";
      eval(code);
                                     
      return codeStr;
    },
    
    setValue : function(valueStr)
    {   
              
      if (!this._realId)    
      {         
        this._toAddValue = valueStr;
        return;     
      }

      this._tempValue = valueStr;
      
      var code = 'var editor = '+this._realId+'.editor;';
      eval(code);    
      
      if (editor == undefined)
      {
        this._toAddValue = valueStr;
        return;
      }         
      
      var code = this._realId+".setCode(valueStr);";
      eval(code);          
      
    }          
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._changeTimer.stop();
    this._disposeFields("_changeTimer");
  }
    
});