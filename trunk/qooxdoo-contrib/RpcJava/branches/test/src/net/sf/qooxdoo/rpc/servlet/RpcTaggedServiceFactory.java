package net.sf.qooxdoo.rpc.servlet;

import java.lang.reflect.Method;

import net.sf.qooxdoo.rpc.json.JSONArray;
import net.sf.qooxdoo.rpc.service.AbstractRpcServiceFactory;

/**
 * Service factory that implements the "old" behaviour:
 * - service name = class name
 * - one instance per service and session (implemented using the IServiceInstanceContainer)
 * - any service must implement the RemoteService interface
 * - any callable method must be public and throw RemoteException
 * @author mwyraz
 */
public class RpcTaggedServiceFactory extends AbstractRpcServiceFactory {
    
    protected final IServiceInstanceContainer instanceContainer;
    
    public RpcTaggedServiceFactory(IServiceInstanceContainer instanceContainer) {
	this.instanceContainer=instanceContainer;
    }

    @Override
    public Object getServiceImplementation(String serviceName) throws Exception {
	Object impl=instanceContainer.getServiceInstance(serviceName);
	if (impl==null) {
	    Class<?> serviceClass=Class.forName(serviceName);
	    if (!RemoteService.class.isAssignableFrom(serviceClass)) throw new IllegalArgumentException("The requested service class does not implement the RemoteService interface!");
	    impl=serviceClass.newInstance();
	    
	    instanceContainer.putServiceInstance(serviceName,impl);
	}
	
        return impl;
    }
    
    @Override
    protected boolean methodMatches(Method method, String serviceName,
            String methodName, JSONArray args) {
        if (!super.methodMatches(method, serviceName, methodName, args)) return false;
        for (Class<?> ex: method.getExceptionTypes()) {
            if (ex==RemoteException.class) return true;
        }
        return false;
    }
    
}
