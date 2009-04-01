package net.sf.qooxdoo.rpc.log;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Default logger that logs to System.err or any other PrintWriter
 * 
 * @author mwyraz
 */
public class RpcCommonsLoggingLogger implements IRpcLogger {
    
    protected Log LOG=LogFactory.getLog(getClass());
    
    protected enum Level{none,debug,info,warn,error};
    
    protected Level logRequestTextLevel = Level.debug;
    protected Level logResponseTextLevel = Level.debug;
    protected Level logRpcErrorLevel = Level.warn;

    protected Level getLogLevel(RpcLogType type)
    {
	switch (type) {
	case REQUEST_TEXT:
	    return logRequestTextLevel;
	case RESPONSE_TEXT:
	    return logResponseTextLevel;
	case RPC_ERROR:
	    return logRpcErrorLevel;
	}
	return Level.info;
    }
    protected boolean isLogLevelEnabled(Level level)
    {
	switch (level) {
	case none:
	    return false;
	case debug:
	    return LOG.isDebugEnabled();
	case info:
	    return LOG.isInfoEnabled();
	case warn:
	    return LOG.isWarnEnabled();
	case error:
	    return LOG.isErrorEnabled();
	default:
	    return true; // if unsure, log
	}
    }
    
    @Override
    public boolean isLogEnabled(RpcLogType type) {
	return isLogLevelEnabled(getLogLevel(type));
    }

    @Override
    public void log(RpcLogType type, String message, Throwable optionalException) {
	Level level=getLogLevel(type);
	
	if (!isLogLevelEnabled(level)) return;

	message=type + ": " + message;
	
	switch (level) {
	case none:
	    break;
	case debug:
	    LOG.debug(message,optionalException);
	    break;
	case info:
	    LOG.info(message,optionalException);
	    break;
	case warn:
	    LOG.warn(message,optionalException);
	    break;
	case error:
	    LOG.error(message,optionalException);
	    break;
	default:
	    LOG.warn(message,optionalException); // if unsure, log as WARN
	    break;
	}
    }

    /**
     * Sets the log level (none|debug|info|warn|error) for logging of incoming json requests (default: debug)
     */
    public void setRequestTextLogLevel(String level) {
	this.logRequestTextLevel = Level.valueOf(level);
    }

    /**
     * Sets the log level (none|debug|info|warn|error) for outgoing json responses (default: debug)
     */
    public void setResponseTextLogLevel(String level) {
	this.logResponseTextLevel = Level.valueOf(level);
    }

    /**
     * Sets the log level (none|debug|info|warn|error) for exceptions during execution of json requests (default: warn)
     */
    public void setRpcErrorLogLevel(String level) {
	this.logRpcErrorLevel = Level.valueOf(level);
    }
}
