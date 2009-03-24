package net.sf.qooxdoo.rpc.log;

/**
 * Logger interface for abstraction from log frameworks.
 * 
 * @author mwyraz
 */
public interface IRpcLogger {
    public boolean isLogEnabled(RpcLogType type);

    public void log(RpcLogType type, String message, Throwable optionalException);
}
