package net.sf.qooxdoo.rpc.service;

import java.lang.reflect.Method;

import javax.jws.WebMethod;
import javax.jws.WebService;

import net.sf.qooxdoo.rpc.json.JSONArray;

/**
 * This service factory honors {@link javax.jws.WebService} and
 * {@link javax.jws.WebMethod} annotations
 * 
 * @author mwyraz
 */
public abstract class AbstractJwsRpcServiceFactory extends
	AbstractRpcServiceFactory {
    @Override
    protected Class<?> getServiceClass(String serviceName) throws Exception {
	return getServiceClass(getServiceImplementation(serviceName));
    }

    protected Class<?> getServiceClass(Object impl) {
	if (impl == null)
	    return null;

	Class<?> wsInterface = null;

	Class<?> clazz = impl.getClass();

	while (wsInterface == null && clazz != null) {
	    for (Class<?> wsIf : clazz.getInterfaces()) {
		WebService aWs = wsIf.getAnnotation(WebService.class);
		if (aWs == null)
		    continue;
		if (wsInterface != null)
		    throw new IllegalArgumentException(
			    "Multiple interfaces with @javax.jws.WebService annotation found for class "
				    + clazz);
		wsInterface = wsIf;
	    }
	    clazz = clazz.getSuperclass();
	}

	if (wsInterface == null)
	    throw new IllegalArgumentException(
		    "No interfaces with @javax.jws.WebService annotation found for class "
			    + impl.getClass());
	return wsInterface;
    }

    @Override
    protected boolean methodNameMatches(Method method, String serviceName,
	    String methodName, JSONArray args) {
	WebMethod aMethod = method.getAnnotation(WebMethod.class);
	if (aMethod == null)
	    return false;
	String name = aMethod.operationName();
	if (name.length() == 0)
	    name = method.getName();
	return name.equals(methodName);
    }
}
