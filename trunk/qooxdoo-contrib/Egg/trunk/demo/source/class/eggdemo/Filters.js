qx.Class.define("eggdemo.Filters",
{
   extend: qx.ui.container.Composite,
   
   construct: function ()
   {
      this.base(arguments);
      this.setLayout(new qx.ui.layout.Grid(10, 3));
      
      this.__createFiltersDemo();
   },
   
   members:
   {
      __createFiltersDemo: function ()
      {
         var values = [" 1  Ian", "  Horst ", "Ian Horst2      3  "];
         
         for (var i = values.length; i--;)
         {
            var original = new qx.ui.form.TextField().set({width:200});
            this.add(original, {row:i, column: 0});
            
            var trimFilter = new egg.filter.Trim;
            var trimFiltered = new qx.ui.form.TextField().set({width: 200});
            trimFiltered.addListener("input", function (e)
               {
                  this.setValue(trimFilter.filter(e.getData()));
               }, trimFiltered);
            original.addListener("changeValue", function (e)
               {
                  this.setValue(trimFilter.filter(e.getData()));
               }, trimFiltered);
            this.add(trimFiltered, {row: i, column: 1});
            
            var digitsFilter = new egg.filter.Digits;
            var digitsFiltered = new qx.ui.form.TextField().set({width: 200});
            digitsFiltered.addListener("input", function (e)
               {
                  this.setValue(digitsFilter.filter(e.getData()));
               }, digitsFiltered);
            original.addListener("changeValue", function (e)
               {
                  this.setValue(digitsFilter.filter(e.getData()));
               }, digitsFiltered);
            this.add(digitsFiltered, {row: i, column: 2})
            
            original.setValue(values[i]);
         }
      }
   }
});
