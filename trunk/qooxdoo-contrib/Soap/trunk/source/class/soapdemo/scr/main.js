
/*
 * Copyright (c) 2008, Burak Arslan (burak.arslan-qx@arskom.com.tr).
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Arskom Consultancy Ltd. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Burak Arslan ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Burak Arslan BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

qx.Class.define("soapdemo.scr.main", { extend : qx.core.Object
    ,properties : {
        widget : { check : "Object" }
    }
    ,construct : function() {
        self=this;

        var lvMain = new qx.ui.layout.VerticalBoxLayout();
        lvMain.setWidth("100%");
        lvMain.setHeight("100%");
        this.setWidget(lvMain);

        var toolBar = new qx.ui.toolbar.ToolBar();
        toolBar.setWidth("100%");
        lvMain.add(toolBar);

        var lhToolbar = new qx.ui.layout.HorizontalBoxLayout();
        lhToolbar.setWidth("100%");
        lhToolbar.setHeight("100%");
        toolBar.add(lhToolbar);

        var lbl = new qx.ui.basic.Label(null);
        lbl.setWidth("1*");
        lbl.setTop(0);
        lbl.setLeft(10);
        lbl.setText('<b>SOAP Demo</b>');
        lhToolbar.add(lbl);

		var lbBottom = new qx.ui.layout.BoxLayout();
        lbBottom.setWidth("100%");
        lbBottom.setHeight("100%");
		lvMain.add(lbBottom);
				
        var btnSimple = new qx.ui.toolbar.Button(this.tr("Simple"));
        btnSimple.addEventListener("execute", function(e) {
			lbBottom.removeAll();
			w = new soapdemo.scr.basic.simple();
			lbBottom.add(w.getWidget());
        }, this);
        lhToolbar.add(btnSimple);

        var btnTable = new qx.ui.toolbar.Button(this.tr("Table"));
        btnTable.addEventListener("execute", function(e) {
			lbBottom.removeAll();
			w = new soapdemo.scr.basic.table();
			lbBottom.add(w.getWidget());
        }, this);
        lhToolbar.add(btnTable);
		
    }
});
