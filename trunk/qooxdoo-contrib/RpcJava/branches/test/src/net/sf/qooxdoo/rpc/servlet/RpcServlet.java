package net.sf.qooxdoo.rpc.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.qooxdoo.rpc.RpcHandler;
import net.sf.qooxdoo.rpc.log.IRpcLogger;
import net.sf.qooxdoo.rpc.log.RpcLogType;

/**
 * Minimal implementation of an rpc servlet - completely untested ;-)
 * TODO: implement all the features from the old servlet
 *  
 * @author mwyraz
 */
public class RpcServlet extends HttpServlet implements IRpcLogger {
    
    private static final long serialVersionUID = 1L;

    protected RpcHandler rpcHandler;

    protected boolean logRequestText=false;
    protected boolean logResponseText=false;
    protected boolean logRpcExceptions=true;
    
    protected final ThreadLocal<HttpServletRequest> requestTl=new ThreadLocal<HttpServletRequest>();
    /**
     * Implementation of an instance container that uses the user's session.
     */
    protected IServiceInstanceContainer instanceContainer=new IServiceInstanceContainer() {
	public Object getServiceInstance(String name) {
	    return requestTl.get().getSession(true).getAttribute("qooxdoo-RpcServlet:"+name);
	};
	public void putServiceInstance(String name, Object instance) {
	    requestTl.get().getSession(true).setAttribute("qooxdoo-RpcServlet:"+name,instance);
	};
    };
    
    @Override
    public void init() throws ServletException {
        super.init();
        
        this.logRequestText="true".equalsIgnoreCase(getInitParameter("logRequestText"));
        this.logResponseText="true".equalsIgnoreCase(getInitParameter("logResponseText"));
        this.logRpcExceptions=!("false".equalsIgnoreCase(getInitParameter("logRpcExceptions")));
        
        rpcHandler=new RpcHandler();
        rpcHandler.setLogger(this);
        rpcHandler.setServiceFactory(new RpcTaggedServiceFactory(instanceContainer));
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
	
	requestTl.set(req);
        try {
        	String jsonRequest=readStream(req.getInputStream());
        	
        	String jsonResponse;
        	try {
        	    jsonResponse=rpcHandler.handleRequest(jsonRequest);
        	} catch (Exception ex) {
        	    if (ex instanceof IOException) throw (IOException) ex;
        	    throw new ServletException(ex);
        	}
        	
        	resp.setContentType("text/javascript");
        	resp.setCharacterEncoding("utf-8");
        	
        	OutputStreamWriter out=new OutputStreamWriter(resp.getOutputStream(),"utf-8");
        	try {
        	    out.write(jsonResponse);
        	} finally {
        	    out.close();
        	}
        } finally {
            requestTl.remove();
        }
    }
    
    
    protected String readStream(InputStream in) throws IOException {
	Reader inR=new InputStreamReader(in,"utf-8");
	char[] buffer=new char[8192];
	int read;
	StringBuilder sb=new StringBuilder();
	while ((read=inR.read(buffer,0,8192))>-1) {
	    sb.append(buffer,0,read);
	}
	return sb.toString();
    }
    
    @Override
    public boolean isLogEnabled(RpcLogType type) {
	switch (type) {
	    case REQUEST_TEXT:
		return logRequestText;
	    case RESPONSE_TEXT:
		return logResponseText;
	    case RPC_ERROR:
		return logRpcExceptions;
	}
        return false;
    }
    
    @Override
    public void log(RpcLogType type, String message, Throwable optionalException) {
	if (!isLogEnabled(type)) return;
	log(type+": "+message,optionalException);
    }
    
}
