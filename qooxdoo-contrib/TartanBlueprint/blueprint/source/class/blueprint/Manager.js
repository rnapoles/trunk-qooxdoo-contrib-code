/* ************************************************************************

Tartan Blueprint

    http://www.tartansolutions.com

    Copyright:
      2008 - 2009 Tartan Solutions, Inc

    License:
      LGPL: http://www.gnu.org/licenses/lgpl.html
      EPL: http://www.eclipse.org/org/documents/epl-v10.php
      See the LICENSE file in the project's top-level directory for details.

    Authors:
      * Dan Hummon

************************************************************************ */

qx.Class.define("blueprint.Manager", {
	extend : qx.core.Object,
	type : "singleton",

	construct : function()
	{
		this.base(arguments);
		this.__application = qx.core.Init.getApplication();

		// A monotonic counter for creating objects.
		this.__objectCounter = 0;
	},
	
	members :
	{
		__objectCounter : null,

		generate : function(vData, parent, namespace, skipRecursion) {
			// Anything that isn't a top_container needs to have a parent.
			if (vData.type != 'top_container' && vData.type != 'application_container' && parent == undefined) {
				throw new Error("Generating new objects must have a parent unless they are top_containers. (" + vData.type + "//" + parent +")");
			}
			
			// Set the namespace for a top_container and generate any top_container prerequisites.
			if (vData.type == 'top_container') {
				namespace = 'top_container.' + this.__objectCounter++;
				
				// Prerequisites are objects that need to be created first, but do not belong in the object hierarchy.
				// They are created here in this loop. All prerequisites should have an objectId for the registry so they can be referenced.
				// A good example of a prerequisite would be a RadioGroup. It is required to manage radio buttons but does not exist in the
				// layout as an object.
				
				if (vData.prerequsites != undefined) {
					for (var i=0;i<vData.prerequsites.length;i++) {
						if (vData.prerequsites[i].object.objectId == undefined || vData.prerequsites[i].object.objectId == null || vData.prerequsites[i].object.objectId == '') {
							this.warn('Prerequisite ' + vData.objectClass + ' created without an objectId.');
						}
						this.generate(vData.prerequsites[i].object, this, namespace);
					}
				}
			}
			
			if (vData.qxSettings == undefined) {
				vData.qxSettings = new Object();
			}
			if (vData.blueprintData != undefined && vData.blueprintData.qxOverride != undefined) {
				vData.qxSettings = blueprint.util.Misc.combineJson(vData.qxSettings, vData.blueprintData.qxOverride);
			}

			if (vData.constructorSettings == undefined) {
				vData.constructorSettings = new Object();
			}
			if (vData.blueprintData != undefined && vData.blueprintData.blueprintOverride != undefined) {
				vData.constructorSettings = blueprint.util.Misc.combineJson(vData.constructorSettings, vData.blueprintData.blueprintOverride);
			}
			//this.debug('GENERATING==> ' + vData.objectClass);
			
			var newItem = this.buildObject(vData, namespace, skipRecursion);
			
			// If the object is a top container, check for namespace fucntions that need to be run after object creation.
			if (vData.type == 'top_container') {
			    if (blueprint.util.Registry.getInstance().check(newItem, '__postContainerConstruct__') && 
			        blueprint.util.Registry.getInstance().check(newItem, '__postContainerConstruct__args__')) {
			        var constructors = blueprint.util.Registry.getInstance().get(newItem, '__postContainerConstruct__');
			        var args = blueprint.util.Registry.getInstance().get(newItem, '__postContainerConstruct__args__');
			        for (var k=0;k<constructors.length;k++) {
			            constructors[k](args[k][0], args[k][1], args[k][2], args[k][3]);
		            }
		            
		            blueprint.util.Registry.getInstance().set(namespace, '__postContainerConstruct__', null);
			        blueprint.util.Registry.getInstance().set(namespace, '__postContainerConstruct__args__', null);
			    }
			}
			return newItem;
		},
		
		buildObject : function(vData, namespace, skipRecursion)
		{
			var newItem = null;
			switch(vData.objectClass) {
				case 'blueprint.ui.basic.Image':
				newItem = new blueprint.ui.basic.Image(vData, namespace, skipRecursion);
				break;

				case 'blueprint.ui.basic.Label':
				newItem = new blueprint.ui.basic.Label(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.container.Composite':
				newItem = new blueprint.ui.container.Composite(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.container.Scroll':
				newItem = new blueprint.ui.container.Scroll(vData, namespace, skipRecursion);
				break;

				case 'blueprint.ui.form.Button':
				newItem = new blueprint.ui.form.Button(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.CheckBox':
				newItem = new blueprint.ui.form.CheckBox(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.DateField':
				newItem = new blueprint.ui.form.DateField(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.HiddenField':
				newItem = new blueprint.ui.form.HiddenField(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.PasswordField':
				newItem = new blueprint.ui.form.PasswordField(vData, namespace, skipRecursion);
				break;
							
				case 'blueprint.ui.form.RadioGroup':
				newItem = new blueprint.ui.form.RadioGroup(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.RadioButton':
				newItem = new blueprint.ui.form.RadioButton(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.SelectBox':
				newItem = new blueprint.ui.form.SelectBox(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.Slider':
				newItem = new blueprint.ui.form.Slider(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.Spinner':
				newItem = new blueprint.ui.form.Spinner(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.form.TextArea':
				newItem = new blueprint.ui.form.TextArea(vData, namespace, skipRecursion);
				break;

				case 'blueprint.ui.form.TextField':
				newItem = new blueprint.ui.form.TextField(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.groupbox.GroupBox':
				newItem = new blueprint.ui.groupbox.GroupBox(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.menu.Button':
				newItem = new blueprint.ui.menu.Button(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.menu.Separator':
				newItem = new blueprint.ui.menu.Separator(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.table.cellrenderer.Default':
				newItem = new blueprint.ui.table.cellrenderer.Default(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.table.model.Simple':
				newItem = new blueprint.ui.table.model.Simple(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.table.Table':
				newItem = new blueprint.ui.table.Table(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.tabview.Page':
				newItem = new blueprint.ui.tabview.Page(vData, namespace, skipRecursion);
				break;

				case 'blueprint.ui.tabview.TabView':
				newItem = new blueprint.ui.tabview.TabView(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.Button':
				newItem = new blueprint.ui.toolbar.Button(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.CheckBox':
				newItem = new blueprint.ui.toolbar.CheckBox(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.MenuButton':
				newItem = new blueprint.ui.toolbar.MenuButton(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.RadioButton':
				newItem = new blueprint.ui.toolbar.RadioButton(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.Separator':
				newItem = new blueprint.ui.toolbar.Separator(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.SplitButton':
				newItem = new blueprint.ui.toolbar.SplitButton(vData, namespace, skipRecursion);
				break;
				
				case 'blueprint.ui.toolbar.ToolBar':
				newItem = new blueprint.ui.toolbar.ToolBar(vData, namespace, skipRecursion);
				break;

				case 'blueprint.ui.window.Window':
				newItem = new blueprint.ui.window.Window(vData, namespace, skipRecursion);
				break;

				default:
				this.warn("Manager doesn't know what to do with: " + vData.objectClass);
				eval("newItem = new blueprint." + vData.objectClass + "(vData, namespace, skipRecursion)");
				break;
			}
			return newItem;
		}
	}
});
