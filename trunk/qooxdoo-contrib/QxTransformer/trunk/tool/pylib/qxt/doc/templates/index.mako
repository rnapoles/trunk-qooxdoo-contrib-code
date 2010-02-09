<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>QxTransformer - Documentation - ${current.get('tagName')}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="keywords" content="qooxdoo, javascript, toolkit, web, web-2.0, ajax, dom, style, interface, widget, library, open-source, java-script, gui, ui, user-interface, application, web-application, xml, declarative ui, qxtransformer, qx transformer, convertor " >
    <meta name="description" content="QxTransformer is an open source framework providing conversion from a transparent XML description of the graphical user interface (GUI) to JavaScript code." >
    <meta name="author" content="Siarhei Barysiuk, Christian Boulanger" >
    
    
    <link rel="shortcut icon" href="../images/favicon.ico">
    <link href="../../style.css" rel="stylesheet" type="text/css">
    <link href="../css/style.css" rel="stylesheet" type="text/css">
    <link href="../css/highlight.css" rel="stylesheet" type="text/css">
    <!--[if gte IE 6]>
        <link href="../../css/iefix.css" rel="stylesheet" type="text/css">
		<link href="../css/iefix.css" rel="stylesheet" type="text/css">
	<![endif]-->
    
    <script language="javascript" type="text/javascript" src="../../scripts/jquery-1.2.6.min.js"></script>
    <script language="javascript" type="text/javascript" src="../scripts/highlight.pack.js"></script>
    <script language="javascript" type="text/javascript" src="../scripts/viewer.js"></script>
    <!--[if IE 6]>
    <script language="javascript" type="text/javascript" src="../../scripts/pngfix.js"></script>
    <script language="javascript" type="text/javascript">
        DD_belatedPNG.fix('.icon_sm');
        DD_belatedPNG.fix('.icon');
        DD_belatedPNG.fix('.twit_border');
    </script>
    <![endif]-->
    <script type="text/javascript">
    	 hljs.initHighlightingOnLoad();
    </script>
</head>
<body>
    <div id="container">
        <div id="content">
            <div id="top">
            </div>
            <div>
                <div id="twitter">
                    <div class="twit_border twit_left"> </div>
                    <div class="twit_border twit_right"> </div>
                    <div class="tcontent">
                    	<p>Documentation</p> 
                    </div>
                </div>
                
                <div id="panes">
                	<div id="nav_pane">
            			<div class="caption">
                            <div class="icon tags"> </div>
                            <span>Tags</span>
                        </div>
                        
                        <div class="search_panel">
                        	<div class="left_border"> </div>
                        	<div class="right_border"> </div>
                        	<div class="center">
                        		<input type="text" name="tag_search_field" id="tag_search_field" value="" />
                        		<!-- input type="image" src="../images/ok_btn.gif" id="tag_search_btn" value="Ok"/ -->
                        	</div>
                        	
                        	<div class="hint"><div> </div></div>
                        </div>
                        
                        <ul>
                            %for tag in tags:
                                <li \
%if tag.get('tagName')==current.get('tagName'):
 class="selected" \
%endif
>
                                    <a href="../${tag.get('ns')}/${tag.get('localName')}.html">${tag.get('tagName')}</a>
                                </li>
                             %endfor
                        </ul>
                	</div>
                	<div id="content_pane">
            			<div class="caption">
                            <div class="icon reference"> </div>
                            <span>Reference</span>
                        </div>
                        
                        <div class="description">
                        	<span class="qxtag">${current.get('tagName')}</span> (<span class="qxclass"><a href="${api_viewer_url}${current.get('className')}">${current.get('className')}</a></span>)
                        	<div class="info">
                        		%if current.get('classInfo'):
                        		    ${current.get('classInfo').get('info')}
                        		%endif
                        	</div>
                        </div>
                        
                        <ul class="nav">
                        	<li class="active"><a href="#attributes">Attributes</a></li>
                        	<li><a href="#samples">Samples</a></li>
                        	<li><a href="#config">Config</a></li>
                        </ul>
                        
                        <div class="nav-panes">
                        	<div id="attributes">
                        		<div class="search_panel">
                        			<div class="left_border"> </div>
		                        	<div class="right_border"> </div>
		                        	<div class="center">
		                        		<input type="text" name="attr_search_field" id="attr_search_field" value="" />
		                        		<!-- input type="image" id="attr_search_btn" src="../images/ok_btn.gif" value="Ok"/ -->
		                        	</div>
		                        	
		                        	<div class="hint"><div> </div></div>
		                        </div>
		                        
		                        <dl>
                        		    %if properties:
                            		    %for name, info in properties.iteritems():
                            		        <dt><span class="attr">${name}</a></dt>
        		                        	<dd>
        		                        	    ${info.get('info')}
        		                        	    <div class="values">
        		                        			<span>Default value: ${info.get('defaultValue','N/A')}</span>
        		                        			<span>Possible values: ${info.get('possibleValues','N/A')}</span>
        		                        		</div>
        		                        	</dd>
                            		    %endfor
                            		%endif
                        		</dl>
                        		
		                        
                        	</div>
                        	<div id="samples">
                        	</div>
                        	<div id="config">
<pre><code class="javascript">
${current.get('tagConfigCode')}
</code></pre>
                        	</div>
                        </div>
                        
                        
                        
                	</div>
                </div>
                
            </div>
            <div id="bottom">
                <p>LGPL, EPL &copy; 2008 QxTransformer  |  <a class="bottom" href="mailto:s.barysiuk(at)qxtransformer.org">Siarhei Barysiuk</a> &amp; 
                    <a class="bottom" href="mailto:c.boulanger(at)qxtransformer.org">Christian Boulanger</a>. <br>
                Site design and illustrations by  <a class="bottom" href="mailto:s.barysiuk(at)qxtransformer.org">Siarhei Barysiuk</a>.  |  Icons by <a class="bottom" href="http://dryicons.com">Dry Icons</a>.</p>
                <img src="http://qxtransformer.org/images/qx_logo.png" alt="qooxdoo">
            </div>
        </div>
    </div>
</body>
</html>
