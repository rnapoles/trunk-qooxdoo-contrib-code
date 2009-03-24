package net.sf.qooxdoo.rpc.log;

/**
 * Logger that logs absolute nothing
 * 
 * @author mwyraz
 */
public class RpcNullLogger implements IRpcLogger {
    public boolean isLogEnabled(RpcLogType type) {
	return false;
    }

    public void log(RpcLogType type, String message) {
    }

    public void log(RpcLogType type, String message, Throwable exception) {
    }
}
