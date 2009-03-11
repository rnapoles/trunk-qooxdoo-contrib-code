qx.Class.define("custom.FocusGui",
{
  extend : qx.test.ui.Focus,

  construct : function()
  {
    this.base(arguments);
    
    this.initializeControls();
  },
  
  
  members :
  {
    assertFalse : function() {},
    assertTrue : function() {},
    
    
    initializeControls : function()
    {
      var row = 0;
    
      var grid = new qx.ui.layout.Grid(10, 10);
      var container = this.container = new qx.ui.container.Composite(grid).set({
        padding: 20
      });
      this.getRoot().add(container);
    
      container.add(new qx.ui.basic.Label("Focus Demo"), {
        row: row, column: 0, colSpan: 4
      });
      
      row = 3;
      
      this.ref_blur = new qx.ui.basic.Label("blur on old").set({
        decorator: "main",
        backgroundColor: "yellow"
      });
      container.add(this.ref_blur, {row: row, column: 0});

      this.target_focus = new qx.ui.basic.Label("focus on target").set({
        decorator: "main",
        backgroundColor: "yellow"
      });
      container.add(this.target_focus, {row: row, column: 1});

      this.target_blur = new qx.ui.basic.Label("blur on target").set({
        decorator: "main",
        backgroundColor: "yellow"
      });
      container.add(this.target_blur, {row: row, column: 2});
      
      var resetButton = new qx.ui.form.Button("Reset");
      resetButton.addListener("execute", this.reset, this);
      container.add(resetButton, {row: ++row, column: 0});
      
      
      container.add(new qx.ui.basic.Label("Focus while hidden (before flush)"), {
        row: ++row, column: 0, colSpan: 4
      });  

      container.add(
        this.createButton("Not inserted", "testNotInsertedBeforeFlush"),
        {row: ++row, column: 0}
      );

      container.add(
          this.createButton("Excluded", "testExcludedBeforeFlush"),
          {row: row, column: 1}
      );

      container.add(
        this.createButton("Hidden", "testHiddenBeforeFlush"),
        {row: row, column: 2}
      );
      
      
      container.add(new qx.ui.basic.Label("Focus while hidden (after flush)"), {
        row: ++row, column: 0, colSpan: 4
      });  

      container.add(
        this.createButton("Not inserted", "testNotInsertedAfterFlush"),
        {row: ++row, column: 0}
      );

      container.add(
          this.createButton("Excluded", "testExcludedAfterFlush"),
          {row: row, column: 1}
      );

      container.add(
        this.createButton("Hidden", "testHiddenAfterFlush"),
        {row: row, column: 2}
      );
      
      
      container.add(new qx.ui.basic.Label("Focus while visible (before flush)"), {
        row: ++row, column: 0, colSpan: 4
      });  

      container.add(
        this.createButton("Inserted", "testInsertedBeforeFlush"),
        {row: ++row, column: 0}
      );

      container.add(
        this.createButton("Focus than remove", "testFocusRemoveBeforeFlush"),
        {row: row, column: 1}
      );

      container.add(
        this.createButton("Focus than exclude", "testFocusExcludeBeforeFlush"),
        {row: row, column: 2}
      );      

      container.add(
        this.createButton("Focus than hide", "testFocusHideBeforeFlush"),
        {row: row, column: 3}
      );   
      
      container.add(new qx.ui.basic.Label("Focus while visible (after flush)"), {
        row: ++row, column: 0, colSpan: 4
      });  

      container.add(
        this.createButton("Inserted", "testInsertedAfterFlush"),
        {row: ++row, column: 0}
      );

      container.add(
        this.createButton("Focus than remove", "testFocusRemoveAfterFlush"),
        {row: row, column: 1}
      );

      container.add(
        this.createButton("Focus than exclude", "testFocusExcludeAfterFlush"),
        {row: row, column: 2}
      );      

      container.add(
        this.createButton("Focus than hide", "testFocusHideAfterFlush"),
        {row: row, column: 3}
      );      
    },
    
    
    createButton : function(label, test)
    {
      var button = new qx.ui.form.Button(label);
      button.addListener("execute", function(e) {
        this.runTest(test);
      }, this);   
      return button;
    },
    
    
    getContainer : function() {
      return this.container;
    },

    
    setUp : function()
    {
      this.base(arguments);
      
      this.ref_blur.setBackgroundColor("yellow");
      this.target_focus.setBackgroundColor("yellow");
      this.target_blur.setBackgroundColor("yellow");      
    },
    
    
    reset : function()
    {
      this.tearDown();
      this.setUp();
    },
    
    
    runTest : function(testName)
    {
      this.tearDown();
      this.setUp();
      this[testName]();
      this.flush();
    },
       
    
    onRefBlur : function()
    {
      this.base(arguments);
      this.ref_blur.setBackgroundColor("green");
    },
    
    
    onInputFocus : function() 
    {
      this.base(arguments);
      this.target_focus.setBackgroundColor("green");
    },
    
    
    onInputBlur : function() 
    {
      this.base(arguments);
      this.target_blur.setBackgroundColor("green");
    }
  }
});
