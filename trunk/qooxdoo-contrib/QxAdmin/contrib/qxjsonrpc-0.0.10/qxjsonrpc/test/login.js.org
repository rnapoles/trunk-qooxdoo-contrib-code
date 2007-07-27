qx.OO.defineClass("LoginTestApplication", qx.component.AbstractApplication, function() {
  qx.component.AbstractApplication.call(this);
});

qx.Proto.main = function(e)
{
    var url='http://127.0.0.1:8000';
    var service='login.test';
    var rpc=new qx.io.remote.Rpc(url, service);
    rpc.setCrossDomain(true);
    rpc.setTimeout(1000);

    var d = qx.ui.core.ClientDocument.getInstance();

    var unl = new qx.ui.basic.Label('Username:');
    with(unl) {
        setSelectable(false);
    }
    
    var unf = new qx.ui.form.TextField;
    with(unf) {
        setBorder(qx.renderer.border.BorderPresets.getInstance().black);
        setBackgroundColor(new qx.renderer.color.Color("white"));
        setPadding(2, 4);
        setAllowStretchX(true);
    }

    var pwl = new qx.ui.basic.Label('Password:');
    with(pwl) {
        setSelectable(false);
    }

    var pwf = new qx.ui.form.PasswordField;
    with(pwf) {
        setBorder(qx.renderer.border.BorderPresets.getInstance().black);
        setBackgroundColor(new qx.renderer.color.Color("white"));
        setPadding(2, 4);
        setAllowStretchX(true);
    }
   
    var login = new qx.ui.form.Button("Login", "icon/16/actions/dialog-ok.png");
    with(login) {
        setAllowStretchX(true);
    }
    
    var gr = new qx.ui.layout.GridLayout;
    with(gr) {
        setDimension("auto", "auto");
        //setBorder(qx.renderer.border.BorderPresets.getInstance().outset);
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
        add(unl,0,0)
        add(unf,1,0)
        add(pwl,0,1)
        add(pwf,1,1)
        add(login,1,2)
    }
    
    var lw = new qx.ui.window.Window("Login", "icon/16/apps/preferences-desktop-multimedia.png");
    with(lw) {
        add(gr);
    }

    var sessid = new qx.ui.form.TextField;
    with(sessid) {
        setValue('session ID');
        setBorder(qx.renderer.border.BorderPresets.getInstance().black);
        setBackgroundColor(new qx.renderer.color.Color("white"));
        setPadding(2, 4);
        setAllowStretchX(true);
    }

    var logout = new qx.ui.form.Button("Logout", "icon/16/actions/dialog-ok.png");
    with(logout) {
    }

    var vb = new qx.ui.layout.VerticalBoxLayout;
    with(vb) {
        add(sessid);
        add(logout);
    }
    
    var ow = new qx.ui.window.Window("Program", "icon/16/apps/preferences-desktop-multimedia.png");
    with(ow) {
        add(vb);
    }

    login.addEventListener("execute", function(e) {
        rpc.callAsync(function(result, error) {
            if(!error && result) {
                lw.close();
                ow.open();
                rpc.callAsync(function(result, error) {
                    sessid.setValue(result);
                }, 'getSessionID');
            } else {
                unf.setValue('Invalid username/password!');
            }
        }, 'login', unf.getValue(), pwf.getValue());
    });

    logout.addEventListener("execute", function(e) {
        rpc.callAsync(function(result, error) {
            sessid.setValue('logged out');
            ow.close();
            lw.open();
        }, 'logout');
    });

    with(d) {
        add(lw);
        add(ow);
    }

    lw.open();
};