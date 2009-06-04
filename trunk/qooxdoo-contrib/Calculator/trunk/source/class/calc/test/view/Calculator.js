qx.Class.define("calc.test.view.Calculator",
{
  extend : calc.test.view.DemoTestCase,

  members :
  {
    _add : function(calc) {
      calc.open();
      calc.moveTo(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200));
    },
    
    
    setUp : function()
    {
      this.base(arguments);
      
      this.calc = new calc.view.Calculator();
      this._add(this.calc);
    },
    
    
    testCalculatorDisplay : function()
    {
      this.calc.setDisplay("Juhu");
      this.assertEquals("Juhu", this.calc.getChildControl("display").getDisplay("display"));

      this.calc.setDisplay(12);
      this.assertEquals(12, this.calc.getChildControl("display").getDisplay());
    },
    
    
    testMemory : function()
    {
      this.calc.setMemory(true);
      this.assertTrue(this.calc.getChildControl("display").getMemory());
    },
    
    
    testOperation : function()
    {
      this.calc.setOperation("+");
      this.assertEquals("+", this.calc.getChildControl("display").getOperation("+"));
    },
    
    
    testKeyPress : function()
    {
      var button = this.calc._buttons["sign"];
      
      var self = this;
      this.assertEventFired(
        this.calc, "buttonPress",
        function() {
          button.execute();
        },
        function(e) {
          this.assertEquals("sign", e.getData());
        }
      );
      
      this.calc.addListener("buttonPress", function(e) {
        this.debug("Button pressed: " + e.getData());
      }, this);
    }
  }
});