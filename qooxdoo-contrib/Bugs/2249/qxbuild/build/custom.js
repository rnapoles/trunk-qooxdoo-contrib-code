// [Application]
qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    // [Entry point]
    main: function()
    {
      // [SuperClass]
      this.base(arguments);

      // [Main Container]
      this._container = new qx.ui.container.Composite(
        new qx.ui.layout.VBox().set({
          spacing: 1
        })
      );
      this.getRoot().add(this._container, {edge: 0});      
      
      // [Add your widgets to this._container]
      this._button = new qx.ui.form.Button("Hello");
      this._container.add(this._button);
    }
  }
});
