qx.Class.define("IntelliFactory.Qx.Demo.Application",
  {extend : qx.application.Standalone,
   members :
    {main :
      function ()
      {
        (((function ()
           {
             var __1$EventExecute =
                 function (this$)
                 {
                   return ({Add :
                             function (h)
                             {
                               this$.addListener("execute", h);
                             }});
                 };
             return (function (this$)
                     {
                       return (function ()
                               {
                                 return (((function (value)
                                           {
                                             return ((void value));
                                           })((this.base.apply)(this,
                                                                [[],
                                                                 arguments])),
                                          (function ()
                                           {
                                             var __2$btn =
                                                 new qx.ui.form.Button("First Button",
                                                                       "IntelliFactory.Qx.demo/test.png");
                                             return (((this$.getRoot().add)(__2$btn),
                                                      ((function (value)
                                                        {
                                                          return ((void value));
                                                        })(__1$EventExecute(__2$btn)),
                                                       null)));
                                           })()));
                               });
                     });
           })())(this).apply)(null, arguments);
      }}})
