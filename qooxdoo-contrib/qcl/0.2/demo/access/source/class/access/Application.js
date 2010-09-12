/**
 * Generated by QxTransformer v.0.4. 
 * Author Christian Boulanger
 */

/*------------------------------------------------------------------------------

 ------------------------------------------------------------------------------*/
qx.Class.define("access.Application", {
			extend : access.Main,

			members : {
				main : function() {
					this.base(arguments);
					this.__qxtCreateUI();
				},

				__qxtCreateUI : function() {

					var qclLoginDialog1 = new qcl.ui.dialog.Login();

					qclLoginDialog1.setCallback(this.checkLogin);
					qclLoginDialog1.setWidgetId("loginDialog");
					qclLoginDialog1.setAllowCancel(true);
					qclLoginDialog1.setText("qcl demo application");
					qclLoginDialog1.setImage("access/qooxdoo-logo.gif");
					qclLoginDialog1.setMessage("Please log in.");

					this.getRoot().add(qclLoginDialog1);

					var qxVbox1 = new qx.ui.layout.VBox(null, null, null);

					var qxComposite1 = new qx.ui.container.Composite();
					qxComposite1.setLayout(qxVbox1)

					this.getRoot().add(qxComposite1, {
								edge : 0
							});

					var componentsToolBar1 = new access.components.ToolBar();

					qxComposite1.add(componentsToolBar1);

					var qxVbox2 = new qx.ui.layout.VBox(10, null, null);

					var qxComposite2 = new qx.ui.container.Composite();
					qxComposite2.setLayout(qxVbox2)

					qxComposite2.setMargin(30);

					qxComposite1.add(qxComposite2);

					qxVbox2.setSpacing(10);

					var componentsBody1 = new access.components.Body();

					qxComposite2.add(componentsBody1);

					var componentsFooter1 = new access.components.Footer();

					qxComposite2.add(componentsFooter1);

				}

			}

		});
