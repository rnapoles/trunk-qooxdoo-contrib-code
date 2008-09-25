
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

/*
#embed(qx.icontheme/22/actions/zoom.png)
*/

qx.Class.define("soapdemo.Application", { extend : qx.application.Gui
    ,statics : {
         cliSvc1 : null
        ,cliSvc2 : null
        ,container : null
    }
    ,members : {
        main : function() {
            this.base(arguments);

            soapdemo.Application.cliSvc1 = new soap.client("http://"+document.location.host+"/svc1/");
            soapdemo.Application.cliSvc2 = new soap.client("http://"+document.location.host+"/svc2/");

            var self=this;
            soapdemo.Application.cliSvc1.callAsync("name", new soap.parameters(), function(r) { 
				alert(r);  
			});
            soapdemo.Application.cliSvc2.callAsync("name", new soap.parameters(), function(r) { 
				alert(r);  
			});

            var clidoc = qx.ui.core.ClientDocument.getInstance();

            var cnt_main = new qx.ui.layout.CanvasLayout;
            soapdemo.Application.container=cnt_main;
            cnt_main.setWidth("100%");
            cnt_main.setHeight("100%");
            clidoc.add(cnt_main);

            scr_demo=new soapdemo.scr.main();
            cnt_main.add(scr_demo.getWidget());
        }
    }
});

