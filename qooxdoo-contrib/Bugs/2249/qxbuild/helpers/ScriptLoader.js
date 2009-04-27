// ScriptLoader v0.1, (c) Petr Kobalicek 2009, distributed under MIT licence.

ScriptLoader =
{
  //! @brief Main method called to load the scripts
  //! @param params {Object} Map of parameters.
  load: function(params)
  {
    // Event handlers
    ScriptLoader.$$start = params.start;
    ScriptLoader.$$finish = params.finish;
    ScriptLoader.$$progress = params.progress;

    // Start handler
    if (ScriptLoader.$$start) ScriptLoader.$$start();

    // Add scripts to document
    var scripts = params.scripts;
    var i;

    for (i = 0; i < scripts.length; i++)
    {
      if (ScriptLoader.$$done[scripts[i]]) continue;
      ScriptLoader.$$tasks.push(scripts[i]);
      ScriptLoader.$$nTotal++;
    }

    ScriptLoader.$$next();
  },
  
  $$next: function()
  {
    if (ScriptLoader.$$tasks.length)
    {
      var script = ScriptLoader.$$tasks[0];
      ScriptLoader.$$tasks.splice(0, 1);

      var e = document.createElement("script");
      e.setAttribute("src", script);
      e.setAttribute("type", "text/javascript");

      // Special workaround for IE
      if (ScriptLoader.$$IE)
      {
        e.onreadystatechange = function() 
        {
          if (e.readyState == "loaded" || e.readyState == "complete") 
          {
            e.onreadystatechange = null;
            ScriptLoader.$$onLoad(script);
          }
        }
      }
      else
      {
        e.onload = function()
        {
          ScriptLoader.$$onLoad(script);
        }
      }

      var p = document.getElementsByTagName("head")[0] || document.body;
      p.appendChild(e);
    }
  },
  
  $$onLoad: function(script)
  {
    // Remove script from pending map
    ScriptLoader.$$done[script] = true;

    var nLoaded = ++ScriptLoader.$$nLoaded;

    // Calculate count of pending scripts
    var nTotal = ScriptLoader.$$nTotal;

    // Update progress
    if (ScriptLoader.$$progress) 
    {
      ScriptLoader.$$progress(nLoaded / nTotal, script);
    }
    
    ScriptLoader.$$next();

    // If there are no pending scripts, run finish handler
    if (nLoaded >= nTotal)
    {
      if (ScriptLoader.$$finish) ScriptLoader.$$finish();
    }
  },

  $$onFail: function()
  {
  },

  //! @brief Start function.
  $$start: null,

  //! @brief Called when all scripts are loaded (finish).
  $$finish: null,

  //! @brief Called when one script was load.
  $$progress: null,

  //! @brief Count of scripts loaded
  $$nLoaded: 0,
  //! @brief Count of scripts total
  $$nTotal: 0,

  //! @brief Scripts that are pending to complete
  $$tasks: [],
  //! @brief Loaded scripts by ScriptLoader
  $$done: {},

  //! @brief IE detection for onload workaround
  $$IE: !!(window.attachEvent && !window.opera)
};
