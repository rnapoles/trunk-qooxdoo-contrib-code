
/**
    Generated by QxTransformer v.0.4.
    Author Siarhei Barysiuk
**/
/* ------------------------------------------------------------------------------
#asset(addressbook/pencil.png)
#asset(icon/${qx.icontheme}/16/actions/edit-delete.png)
#asset(addressbook/users.png)
#asset(icon/${qx.icontheme}/16/actions/list-add.png)
#asset(addressbook/user_a.png)
#asset(addressbook/contact.png)

------------------------------------------------------------------------------ */

qx.Class.define("addressbook.Application",
{
  extend : addressbook.InitApplication,

  members :
  {
    /**
     * TODOC
     *
     * @return {void} 
     */
    main : function()
    {
      this.base(arguments);

      this.print();
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    print : function()
    {
      var qxGrid1 = new qx.ui.layout.Grid(5, 3);

      var qxComposite1 = new qx.ui.container.Composite(qxGrid1);

      qxComposite1.setMargin(5);

      this.getRoot().add(qxComposite1);

      qxGrid1.setSpacingY(3);
      qxGrid1.setSpacingX(5);

      qxGrid1.setColumnWidth(0, 150);
      qxGrid1.setColumnWidth(1, 150);
      qxGrid1.setColumnWidth(2, 300);
      var qxHbox1 = new qx.ui.layout.HBox(null, null, null);

      var qxComposite2 = new qx.ui.container.Composite(qxHbox1);

      qxComposite1.add(qxComposite2,
      {
        row    : 0,
        column : 0
      });

      var qxAtom1 = new qx.ui.basic.Atom("Groups", "addressbook/users.png");

      qxAtom1.setLabel("Groups");
      qxAtom1.setAppearance("groupbox/legend");
      qxAtom1.setIcon("addressbook/users.png");

      qxComposite2.add(qxAtom1);

      var qxSpacer1 = new qx.ui.core.Spacer(null, null);

      qxComposite2.add(qxSpacer1, { flex : 1 });

      var addGroupBtn = new qx.ui.basic.Image("icon/16/actions/list-add.png");
      this.addGroupBtn = addGroupBtn;

      addGroupBtn.setSource("icon/16/actions/list-add.png");

      qxComposite2.add(addGroupBtn);

      addGroupBtn.addListener("click", this.toggleGroupForm, this);

      var groupList = new qx.ui.form.List();
      this.groupList = groupList;

      groupList.setSelectionMode("single");

      qxComposite1.add(groupList,
      {
        row    : 1,
        column : 0
      });

      var qxContextMenu1 = new qx.ui.menu.Menu();

      groupList.setContextMenu(qxContextMenu1);

      var qxMenuButton1 = new qx.ui.menu.Button("Edit", "addressbook/pencil.png", null, null);

      qxMenuButton1.setLabel("Edit");
      qxMenuButton1.setIcon("addressbook/pencil.png");

      qxContextMenu1.add(qxMenuButton1);

      qxMenuButton1.addListener("execute", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.edit.group", e));
      });

      var qxMenuButton2 = new qx.ui.menu.Button("Delete", "icon/16/actions/edit-delete.png", null, null);

      qxMenuButton2.setLabel("Delete");
      qxMenuButton2.setIcon("icon/16/actions/edit-delete.png");

      qxContextMenu1.add(qxMenuButton2);

      qxMenuButton2.addListener("execute", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.delete.group", e));
      });

      groupList.addListener("changeSelection", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.select.group", e));
      });

      var groupNameTF = new qx.ui.form.TextField("...");
      this.groupNameTF = groupNameTF;

      groupNameTF.setVisibility("hidden");
      groupNameTF.setValue("...");

      qxComposite1.add(groupNameTF,
      {
        row    : 3,
        column : 0
      });

      groupNameTF.addListener("keyup", function(e)
      {
        if (e.getKeyIdentifier() == "Enter")
        {
          this.hide();
          qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.add.group"));
        }
      });

      var qxHbox2 = new qx.ui.layout.HBox(null, null, null);

      var qxComposite3 = new qx.ui.container.Composite(qxHbox2);

      qxComposite1.add(qxComposite3,
      {
        row    : 0,
        column : 1
      });

      var qxAtom2 = new qx.ui.basic.Atom("Contacts", "addressbook/user_a.png");

      qxAtom2.setLabel("Contacts");
      qxAtom2.setAppearance("groupbox/legend");
      qxAtom2.setIcon("addressbook/user_a.png");

      qxComposite3.add(qxAtom2);

      var qxSpacer2 = new qx.ui.core.Spacer(null, null);

      qxComposite3.add(qxSpacer2, { flex : 1 });

      var addContactBtn = new qx.ui.basic.Image("icon/16/actions/list-add.png");
      this.addContactBtn = addContactBtn;

      addContactBtn.setSource("icon/16/actions/list-add.png");
      addContactBtn.setEnabled(false);

      qxComposite3.add(addContactBtn);

      addContactBtn.addListener("click", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.add.contact.mode.new", e));
      });

      qx.event.message.Bus.getInstance().subscribe("ab.select.group", function(m)
      {
        var selectedItems = m.getData().getData();
        if (selectedItems && selectedItems.length > 0) this.setEnabled(true);
      },
      addContactBtn);

      var contactList = new qx.ui.form.List();
      this.contactList = contactList;

      contactList.setSelectionMode("single");

      qxComposite1.add(contactList,
      {
        row    : 1,
        column : 1
      });

      var qxContextMenu2 = new qx.ui.menu.Menu();

      contactList.setContextMenu(qxContextMenu2);

      var qxMenuButton3 = new qx.ui.menu.Button("Edit", "addressbook/pencil.png", null, null);

      qxMenuButton3.setLabel("Edit");
      qxMenuButton3.setIcon("addressbook/pencil.png");

      qxContextMenu2.add(qxMenuButton3);

      qxMenuButton3.addListener("execute", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.add.contact.mode.edit", e));
      });

      var qxMenuButton4 = new qx.ui.menu.Button("Delete", "icon/16/actions/edit-delete.png", null, null);

      qxMenuButton4.setLabel("Delete");
      qxMenuButton4.setIcon("icon/16/actions/edit-delete.png");

      qxContextMenu2.add(qxMenuButton4);

      qxMenuButton4.addListener("execute", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.delete.contact", e));
      });

      contactList.addListener("changeSelection", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.select.contact", e));
      });

      var stack = new qx.ui.container.Stack();
      this.stack = stack;

      qxComposite1.add(stack,
      {
        row     : 0,
        column  : 2,
        rowSpan : 3,
        colSpan : 1
      });

      var qxGroupBox1 = new qx.ui.groupbox.GroupBox("Information", "addressbook/contact.png");

      qxGroupBox1.setIcon("addressbook/contact.png");
      qxGroupBox1.setLegend("Information");

      stack.add(qxGroupBox1);

      var qxGrid2 = new qx.ui.layout.Grid(3, 3);

      qxGrid2.setSpacingY(3);
      qxGrid2.setSpacingX(3);

      qxGroupBox1.setLayout(qxGrid2);

      qxGrid2.setColumnFlex(1, 1);

      var nameLb = new qx.ui.basic.Label("----- -----");
      this.nameLb = nameLb;

      nameLb.setContent("----- -----");
      nameLb.setFont(qx.bom.Font.fromString('20px sans-serif'));

      qxGroupBox1.add(nameLb,
      {
        row     : 0,
        column  : 0,
        rowSpan : 1,
        colSpan : 2
      });

      nameLb.addListener("dblclick", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.add.contact.mode.edit", e));
      });

      var qxSpacer3 = new qx.ui.core.Spacer(5, 5);

      qxSpacer3.setWidth(5);
      qxSpacer3.setHeight(5);

      qxGroupBox1.add(qxSpacer3,
      {
        row     : 1,
        column  : 0,
        rowSpan : 1,
        colSpan : 2
      });

      var qxLabel1 = new qx.ui.basic.Label("Phone: ");

      qxLabel1.setContent("Phone: ");
      qxLabel1.setPadding(3);

      qxGroupBox1.add(qxLabel1,
      {
        row    : 2,
        column : 0
      });

      var phoneLb = new qx.ui.basic.Label("-----");
      this.phoneLb = phoneLb;

      phoneLb.setContent("-----");

      qxGroupBox1.add(phoneLb,
      {
        row    : 2,
        column : 1
      });

      var qxLabel2 = new qx.ui.basic.Label("E-mail: ");

      qxLabel2.setContent("E-mail: ");
      qxLabel2.setPadding(3);

      qxGroupBox1.add(qxLabel2,
      {
        row    : 3,
        column : 0
      });

      var emailLb = new qx.ui.basic.Label("-----");
      this.emailLb = emailLb;

      emailLb.setContent("-----");

      qxGroupBox1.add(emailLb,
      {
        row    : 3,
        column : 1
      });

      var qxLabel3 = new qx.ui.basic.Label("Web Site: ");

      qxLabel3.setContent("Web Site: ");
      qxLabel3.setPadding(3);

      qxGroupBox1.add(qxLabel3,
      {
        row    : 4,
        column : 0
      });

      var webSiteLb = new qx.ui.basic.Label("-----");
      this.webSiteLb = webSiteLb;

      webSiteLb.setContent("-----");

      qxGroupBox1.add(webSiteLb,
      {
        row    : 4,
        column : 1
      });

      var qxGroupBox2 = new qx.ui.groupbox.GroupBox("Edit information", "addressbook/contact.png");

      qxGroupBox2.setIcon("addressbook/contact.png");
      qxGroupBox2.setLegend("Edit information");

      stack.add(qxGroupBox2);

      var qxGrid3 = new qx.ui.layout.Grid(3, 3);

      qxGrid3.setSpacingY(3);
      qxGrid3.setSpacingX(3);

      qxGroupBox2.setLayout(qxGrid3);

      qxGrid3.setColumnFlex(1, 1);
      qxGrid3.setRowFlex(4, 1);

      var nameTF = new qx.ui.form.TextField("----- -----");
      this.nameTF = nameTF;

      nameTF.setValue("----- -----");
      nameTF.setFont(qx.bom.Font.fromString('20px sans-serif'));

      qxGroupBox2.add(nameTF,
      {
        row     : 0,
        column  : 0,
        rowSpan : 1,
        colSpan : 2
      });

      var qxSpacer4 = new qx.ui.core.Spacer(5, 5);

      qxSpacer4.setWidth(5);
      qxSpacer4.setHeight(5);

      qxGroupBox2.add(qxSpacer4,
      {
        row     : 1,
        column  : 0,
        rowSpan : 1,
        colSpan : 2
      });

      var qxLabel4 = new qx.ui.basic.Label("Phone: ");

      qxLabel4.setContent("Phone: ");
      qxLabel4.setPadding(3);

      qxGroupBox2.add(qxLabel4,
      {
        row    : 2,
        column : 0
      });

      var phoneTF = new qx.ui.form.TextField("-----");
      this.phoneTF = phoneTF;

      phoneTF.setValue("-----");

      qxGroupBox2.add(phoneTF,
      {
        row    : 2,
        column : 1
      });

      var qxLabel5 = new qx.ui.basic.Label("E-mail: ");

      qxLabel5.setContent("E-mail: ");
      qxLabel5.setPadding(3);

      qxGroupBox2.add(qxLabel5,
      {
        row    : 3,
        column : 0
      });

      var emailTF = new qx.ui.form.TextField("-----");
      this.emailTF = emailTF;

      emailTF.setValue("-----");

      qxGroupBox2.add(emailTF,
      {
        row    : 3,
        column : 1
      });

      var qxLabel6 = new qx.ui.basic.Label("Web Site: ");

      qxLabel6.setContent("Web Site: ");
      qxLabel6.setPadding(3);

      qxGroupBox2.add(qxLabel6,
      {
        row    : 4,
        column : 0
      });

      var webSiteTF = new qx.ui.form.TextField("-----");
      this.webSiteTF = webSiteTF;

      webSiteTF.setValue("-----");

      qxGroupBox2.add(webSiteTF,
      {
        row    : 4,
        column : 1
      });

      var qxHbox3 = new qx.ui.layout.HBox(5, null, null);

      var qxComposite4 = new qx.ui.container.Composite(qxHbox3);

      qxGroupBox2.add(qxComposite4,
      {
        row    : 5,
        column : 1
      });

      qxHbox3.setSpacing(5);

      var qxSpacer5 = new qx.ui.core.Spacer(null, null);

      qxComposite4.add(qxSpacer5, { flex : 1 });

      var qxButton1 = new qx.ui.form.Button("Ok", null, null);

      qxButton1.setLabel("Ok");

      qxComposite4.add(qxButton1);

      qxButton1.addListener("execute", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.add.contact.ok", e));
      });

      var qxButton2 = new qx.ui.form.Button("Cancel", null, null);

      qxButton2.setLabel("Cancel");

      qxComposite4.add(qxButton2);

      qxButton2.addListener("execute", function(e) {
        qx.event.message.Bus.getInstance().dispatch(new qx.event.message.Message("ab.add.contact.cancel", e));
      });

      qx.event.message.Bus.getInstance().dispatch("ab.load.group", {});
    }
  }
});