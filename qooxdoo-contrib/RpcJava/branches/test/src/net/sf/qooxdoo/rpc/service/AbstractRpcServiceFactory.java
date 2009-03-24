package net.sf.qooxdoo.rpc.service;

import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashSet;

import net.sf.qooxdoo.rpc.json.JSONArray;

/**
 * A basic rpc service factory
 * 
 * @author mwyraz
 */
public abstract class AbstractRpcServiceFactory implements IRpcServiceFactory {
    public abstract Object getServiceImplementation(String serviceName);

    protected Class<?> getServiceClass(String serviceName) {
	Object service = getServiceImplementation(serviceName);
	if (service == null)
	    return null;
	return service.getClass();
    }

    @Override
    public Collection<Method> getServiceMethodCandidates(String serviceName,
	    String methodName, JSONArray args) throws Exception {
	Collection<Method> result = new HashSet<Method>();
	Class<?> serviceClass = getServiceClass(serviceName);
	if (serviceClass != null) {
	    for (Method method : serviceClass.getMethods()) {
		if (methodMatches(method, serviceName, methodName, args))
		    result.add(method);
	    }
	}
	return result;
    }

    protected boolean methodMatches(Method method, String serviceName,
	    String methodName, JSONArray args) {
	if (!methodNameMatches(method, serviceName, methodName, args))
	    return false;
	if (!methodArgsMatches(method, serviceName, methodName, args))
	    return false;
	return true;
    }

    protected boolean methodNameMatches(Method method, String serviceName,
	    String methodName, JSONArray args) {
	return method.getName().equals(methodName);
    }

    protected boolean methodArgsMatches(Method method, String serviceName,
	    String methodName, JSONArray args) {
	return method.getParameterTypes().length == args.length();
    }
}
