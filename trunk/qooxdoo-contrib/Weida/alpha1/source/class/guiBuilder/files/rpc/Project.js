qx.Class.define("guiBuilder.files.rpc.Project",
{  
  extend : qx.core.Target,
  type : "singleton",
  
  members : 
  {
    _getRPC : function(returnFunction, returnSpace)
    {
      var service = 'files.project';
      var url = guiBuilder.Config.getInstance().getBackendURL();
          
      var rpc = new qx.io.remote.Rpc();
      rpc.setTimeout(10000);
      rpc.setUrl(url);
      rpc.setServiceName(service);
 
      rpc.addEventListener("completed", returnFunction, returnSpace);      
      
      return rpc;
    },
    
    buildSource : function(projectName, returnFunction, returnSpace)
    {
      var method  = 'buildSource';      
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, projectName);
    },

    build : function(projectName, returnFunction, returnSpace)
    {
      var method  = 'build';      
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, projectName);
    },

    deleteFile : function(fileName, returnFunction, returnSpace)
    {
      var method  = 'delete';      
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, fileName);
    },

    newDirectory : function(directoryName, returnFunction, returnSpace)
    {
      var method  = 'newDirectory';      
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, directoryName);
    },

    newProject : function(projectName, returnFunction, returnSpace)
    {
      var method  = 'newProject';      
      
      var rpc = this._getRPC(returnFunction, returnSpace);;
      rpc.callAsyncListeners(true, method, projectName);
    },
  
    getProjectList : function(returnFunction, returnSpace)
    {
      var method  = 'getProjectList';
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method);
    },

    getFilesOfProject : function(projectName, returnFunction, returnSpace)
    {
      var method  = 'getFilesOfProject';       
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, projectName);      
    },

    getDirsOfProject : function(projectName, returnFunction, returnSpace)
    {
      var method  = 'getDirsOfProject';       
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, projectName);      
    },
    
    getFileContent : function(projectName, fileName, returnFunction, returnSpace)
    {
      var fileName = projectName+'/'+fileName;
      var method  = 'getFileContent';       
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, fileName);        
    },

    saveFileContent : function(projectName, fileName, fileContent, returnFunction, returnSpace)
    {
      var method  = 'saveFileContent';       
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method, fileName, fileContent);        
    },

    getNews : function(returnFunction, returnSpace)
    {
      var method  = 'getNews';       
      
      var rpc = this._getRPC(returnFunction, returnSpace);
      rpc.callAsyncListeners(true, method);        
    }
    
  }
      
});