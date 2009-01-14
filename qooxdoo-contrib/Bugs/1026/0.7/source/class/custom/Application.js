function create_a_table ()
{
  var model = new qx.ui.table.model.Simple ();
  model.setColumns([ "Column 1", "Column 2", "Column 3" ]);

  var custom = {
    tableColumnModel : function(obj) {
      return new qx.ui.table.columnmodel.Resize (obj);
    }
  };

  var table = new qx.ui.table.Table (model, custom).set ({
    width :"95%",
    left  :25,
    height:150,
    border:"inset-thin"
  });

  table.setColumnVisibilityButtonVisible (false);
  table.setStatusBarVisible (false);

  data = [ ];
  for (var i = 1; i <= 50; i++) {
    data[i-1] = ([ ""+i, ""+(i*i), ""+(i*i*i) ]);
  }
  model.setData (data);

  return table;
}


qx.Class.define("custom.Application",
{

extend : qx.application.Gui,

members : {
  main : function()
  {
    this.base(arguments);
    doc = qx.ui.core.ClientDocument.getInstance ()

    var layout = new qx.ui.layout.VerticalBoxLayout ().set ({
      height:200,
      width:"50%",
      overflow:'scrollY'
    });

    with (layout) {
      add (create_a_table ());
      add (create_a_table ());
    }
    doc.add (layout);
    
  }
}
});