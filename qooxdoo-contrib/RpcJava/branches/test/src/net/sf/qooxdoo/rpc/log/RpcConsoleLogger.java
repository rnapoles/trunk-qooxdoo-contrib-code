package net.sf.qooxdoo.rpc.log;

import java.io.PrintStream;

/**
 * Default logger that logs to System.err or any other PrintWriter
 * 
 * @author mwyraz
 */
public class RpcConsoleLogger implements IRpcLogger {
    protected boolean logRequestText = false;
    protected boolean logResponseText = false;
    protected boolean logRpcError = true;

    protected PrintStream target = System.err;

    @Override
    public boolean isLogEnabled(RpcLogType type) {
	switch (type) {
	case REQUEST_TEXT:
	    return logRequestText;
	case RESPONSE_TEXT:
	    return logResponseText;
	case RPC_ERROR:
	    return logRpcError;
	}
	return false;
    }

    @Override
    public void log(RpcLogType type, String message) {
	log(type, message, null);
    }

    @Override
    public void log(RpcLogType type, String message, Throwable exception) {
	if (!isLogEnabled(type))
	    return;

	target.println(type + ": " + message);
	if (exception != null)
	    exception.printStackTrace(target);
    }

    /**
     * Sets the log target (any PrintWriter, defaults to System.err)
     */
    public void setTarget(PrintStream target) {
	this.target = target;
    }

    /**
     * Enables or disables logging of incoming json requests (default: disabled)
     */
    public void setLogRequestText(boolean logRequestText) {
	this.logRequestText = logRequestText;
    }

    /**
     * Enables or disables logging of outgoing json responses (default: disabled)
     */
    public void setLogResponseText(boolean logResponseText) {
	this.logResponseText = logResponseText;
    }

    /**
     * Enables or disables logging exceptions during execution of json requests (default: enabled)
     */
    public void setLogRpcError(boolean logRpcError) {
	this.logRpcError = logRpcError;
    }
}
