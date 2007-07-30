qx.Class.define("LoginTestApplication",
{
  extend : qx.application.Gui,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    qx.application.Gui.call(this);
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void} 
     */
    main : function(e)
    {
      this.base(arguments);

      var url = 'http://127.0.0.1:8007';
      var service = 'qooxdoo.admin';
      var rpc = new qx.io.remote.Rpc(url, service);
      rpc.setCrossDomain(true);
      rpc.setTimeout(1000);

      var d = qx.ui.core.ClientDocument.getInstance();

      var unl = new qx.ui.basic.Label('Username:');

      with (unl) {
        setSelectable(false);
      }

      var unf = new qx.ui.form.TextField;

      with (unf)
      {
        setBorder("black");
        setBackgroundColor("white");
        setPadding(2, 4);
        setAllowStretchX(true);
      }

      var pwl = new qx.ui.basic.Label('Password:');

      with (pwl) {
        setSelectable(false);
      }

      var pwf = new qx.ui.form.PasswordField;

      with (pwf)
      {
        setBorder("black");
        setBackgroundColor("white");
        setPadding(2, 4);
        setAllowStretchX(true);
      }

      var login = new qx.ui.form.Button("Login", "icon/16/actions/dialog-ok.png");

      with (login) {
        setAllowStretchX(true);
      }

      var gr = new qx.ui.layout.GridLayout;

      with (gr)
      {
        setDimension("auto", "auto");

        // setBorder("outset");
        setAllowStretchX(true);
        setPadding(8);
        setColumnCount(2);
        setRowCount(3);
        setVerticalSpacing(4);
        setHorizontalSpacing(6);
        setColumnWidth(0, 80);
        setColumnWidth(1, 160);
        setRowHeight(0, 40);
        setRowHeight(1, 40);
        setRowHeight(2, 40);
        setColumnHorizontalAlignment(0, "right");
        setColumnHorizontalAlignment(1, "left");
        setColumnVerticalAlignment(0, "middle");
        setColumnVerticalAlignment(1, "middle");
        add(unl, 0, 0);
        add(unf, 1, 0);
        add(pwl, 0, 1);
        add(pwf, 1, 1);
        add(login, 1, 2);
      }

      var lw = new qx.ui.window.Window("Login", "icon/16/apps/preferences-desktop-multimedia.png");

      with (lw) {
        add(gr);
      }

      var sessid = new qx.ui.form.TextField;

      with (sessid)
      {
        setValue('session ID');
        setBorder("black");
        setBackgroundColor("white");
        setPadding(2, 4);
        setAllowStretchX(true);
      }

      var logout = new qx.ui.form.Button("Logout", "icon/16/actions/dialog-ok.png");
      with (logout) {}

      var vb = new qx.ui.layout.VerticalBoxLayout;

      with (vb)
      {
        add(sessid);
        add(logout);
      }

      var ow = new qx.ui.window.Window("Program", "icon/16/apps/preferences-desktop-multimedia.png");

      with (ow) {
        add(vb);
      }

      login.addEventListener("execute", function(e)
      {
        rpc.callAsync(function(result, error)
        {
          if (!error && result)
          {
            lw.close();
            ow.open();

            rpc.callAsync(function(result, error) {
              sessid.setValue(result);
            }, 'getSessionID');
          }
          else
          {
            unf.setValue('Invalid username/password!');
          }
        },
        'login', unf.getValue(), pwf.getValue());
      });

      logout.addEventListener("execute", function(e)
      {
        rpc.callAsync(function(result, error)
        {
          sessid.setValue('logged out');
          ow.close();
          lw.open();
        },
        'logout');
      });

      with (d)
      {
        add(lw);
        add(ow);
      }

      lw.open();
    }
  }
});
