
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

qx.Class.define("soapdemo.scr.basic.table", { extend : qx.core.Object
    ,properties : {
        widget : { check : "Object" }
    }
    ,construct : function(container) {
        self=this;

        var lv = new qx.ui.layout.VerticalBoxLayout;
        lv.setWidth("100%");
        lv.setHeight("100%");
        lv.setSpacing(5);
        this.setWidget(lv);
        
        var params = new soap.parameters();
        var tableModel = new soapdemo.RemoteImpl(soapdemo.Application.cliSvc1, "get_integers_count", "get_integers", params);
        tableModel.setColumns(  ["By One", "By Two", "By Three", "By Four", "By Five"]
                               ,["byone", "bytwo", "bythree", "byfour", "byfive"]);

        var table = new qx.ui.table.Table(tableModel);
        with (table) {
            set({
                 width:  "100%"
                ,height: "80%"
                ,border: "inset-thin"
            });
            var selectionMode = qx.ui.table.selection.Model.SINGLE_SELECTION;
            getSelectionModel().setSelectionMode(selectionMode);
        }
        lv.add(table);

    }
});
