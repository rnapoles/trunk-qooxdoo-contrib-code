package net.sf.qooxdoo.rpc.service;

import java.lang.reflect.Method;
import java.util.Collection;

import net.sf.qooxdoo.rpc.json.JSONArray;

/**
 * RPC service factory: resolves names to service implementations, finds all
 * method candidates for a given request
 * 
 * @author mwyraz
 * 
 */
public interface IRpcServiceFactory {
    /**
     * Returns the implementation for a given service name or null. May also
     * throw an exception that will be passed to the client.
     */
    public Object getServiceImplementation(String serviceName) throws Exception;

    /**
     * Returns a list of methods matching the given request. At least the method
     * name and the number of arguments should be checked. Checks for exact
     * parameter matches are made by the RpcHandler.
     */
    public Collection<Method> getServiceMethodCandidates(String serviceName,
	    String methodName, JSONArray args) throws Exception;
}
